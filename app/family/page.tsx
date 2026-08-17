import { FamilyTree } from "@/components/FamilyTree";
import { getFamily } from "@/lib/queries";

export const metadata = { title: "Family" };

export default async function FamilyPage() {
  const tree = await getFamily();
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="font-ui text-center text-xs uppercase tracking-[0.28em] text-leaf">
        The same tree
      </p>
      <h1 className="font-display mt-3 text-center text-5xl">Family</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-trunk/75">
        John stands at the trunk. Propose a parent, spouse, child, or sibling from Contribute — they
        appear after approval.
      </p>
      <FamilyTree people={tree.people} relationships={tree.relationships} />
    </div>
  );
}
