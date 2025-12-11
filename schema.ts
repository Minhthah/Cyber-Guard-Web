import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Players table - stores user profiles and game progress
export const players = pgTable("players", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  avatarIcon: text("avatar_icon").notNull().default("user"),
  money: integer("money").notNull().default(0),
  highScore: integer("high_score").notNull().default(0),
  totalGamesPlayed: integer("total_games_played").notNull().default(0),
  ownedItems: text("owned_items").array().notNull().default(sql`ARRAY[]::text[]`),
  ownedAvatars: text("owned_avatars").array().notNull().default(sql`ARRAY['user']::text[]`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPlayerSchema = createInsertSchema(players).pick({
  username: true,
});

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;

// Leaderboard entries - for storing top scores
export const leaderboardEntries = pgTable("leaderboard_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: varchar("player_id").notNull(),
  playerName: text("player_name").notNull(),
  score: integer("score").notNull(),
  level: integer("level").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLeaderboardEntrySchema = createInsertSchema(leaderboardEntries).pick({
  playerId: true,
  playerName: true,
  score: true,
  level: true,
});

export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardEntrySchema>;
export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;

// Game items - shop items for players to purchase
export const shopItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  icon: z.string(),
  type: z.enum(["item", "avatar"]),
  effect: z.string().optional(),
});

export type ShopItem = z.infer<typeof shopItemSchema>;

// Scam scenario for the game
export const scamScenarioSchema = z.object({
  id: z.string(),
  type: z.enum(["email", "website", "sms", "call"]),
  title: z.string(),
  content: z.string(),
  sender: z.string().optional(),
  url: z.string().optional(),
  isScam: z.boolean(),
  explanation: z.string(),
  difficulty: z.number().min(1).max(10),
  redFlags: z.array(z.string()).optional(),
});

export type ScamScenario = z.infer<typeof scamScenarioSchema>;

// Typing command for virus mini-game
export const typingCommandSchema = z.object({
  command: z.string(),
  difficulty: z.number().min(1).max(10),
});

export type TypingCommand = z.infer<typeof typingCommandSchema>;

// Game state type for frontend
export const gameStateSchema = z.object({
  playerId: z.string(),
  playerName: z.string(),
  currentLevel: z.number(),
  maxLevel: z.number(),
  score: z.number(),
  money: z.number(),
  hp: z.number(),
  inventory: z.array(z.string()),
  currentScenario: scamScenarioSchema.nullable(),
  isTypingGame: z.boolean(),
  typingCommand: z.string().nullable(),
  typingTimeLeft: z.number(),
  gameStatus: z.enum(["playing", "won", "lost", "menu"]),
});

export type GameState = z.infer<typeof gameStateSchema>;

// Keep legacy user schema for compatibility
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;