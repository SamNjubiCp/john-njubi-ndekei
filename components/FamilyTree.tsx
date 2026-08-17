type Person = {
  id: string;
  name: string;
  years: string | null;
  bio: string | null;
  isRoot: boolean;
};

type Rel = {
  fromPersonId: string;
  toPersonId: string;
  type: "parent" | "spouse" | "child" | "sibling";
};

function linked(people: Person[], rels: Rel[], rootId: string, type: Rel["type"], asFrom: boolean) {
  const ids = rels
    .filter((r) => r.type === type && (asFrom ? r.fromPersonId === rootId : r.toPersonId === rootId))
    .map((r) => (asFrom ? r.toPersonId : r.fromPersonId));
  const extra = rels
    .filter((r) => {
      if (type === "parent") return r.type === "child" && r.toPersonId === rootId;
      if (type === "child") return r.type === "parent" && r.fromPersonId === rootId;
      return false;
    })
    .map((r) => (type === "parent" ? r.fromPersonId : r.toPersonId));
  const all = new Set([...ids, ...extra]);
  return people.filter((p) => all.has(p.id));
}

function Node({ person, root }: { person: Person; root?: boolean }) {
  return (
    <article
      className={`w-44 rounded-2xl border px-4 py-3 text-center shadow-sm ${
        root ? "border-fire bg-paper" : "border-trunk/10 bg-mist/80"
      }`}
    >
      <h3 className="font-display text-lg leading-snug">{person.name}</h3>
      {person.years ? (
        <p className="font-ui mt-1 text-xs tracking-wide text-soil">{person.years}</p>
      ) : null}
      {person.bio ? <p className="mt-2 text-sm text-trunk/75">{person.bio}</p> : null}
    </article>
  );
}

export function FamilyTree({
  people,
  relationships,
}: {
  people: Person[];
  relationships: Rel[];
}) {
  const root = people.find((p) => p.isRoot) ?? people[0];
  if (!root) {
    return <p>The tree is still a seed.</p>;
  }

  const parents = linked(people, relationships, root.id, "parent", true).concat(
    linked(people, relationships, root.id, "parent", false),
  );
  const uniqueParents = parents.filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i);
  const spouses = [
    ...linked(people, relationships, root.id, "spouse", true),
    ...linked(people, relationships, root.id, "spouse", false),
  ].filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i);
  const children = [
    ...linked(people, relationships, root.id, "child", true),
    ...linked(people, relationships, root.id, "child", false),
  ].filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i && p.id !== root.id);

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      {uniqueParents.length ? (
        <div className="flex flex-wrap justify-center gap-4">
          {uniqueParents.map((p) => (
            <Node key={p.id} person={p} />
          ))}
        </div>
      ) : null}
      <svg width="8" height="28" aria-hidden="true">
        <path d="M4 0 v28" stroke="#3f6b4f" strokeWidth="2" />
      </svg>
      <div className="flex flex-wrap items-start justify-center gap-6">
        {spouses.map((p) => (
          <Node key={p.id} person={p} />
        ))}
        <Node person={root} root />
      </div>
      <svg width="8" height="28" aria-hidden="true">
        <path d="M4 0 v28" stroke="#f0c36a" strokeWidth="2" />
      </svg>
      {children.length ? (
        <div className="flex flex-wrap justify-center gap-4">
          {children.map((p) => (
            <Node key={p.id} person={p} />
          ))}
        </div>
      ) : (
        <p className="font-ui max-w-md text-center text-sm text-trunk/50">
          Children and grandchildren will sit in this shade. Propose a relative from Contribute.
        </p>
      )}
    </div>
  );
}
