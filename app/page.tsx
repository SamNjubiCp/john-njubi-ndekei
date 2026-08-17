import Link from "next/link";
import { getChapters, getPublishedLessons, getStream } from "@/lib/queries";

export default async function HomePage() {
  const [chapters, lessons, stream] = await Promise.all([
    getChapters(),
    getPublishedLessons(),
    getStream(),
  ]);

  return (
    <div>
      <section className="relative mx-auto max-w-3xl px-5 pb-8 pt-16 text-center md:pt-24">
        <p className="font-ui rise-in text-xs uppercase tracking-[0.35em] text-leaf">
          A gathering under the shade
        </p>
        <h1 className="font-display rise-in-delay mt-4 text-5xl leading-[1.05] text-trunk md:text-7xl">
          John Njubi Ndekei
        </h1>
        <p className="font-ui rise-in-late mt-5 text-lg tracking-[0.2em] text-soil">91 years</p>
        <p className="rise-in-late mx-auto mt-6 max-w-xl text-xl leading-relaxed text-trunk/80">
          A life well lived. Still teaching.
        </p>
        <div className="ember-pulse mx-auto mt-8 h-3 w-3 rounded-full bg-fire" />
        {stream?.status === "live" ? (
          <Link
            href="/watch"
            className="font-ui mt-8 inline-flex items-center gap-2 rounded-full bg-trunk px-6 py-3 text-paper"
          >
            <span className="live-dot h-2 w-2 rounded-full bg-fire" />
            Join the burial livestream
          </Link>
        ) : null}
      </section>

      <section className="mx-auto max-w-3xl px-5 py-8">
        <p className="rounded-2xl bg-paper/80 px-5 py-4 text-center text-trunk/70">
          This house is being prepared. The path of his years and the lessons below are drafts until
          the family writes them in.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="font-display text-center text-4xl">The path of his years</h2>
        <ol className="life-path mt-12 space-y-10">
          {chapters.map((chapter, i) => (
            <li
              key={chapter.id}
              className={`relative md:flex md:items-start md:gap-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block md:flex-1" />
              <span className="absolute left-0 top-2 h-6 w-6 rounded-full border-2 border-fire bg-mist md:left-1/2 md:-ml-3" />
              <article className="ml-12 rounded-2xl bg-paper p-6 shadow-sm md:ml-0 md:flex-1">
                <p className="font-ui text-xs uppercase tracking-[0.22em] text-leaf">
                  {chapter.period}
                </p>
                <h3 className="font-display mt-2 text-2xl">{chapter.title}</h3>
                <p className="mt-3 leading-7 text-trunk/80">{chapter.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl">What he taught us</h2>
          <Link href="/lessons" className="font-ui text-sm text-leaf underline-offset-4 hover:underline">
            All lessons
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {lessons.map((lesson) => (
            <article key={lesson.id} className="rounded-2xl bg-paper p-6 shadow-sm">
              <div className="lantern-breathe mb-3 h-2 w-2 rounded-full bg-fire" />
              <h3 className="font-display text-2xl">{lesson.title}</h3>
              <p className="mt-3 leading-7 text-trunk/80">{lesson.body}</p>
              {lesson.attribution ? (
                <p className="font-ui mt-4 text-xs tracking-wide text-soil">{lesson.attribution}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
