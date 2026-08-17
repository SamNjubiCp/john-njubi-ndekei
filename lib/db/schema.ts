import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const submissionStatus = pgEnum("submission_status", [
  "pending",
  "published",
  "rejected",
]);

export const streamStatus = pgEnum("stream_status", [
  "upcoming",
  "live",
  "ended",
]);

export const relationType = pgEnum("relation_type", [
  "parent",
  "spouse",
  "child",
  "sibling",
]);

export const lifeChapters = pgTable("life_chapters", {
  id: uuid("id").primaryKey().defaultRandom(),
  period: text("period").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const lessons = pgTable("lessons", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  attribution: text("attribution"),
  status: submissionStatus("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const stories = pgTable("stories", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  authorName: text("author_name").notNull(),
  relation: text("relation"),
  status: submissionStatus("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const photos = pgTable("photos", {
  id: uuid("id").primaryKey().defaultRandom(),
  storageKey: text("storage_key").notNull(),
  caption: text("caption"),
  submitter: text("submitter"),
  status: submissionStatus("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const people = pgTable("people", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  years: text("years"),
  bio: text("bio"),
  isRoot: boolean("is_root").notNull().default(false),
  status: submissionStatus("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const relationships = pgTable("relationships", {
  id: uuid("id").primaryKey().defaultRandom(),
  fromPersonId: uuid("from_person_id").notNull(),
  toPersonId: uuid("to_person_id").notNull(),
  type: relationType("type").notNull(),
  status: submissionStatus("status").notNull().default("pending"),
});

export const siteStream = pgTable("site_stream", {
  id: text("id").primaryKey().default("default"),
  youtubeUrl: text("youtube_url"),
  recordingUrl: text("recording_url"),
  status: streamStatus("status").notNull().default("upcoming"),
  startNote: text("start_note"),
});

export const hymns = pgTable("hymns", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  youtubeUrl: text("youtube_url"),
  lyrics: text("lyrics").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});
