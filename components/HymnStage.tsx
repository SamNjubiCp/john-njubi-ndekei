"use client";

import { useMemo, useState } from "react";
import { embedUrl } from "@/lib/youtube";
import { keepHymn } from "./HymnDock";

type Hymn = {
  id: string;
  title: string;
  youtubeUrl: string | null;
  lyrics: string;
};

export function HymnStage({ hymns }: { hymns: Hymn[] }) {
  const [id, setId] = useState(hymns[0]?.id ?? "");
  const current = useMemo(() => hymns.find((h) => h.id === id) ?? hymns[0], [hymns, id]);
  const src = embedUrl(current?.youtubeUrl);

  if (!hymns.length) {
    return <p>Hymns will be added by the family.</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,14rem)_1fr]">
      <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {hymns.map((hymn) => (
          <li key={hymn.id}>
            <button
              type="button"
              onClick={() => setId(hymn.id)}
              className={`font-ui w-full rounded-full px-4 py-2 text-left text-sm whitespace-nowrap ${
                current?.id === hymn.id
                  ? "bg-trunk text-paper"
                  : "bg-paper/70 text-trunk hover:bg-paper"
              }`}
            >
              {hymn.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {src ? (
            <div className="overflow-hidden rounded-2xl border border-trunk/10 bg-trunk">
              <iframe
                title={current.title}
                src={src}
                className="aspect-video w-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-trunk/20 bg-paper text-center text-trunk/60">
              <p className="max-w-xs px-6">
                A YouTube link for this hymn has not been added yet. The keeper can paste it in admin.
              </p>
            </div>
          )}
          {current?.youtubeUrl ? (
            <button
              type="button"
              className="font-ui mt-3 text-sm text-leaf underline-offset-4 hover:underline"
              onClick={() => keepHymn(current.youtubeUrl!)}
            >
              Keep singing as I walk the site
            </button>
          ) : null}
        </div>
        <article className="rounded-2xl bg-paper px-6 py-8 shadow-sm">
          <h2 className="font-display text-3xl">{current?.title}</h2>
          {current?.lyrics ? (
            <pre className="mt-6 font-[family-name:var(--font-source-serif)] whitespace-pre-wrap text-lg leading-8 text-trunk/90">
              {current.lyrics}
            </pre>
          ) : (
            <p className="mt-6 text-trunk/60">
              Lyrics will sit here so people at home can sing. They are added in admin when the family is ready.
            </p>
          )}
        </article>
      </div>
    </div>
  );
}
