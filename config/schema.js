import { pgTable, varchar, serial, integer } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("imageUrl").notNull(),
  credits: integer("credits").default(3),
});

export const AiGeneratedImages = pgTable("AiGeneratedImages", {
  id: serial("id").primaryKey(),
  orgImageUrl: varchar("orgImageUrl").notNull(),
  aiImage: varchar("aiImage").notNull(),
  roomType: varchar("roomType").notNull(),
  designType: varchar("designType").notNull(),
  userEmail: varchar("userEmail"), // changed to varchar
});
