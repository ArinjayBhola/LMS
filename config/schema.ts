import { boolean, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  isMember: boolean().default(false),
});

export const STUDY_MATERIAL_TABLE = pgTable("study_materials", {
  id: serial().primaryKey(),
  courseId: varchar(),
  courseType: varchar(),
  title: varchar(),
  difficultyLevel: varchar().default("Easy"),
  courseLayout: json(),
  createdBy: varchar(),
  status: varchar().default("Generating"),
});
