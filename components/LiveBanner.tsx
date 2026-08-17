import Link from "next/link";

export function LiveBanner() {
  return (
    <div className="relative z-20 bg-trunk text-paper">
      <Link
        href="/watch"
        className="font-ui mx-auto flex max-w-6xl items-center justify-center gap-3 px-5 py-2.5 text-sm tracking-wide"
      >
        <span className="live-dot inline-block h-2.5 w-2.5 rounded-full bg-fire" />
        We are live — join the burial livestream
      </Link>
    </div>
  );
}
