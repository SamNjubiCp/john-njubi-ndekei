import { eq } from "drizzle-orm";
import { db } from "./db";
import { stories } from "./db/schema";
import { getPublishedStories } from "./queries";
import assert from "node:assert/strict";

async function main() {
  const title = `Test story ${Date.now()}`;
  const [row] = await db
    .insert(stories)
    .values({
      title,
      body: "He sat with us in the evening and told the same story twice, and we let him.",
      authorName: "Flow test",
      relation: "family",
      status: "pending",
    })
    .returning();

  const hidden = await getPublishedStories();
  assert.equal(hidden.some((s) => s.id === row.id), false, "pending story must not be public");

  await db.update(stories).set({ status: "published" }).where(eq(stories.id, row.id));
  const shown = await getPublishedStories();
  assert.equal(shown.some((s) => s.id === row.id), true, "published story must be public");

  await db.update(stories).set({ status: "rejected" }).where(eq(stories.id, row.id));
  const gone = await getPublishedStories();
  assert.equal(gone.some((s) => s.id === row.id), false, "rejected story must not be public");

  await db.delete(stories).where(eq(stories.id, row.id));
  console.log("moderation flow ok");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
