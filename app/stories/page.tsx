import { getPublishedStories } from "@/lib/queries";

export const metadata = { title: "Stories" };

export default async function StoriesPage() {
  const stories = await getPublishedStories();
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-ui text-xs uppercase tracking-[0.28em] text-leaf">Remembered aloud</p>
      <h1 className="font-display mt-3 text-5xl">Stories</h1>
      <p className="mt-4 text-lg text-trunk/75">
        Memories from people who knew him. New stories wait for a keeper&apos;s approval.
      </p>
      <div className="mt-12 space-y-6">
        {stories.length === 0 ? (
          <p className="rounded-2xl bg-paper p-8 text-trunk/65">
            No stories have been published yet. Be the first from Contribute.
          </p>
        ) : (
          stories.map((story) => (
            <article key={story.id} className="rounded-2xl bg-paper p-7 shadow-sm">
              <h2 className="font-display text-3xl">{story.title}</h2>
              <p className="mt-4 leading-8 text-trunk/85">{story.body}</p>
              <p className="font-ui mt-5 text-sm text-soil">
                {story.authorName}
                {story.relation ? ` · ${story.relation}` : ""}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
