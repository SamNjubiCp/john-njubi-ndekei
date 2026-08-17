import { asc, desc, eq } from "drizzle-orm";
import { db } from "./db";
import {
  hymns,
  lessons,
  lifeChapters,
  people,
  photos,
  relationships,
  siteStream,
  stories,
} from "./db/schema";
import { photoUrl } from "./storage";

export async function getChapters() {
  return db.select().from(lifeChapters).orderBy(asc(lifeChapters.sortOrder));
}

export async function getPublishedLessons() {
  return db
    .select()
    .from(lessons)
    .where(eq(lessons.status, "published"))
    .orderBy(desc(lessons.createdAt));
}

export async function getPublishedStories() {
  return db
    .select()
    .from(stories)
    .where(eq(stories.status, "published"))
    .orderBy(desc(stories.createdAt));
}

export async function getPublishedPhotos() {
  const rows = await db
    .select()
    .from(photos)
    .where(eq(photos.status, "published"))
    .orderBy(desc(photos.createdAt));
  return Promise.all(rows.map(async (row) => ({ ...row, url: await photoUrl(row.storageKey) })));
}

export async function getHymns() {
  return db.select().from(hymns).orderBy(asc(hymns.sortOrder));
}

export async function getStream() {
  const [row] = await db.select().from(siteStream).where(eq(siteStream.id, "default")).limit(1);
  return row ?? null;
}

export async function getFamily() {
  const publishedPeople = await db
    .select()
    .from(people)
    .where(eq(people.status, "published"));
  const publishedRels = await db
    .select()
    .from(relationships)
    .where(eq(relationships.status, "published"));
  return { people: publishedPeople, relationships: publishedRels };
}

export async function getPending() {
  const [pendingLessons, pendingStories, pendingPhotos, pendingPeople] = await Promise.all([
    db.select().from(lessons).where(eq(lessons.status, "pending")).orderBy(desc(lessons.createdAt)),
    db.select().from(stories).where(eq(stories.status, "pending")).orderBy(desc(stories.createdAt)),
    db.select().from(photos).where(eq(photos.status, "pending")).orderBy(desc(photos.createdAt)),
    db.select().from(people).where(eq(people.status, "pending")).orderBy(desc(people.createdAt)),
  ]);
  const pendingRels = await db
    .select()
    .from(relationships)
    .where(eq(relationships.status, "pending"));
  const photosWithUrl = await Promise.all(
    pendingPhotos.map(async (row) => ({ ...row, url: await photoUrl(row.storageKey) })),
  );
  return {
    lessons: pendingLessons,
    stories: pendingStories,
    photos: photosWithUrl,
    people: pendingPeople,
    relationships: pendingRels,
  };
}

export async function getAdminLists() {
  const [allChapters, allLessons, allHymns, allPeople, stream] = await Promise.all([
    getChapters(),
    db.select().from(lessons).orderBy(desc(lessons.createdAt)),
    getHymns(),
    db.select().from(people).orderBy(desc(people.createdAt)),
    getStream(),
  ]);
  return { chapters: allChapters, lessons: allLessons, hymns: allHymns, people: allPeople, stream };
}

export function relationLabel(
  type: "parent" | "spouse" | "child" | "sibling",
  fromName: string,
  toName: string,
) {
  if (type === "parent") return `${fromName} is a parent of ${toName}`;
  if (type === "child") return `${fromName} is a child of ${toName}`;
  if (type === "spouse") return `${fromName} is spouse of ${toName}`;
  return `${fromName} is a sibling of ${toName}`;
}

