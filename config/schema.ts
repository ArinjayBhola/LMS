import { boolean, integer, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

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

export const CHAPTER_NOTES_TABLE = pgTable("chapterNotes", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  notes: text(),
});
