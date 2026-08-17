import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { getStream } from "@/lib/queries";

export const metadata = { title: "Watch" };

export default async function WatchPage() {
  const stream = await getStream();
  const live = stream?.status === "live";
  const ended = stream?.status === "ended";
  const url = ended
    ? stream?.recordingUrl || stream?.youtubeUrl
    : stream?.youtubeUrl;

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="font-ui text-xs uppercase tracking-[0.28em] text-leaf">
        {live ? "Together in the yard" : ended ? "The day, kept" : "When the family gathers"}
      </p>
      <h1 className="font-display mt-3 text-5xl">
        {live ? "We are live" : ended ? "The burial recording" : "Burial livestream"}
      </h1>
      {stream?.startNote ? (
        <p className="mt-4 text-lg text-trunk/75">{stream.startNote}</p>
      ) : null}
      <div className="mt-10">
        {url ? (
          <YouTubeEmbed url={url} title="Burial livestream" autoplay={live} />
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-trunk/20 bg-paper text-center">
            <p className="max-w-sm px-6 text-trunk/65">
              The livestream will appear here. The family keeper will paste the YouTube link when it
              is ready.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
