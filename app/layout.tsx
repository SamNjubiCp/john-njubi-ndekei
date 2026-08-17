import type { Metadata } from "next";
import { Figtree, Source_Serif_4, Young_Serif } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { getStream } from "@/lib/queries";
import "./globals.css";

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-young-serif",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: {
    default: "John Njubi Ndekei — 91 years",
    template: "%s · John Njubi Ndekei",
  },
  description:
    "A gathering place for the life of John Njubi Ndekei: his years, the lessons he leaves, hymns, family, and the burial livestream.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const stream = await getStream();
  return (
    <html
      lang="en"
      className={`${youngSerif.variable} ${sourceSerif.variable} ${figtree.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-mist text-trunk antialiased">
        <SiteShell live={stream?.status === "live"}>{children}</SiteShell>
      </body>
    </html>
  );
}
