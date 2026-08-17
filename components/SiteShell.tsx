import Link from "next/link";
import { Canopy } from "./Canopy";
import { HymnDock } from "./HymnDock";
import { LiveBanner } from "./LiveBanner";

const links = [
  ["/", "Home"],
  ["/lessons", "Lessons"],
  ["/hymns", "Hymns"],
  ["/watch", "Watch"],
  ["/stories", "Stories"],
  ["/photos", "Photos"],
  ["/family", "Family"],
  ["/contribute", "Contribute"],
] as const;

export function SiteShell({
  children,
  live,
}: {
  children: React.ReactNode;
  live: boolean;
}) {
  return (
    <>
      {live ? <LiveBanner /> : null}
      <header className="relative overflow-hidden border-b border-trunk/10">
        <Canopy />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 md:flex-row md:items-end md:justify-between">
          <Link href="/" className="group">
            <p className="font-ui text-[0.7rem] uppercase tracking-[0.28em] text-leaf">
              In the shade of his years
            </p>
            <p className="font-display text-2xl leading-tight text-trunk md:text-3xl">
              John Njubi Ndekei
            </p>
          </Link>
          <nav className="font-ui flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-trunk/80 md:text-sm">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="border-b border-transparent pb-0.5 transition-colors hover:border-fire hover:text-trunk"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="relative z-10 flex-1">{children}</main>
      <footer className="font-ui mx-auto w-full max-w-6xl px-5 py-12 text-sm text-trunk/60">
        <p>John Njubi Ndekei · 91 years · A life well lived. Still teaching.</p>
      </footer>
      <HymnDock />
    </>
  );
}
