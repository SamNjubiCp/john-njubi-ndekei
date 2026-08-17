import { getPublishedLessons } from "@/lib/queries";

export const metadata = { title: "Lessons" };

export default async function LessonsPage() {
  const lessons = await getPublishedLessons();
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="font-ui text-xs uppercase tracking-[0.28em] text-leaf">Still teaching</p>
      <h1 className="font-display mt-3 text-5xl">What he taught us</h1>
      <p className="mt-4 max-w-2xl text-lg text-trunk/75">
        Lessons learned at his side. Add yours from Contribute — they appear here after the family
        reviews them.
      </p>
      <div className="mt-12 grid gap-5">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="rounded-2xl bg-paper px-7 py-8 shadow-sm">
            <div className="lantern-breathe mb-4 h-2.5 w-2.5 rounded-full bg-fire" />
            <h2 className="font-display text-3xl">{lesson.title}</h2>
            <p className="mt-4 text-lg leading-8 text-trunk/85">{lesson.body}</p>
            {lesson.attribution ? (
              <p className="font-ui mt-5 text-sm text-soil">{lesson.attribution}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
