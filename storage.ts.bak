import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import {
  players,
  leaderboardEntries,
  type Player,
  type InsertPlayer,
  type LeaderboardEntry,
  type InsertLeaderboardEntry,
} from "@shared/schema";
import { shopItems } from "@shared/gameData";

export interface IStorage {
  getPlayer(id: string): Promise<Player | undefined>;
  getPlayerByUsername(username: string): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayer(id: string, updates: Partial<Player>): Promise<Player | undefined>;
  getLeaderboard(limit?: number): Promise<LeaderboardEntry[]>;
  addLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
}

export class DatabaseStorage implements IStorage {
  async getPlayer(id: string): Promise<Player | undefined> {
    const [player] = await db.select().from(players).where(eq(players.id, id));
    return player;
  }

  async getPlayerByUsername(username: string): Promise<Player | undefined> {
    const [player] = await db.select().from(players).where(eq(players.username, username));
    return player;
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const [player] = await db.insert(players).values(insertPlayer).returning();
    return player;
  }

  async updatePlayer(id: string, updates: Partial<Player>): Promise<Player | undefined> {
    const [player] = await db
      .update(players)
      .set(updates)
      .where(eq(players.id, id))
      .returning();
    return player;
  }

  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    return db
      .select()
      .from(leaderboardEntries)
      .orderBy(desc(leaderboardEntries.score))
      .limit(limit);
  }

  async addLeaderboardEntry(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const [leaderboardEntry] = await db
      .insert(leaderboardEntries)
      .values(entry)
      .returning();
    return leaderboardEntry;
  }
}

export const storage = new DatabaseStorage();
