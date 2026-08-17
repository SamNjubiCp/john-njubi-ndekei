import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { hymns, lessons, lifeChapters, people, siteStream } from "./schema";

const databaseUrl = process.env.DATABASE_URL ?? "";
if (!databaseUrl) throw new Error("DATABASE_URL is not set");

async function seed() {
  const sql = postgres(databaseUrl, { max: 1 });
  const db = drizzle(sql);

  const existing = await db.select({ id: people.id }).from(people).limit(1);
  if (existing.length) {
    console.log("Already seeded");
    await sql.end();
    return;
  }

  await db.insert(people).values({
    name: "John Njubi Ndekei",
    years: "91 years",
    bio: "The tree begins with him. Family will fill the shade around this name.",
    isRoot: true,
    status: "published",
  });

  await db.insert(lifeChapters).values([
    {
      period: "The early years",
      title: "A long morning",
      body: "This chapter is waiting for the family. Childhood, the homestead, the names that formed him — write what you remember, even if it is only a place or a season.",
      sortOrder: 1,
    },
    {
      period: "Work",
      title: "Hands that provided",
      body: "How he worked, what he built, who he provided for. Replace this draft with the work of his days.",
      sortOrder: 2,
    },
    {
      period: "Family",
      title: "The shade he kept",
      body: "Marriage, children, grandchildren. The table, the advice, the quiet presence. This house is ready for those stories.",
      sortOrder: 3,
    },
    {
      period: "Faith",
      title: "What he held to",
      body: "The hymns he loved will live on this site. This chapter is for the faith that carried him through ninety-one years.",
      sortOrder: 4,
    },
    {
      period: "91 years",
      title: "A life well lived",
      body: "He rested at ninety-one. The years after the work, the teaching that continued, the finishing. Fill this with how he closed the day.",
      sortOrder: 5,
    },
  ]);

  await db.insert(lessons).values([
    {
      title: "Show up",
      body: "A placeholder. Write the lesson he taught about presence — being there, keeping a word, standing with people.",
      attribution: "Waiting for the family",
      status: "published",
    },
    {
      title: "Keep the family close",
      body: "A placeholder. What did he teach about kinship, respect, and staying woven together?",
      attribution: "Waiting for the family",
      status: "published",
    },
    {
      title: "Work quietly",
      body: "A placeholder. The dignity of work, of providing without noise. Replace this with his own way.",
      attribution: "Waiting for the family",
      status: "published",
    },
    {
      title: "Finish well",
      body: "A placeholder. Ninety-one years. What did a well-finished life look like from where he sat?",
      attribution: "Waiting for the family",
      status: "published",
    },
  ]);

  await db.insert(hymns).values([
    { title: "Amazing Grace", lyrics: "", sortOrder: 1 },
    { title: "Abide With Me", lyrics: "", sortOrder: 2 },
    { title: "It Is Well With My Soul", lyrics: "", sortOrder: 3 },
    { title: "Nearer, My God, to Thee", lyrics: "", sortOrder: 4 },
  ]);

  await db.insert(siteStream).values({
    id: "default",
    status: "upcoming",
    startNote: "The burial livestream will appear here when the family is ready.",
  });

  console.log("Seeded John Njubi Ndekei");
  await sql.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
