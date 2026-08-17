import { HymnStage } from "@/components/HymnStage";
import { getHymns } from "@/lib/queries";

export const metadata = { title: "Hymns" };

export default async function HymnsPage() {
  const hymns = await getHymns();
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-ui text-xs uppercase tracking-[0.28em] text-leaf">Voices in the shade</p>
      <h1 className="font-display mt-3 text-5xl">Hymns</h1>
      <p className="mt-4 max-w-2xl text-lg text-trunk/75">
        Sing along. Lyrics sit beside the player so those at home can join the same song.
      </p>
      <div className="mt-12">
        <HymnStage hymns={hymns} />
      </div>
    </div>
  );
}
