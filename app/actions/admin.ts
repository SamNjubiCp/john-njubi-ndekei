"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { login, logout, requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  hymns,
  lessons,
  lifeChapters,
  people,
  photos,
  relationships,
  siteStream,
  stories,
} from "@/lib/db/schema";
import { savePhoto } from "@/lib/storage";

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

export async function loginAction(form: FormData) {
  const ok = await login(text(form, "password"));
  if (!ok) return { error: "That password is not right." };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

export async function setStatus(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  const table = text(form, "table");
  const status = text(form, "status") as "published" | "rejected" | "pending";
  if (!id || !["published", "rejected", "pending"].includes(status)) return;
  if (table === "lessons") await db.update(lessons).set({ status }).where(eq(lessons.id, id));
  if (table === "stories") await db.update(stories).set({ status }).where(eq(stories.id, id));
  if (table === "photos") await db.update(photos).set({ status }).where(eq(photos.id, id));
  if (table === "people") {
    await db.update(people).set({ status }).where(eq(people.id, id));
    await db.update(relationships).set({ status }).where(eq(relationships.fromPersonId, id));
  }
  revalidatePath("/");
  revalidatePath("/lessons");
  revalidatePath("/stories");
  revalidatePath("/photos");
  revalidatePath("/family");
  revalidatePath("/admin");
}

export async function saveStream(form: FormData) {
  await requireAdmin();
  const status = text(form, "status") as "upcoming" | "live" | "ended";
  await db
    .insert(siteStream)
    .values({
      id: "default",
      youtubeUrl: text(form, "youtubeUrl") || null,
      recordingUrl: text(form, "recordingUrl") || null,
      status: ["upcoming", "live", "ended"].includes(status) ? status : "upcoming",
      startNote: text(form, "startNote") || null,
    })
    .onConflictDoUpdate({
      target: siteStream.id,
      set: {
        youtubeUrl: text(form, "youtubeUrl") || null,
        recordingUrl: text(form, "recordingUrl") || null,
        status: ["upcoming", "live", "ended"].includes(status) ? status : "upcoming",
        startNote: text(form, "startNote") || null,
      },
    });
  revalidatePath("/");
  revalidatePath("/watch");
  revalidatePath("/admin");
}

export async function saveHymn(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  const values = {
    title: text(form, "title"),
    youtubeUrl: text(form, "youtubeUrl") || null,
    lyrics: text(form, "lyrics"),
    sortOrder: Number(text(form, "sortOrder") || "0"),
  };
  if (!values.title) return;
  if (id) {
    await db.update(hymns).set(values).where(eq(hymns.id, id));
  } else {
    await db.insert(hymns).values(values);
  }
  revalidatePath("/hymns");
  revalidatePath("/admin");
}

export async function deleteHymn(form: FormData) {
  await requireAdmin();
  await db.delete(hymns).where(eq(hymns.id, text(form, "id")));
  revalidatePath("/hymns");
  revalidatePath("/admin");
}

export async function saveChapter(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  await db
    .update(lifeChapters)
    .set({
      period: text(form, "period"),
      title: text(form, "title"),
      body: text(form, "body"),
    })
    .where(eq(lifeChapters.id, id));
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function publishKeeperPhoto(form: FormData) {
  await requireAdmin();
  const file = form.get("photo");
  if (!(file instanceof File) || !file.size) return;
  const storageKey = await savePhoto(file);
  await db.insert(photos).values({
    storageKey,
    caption: text(form, "caption") || null,
    submitter: "family keeper",
    status: "published",
  });
  revalidatePath("/photos");
  revalidatePath("/admin");
}
