import type { Express, Request, Response } from "express";
import type { Server } from "http";
import { storage } from "./storage"; // in-memory storage
import { insertPlayerSchema } from "@shared/schema";
import { shopItems } from "@shared/gameData";
import { z } from "zod";

/**
 * Register API routes.
 */
export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ----------------------------
  // LOGIN
  // ----------------------------
  app.post("/api/players/login", async (req: Request, res: Response) => {
    try {
      console.log("LOGIN BODY:", req.body);

      const incoming = req.body;
      const { username } = insertPlayerSchema.parse(incoming);

      let player = await storage.getPlayerByUsername(username);
      if (!player) {
        player = await storage.createPlayer({ username });
      }

      return res.json(player);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(400).json({
        error: "Invalid username",
        details: String(error),
      });
    }
  });

  // ----------------------------
  // GET PLAYER
  // ----------------------------
  app.get("/api/players/:id", async (req: Request, res: Response) => {
    try {
      const player = await storage.getPlayer(req.params.id);
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: "Failed to get player" });
    }
  });

  // ----------------------------
  // PURCHASE ITEM / AVATAR
  // ----------------------------
  app.post("/api/players/:id/purchase", async (req: Request, res: Response) => {
    try {
      const purchaseSchema = z.object({
        itemId: z.string(),
        type: z.enum(["item", "avatar"]),
      });

      const { itemId, type } = purchaseSchema.parse(req.body);
      const player = await storage.getPlayer(req.params.id);

      if (!player) return res.status(404).json({ error: "Player not found" });

      const item = shopItems.find(i => i.id === itemId);
      if (!item) return res.status(404).json({ error: "Item not found" });

      if (player.money < item.price)
        return res.status(400).json({ error: "Not enough money" });

      const alreadyOwned = type === "avatar"
        ? player.ownedAvatars.includes(itemId)
        : player.ownedItems.includes(itemId);

      if (alreadyOwned)
        return res.status(400).json({ error: "Already owned" });

      const updates: any = {
        money: player.money - item.price,
      };

      if (type === "avatar") {
        updates.ownedAvatars = [...player.ownedAvatars, itemId];
      } else {
        updates.ownedItems = [...player.ownedItems, itemId];
      }

      const updatedPlayer = await storage.updatePlayer(req.params.id, updates);
      res.json(updatedPlayer);

    } catch (error) {
      res.status(400).json({ error: "Purchase failed", details: String(error) });
    }
  });

  // ----------------------------
  // EQUIP AVATAR
  // ----------------------------
  app.post("/api/players/:id/avatar", async (req: Request, res: Response) => {
    try {
      const { avatarId } = z.object({ avatarId: z.string() }).parse(req.body);
      const player = await storage.getPlayer(req.params.id);

      if (!player) return res.status(404).json({ error: "Player not found" });

      if (avatarId === "user") {
        const updated = await storage.updatePlayer(req.params.id, { avatarIcon: "user" });
        return res.json(updated);
      }

      if (!player.ownedAvatars.includes(avatarId))
        return res.status(400).json({ error: "Avatar not owned" });

      const avatarItem = shopItems.find(i => i.id === avatarId && i.type === "avatar");
      if (!avatarItem)
        return res.status(404).json({ error: "Avatar not found" });

      const updated = await storage.updatePlayer(req.params.id, {
        avatarIcon: avatarItem.icon,
      });

      res.json(updated);

    } catch (error) {
      res.status(400).json({ error: "Failed to equip avatar", details: String(error) });
    }
  });

  // ----------------------------
  // SAVE SCORE
  // ----------------------------
  app.post("/api/players/:id/score", async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        score: z.number(),
        money: z.number(),
        level: z.number(),
      });

      const { score, money, level } = schema.parse(req.body);
      const player = await storage.getPlayer(req.params.id);

      if (!player) return res.status(404).json({ error: "Player not found" });

      const isNewHighScore = score > player.highScore;

      const updates: any = {
        money: player.money + money,
        totalGamesPlayed: player.totalGamesPlayed + 1,
      };

      if (isNewHighScore) {
        updates.highScore = score;
      }

      await storage.updatePlayer(req.params.id, updates);

      await storage.addLeaderboardEntry({
        playerId: player.id,
        playerName: player.username,
        score,
        level,
      });

      res.json({ isNewHighScore, score, money });

    } catch (error) {
      res.status(400).json({ error: "Failed to save score", details: String(error) });
    }
  });

  // ----------------------------
  // LEADERBOARD
  // ----------------------------
  app.get("/api/leaderboard", async (_req: Request, res: Response) => {
    try {
      const board = await storage.getLeaderboard(10);
      res.json(board);
    } catch (error) {
      res.status(500).json({ error: "Failed to get leaderboard" });
    }
  });

  return httpServer;
}
