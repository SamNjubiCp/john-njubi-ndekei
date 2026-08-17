"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { embedUrl } from "@/lib/youtube";

export function HymnDock() {
  const pathname = usePathname();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const read = () => setUrl(sessionStorage.getItem("hymnUrl"));
    read();
    window.addEventListener("hymn-change", read);
    return () => window.removeEventListener("hymn-change", read);
  }, [pathname]);

  if (pathname === "/watch" || !url) return null;
  const src = embedUrl(url);
  if (!src) return null;

  return (
    <div className="fixed bottom-4 right-4 z-30 w-[min(100%-2rem,280px)] overflow-hidden rounded-xl border border-trunk/15 bg-trunk shadow-lg shadow-trunk/20">
      <div className="font-ui flex items-center justify-between px-3 py-1.5 text-xs text-paper/80">
        <span>Singing while you walk</span>
        <button
          type="button"
          className="text-fire"
          onClick={() => {
            sessionStorage.removeItem("hymnUrl");
            window.dispatchEvent(new Event("hymn-change"));
          }}
        >
          Close
        </button>
      </div>
      <iframe
        title="Hymn"
        src={`${src}?autoplay=1`}
        className="aspect-video w-full"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}

export function keepHymn(url: string) {
  sessionStorage.setItem("hymnUrl", url);
  window.dispatchEvent(new Event("hymn-change"));
}
