import { embedUrl } from "@/lib/youtube";

export function YouTubeEmbed({
  url,
  title,
  autoplay,
}: {
  url: string | null | undefined;
  title: string;
  autoplay?: boolean;
}) {
  const src = embedUrl(url);
  if (!src) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-trunk/10 bg-trunk shadow-lg shadow-trunk/10">
      <iframe
        title={title}
        src={autoplay ? `${src}?autoplay=1&mute=1` : src}
        className="aspect-video w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
