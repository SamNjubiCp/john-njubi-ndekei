"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { lessons, people, photos, relationships, stories } from "@/lib/db/schema";
import { savePhoto } from "@/lib/storage";

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

export async function submitStory(form: FormData) {
  const title = text(form, "title");
  const body = text(form, "body");
  const authorName = text(form, "authorName");
  if (!title || !body || !authorName) return { error: "Please fill in your name, a title, and the story." };
  await db.insert(stories).values({
    title,
    body,
    authorName,
    relation: text(form, "relation") || null,
    status: "pending",
  });
  revalidatePath("/admin");
  return { ok: "Thank you. Your story will appear after the family reviews it." };
}

export async function submitLesson(form: FormData) {
  const title = text(form, "title");
  const body = text(form, "body");
  if (!title || !body) return { error: "Please share the lesson and a short title." };
  await db.insert(lessons).values({
    title,
    body,
    attribution: text(form, "attribution") || null,
    status: "pending",
  });
  revalidatePath("/admin");
  return { ok: "Thank you. The lesson will appear after it is approved." };
}

export async function submitPhoto(form: FormData) {
  const file = form.get("photo");
  if (!(file instanceof File) || !file.size) return { error: "Please choose a photo." };
  try {
    const storageKey = await savePhoto(file);
    await db.insert(photos).values({
      storageKey,
      caption: text(form, "caption") || null,
      submitter: text(form, "submitter") || null,
      status: "pending",
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not save the photo." };
  }
  revalidatePath("/admin");
  return { ok: "Thank you. The photo will appear after it is approved." };
}

export async function submitRelative(form: FormData) {
  const name = text(form, "name");
  const relatedTo = text(form, "relatedTo");
  const type = text(form, "type") as "parent" | "spouse" | "child" | "sibling";
  if (!name || !relatedTo || !["parent", "spouse", "child", "sibling"].includes(type)) {
    return { error: "Please give a name, who they connect to, and how." };
  }
  const [person] = await db
    .insert(people)
    .values({
      name,
      years: text(form, "years") || null,
      bio: text(form, "bio") || null,
      status: "pending",
    })
    .returning({ id: people.id });
  await db.insert(relationships).values({
    fromPersonId: person.id,
    toPersonId: relatedTo,
    type,
    status: "pending",
  });
  revalidatePath("/admin");
  return { ok: "Thank you. The family will review this person before they appear on the tree." };
}
