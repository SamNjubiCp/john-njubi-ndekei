import {
  deleteHymn,
  logoutAction,
  publishKeeperPhoto,
  saveChapter,
  saveHymn,
  saveStream,
  setStatus,
} from "@/app/actions/admin";
import { isAdmin } from "@/lib/auth";
import { getAdminLists, getPending } from "@/lib/queries";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin" };

function StatusButtons({ id, table }: { id: string; table: string }) {
  return (
    <div className="font-ui flex gap-2 text-sm">
      <form action={setStatus}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="status" value="published" />
        <button className="rounded-full bg-leaf px-3 py-1 text-paper">Approve</button>
      </form>
      <form action={setStatus}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="status" value="rejected" />
        <button className="rounded-full bg-soil px-3 py-1 text-paper">Reject</button>
      </form>
    </div>
  );
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const pending = await getPending();
  const lists = await getAdminLists();

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Keeper</h1>
        <form action={logoutAction}>
          <button className="font-ui text-sm text-soil underline">Leave</button>
        </form>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl">Waiting for you</h2>
        <div className="mt-4 space-y-4">
          {pending.stories.map((item) => (
            <article key={item.id} className="rounded-2xl bg-paper p-5">
              <p className="font-ui text-xs uppercase tracking-widest text-leaf">Story</p>
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-2">{item.body}</p>
              <p className="font-ui mt-2 text-sm text-soil">
                {item.authorName}
                {item.relation ? ` · ${item.relation}` : ""}
              </p>
              <div className="mt-3">
                <StatusButtons id={item.id} table="stories" />
              </div>
            </article>
          ))}
          {pending.lessons.map((item) => (
            <article key={item.id} className="rounded-2xl bg-paper p-5">
              <p className="font-ui text-xs uppercase tracking-widest text-leaf">Lesson</p>
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-2">{item.body}</p>
              <div className="mt-3">
                <StatusButtons id={item.id} table="lessons" />
              </div>
            </article>
          ))}
          {pending.photos.map((item) => (
            <article key={item.id} className="rounded-2xl bg-paper p-5">
              <p className="font-ui text-xs uppercase tracking-widest text-leaf">Photo</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt="" className="mt-2 max-h-56 rounded-xl" />
              <p className="mt-2 text-sm">{item.caption}</p>
              <div className="mt-3">
                <StatusButtons id={item.id} table="photos" />
              </div>
            </article>
          ))}
          {pending.people.map((item) => (
            <article key={item.id} className="rounded-2xl bg-paper p-5">
              <p className="font-ui text-xs uppercase tracking-widest text-leaf">Relative</p>
              <h3 className="font-display text-xl">{item.name}</h3>
              <p className="mt-1 text-sm text-soil">{item.years}</p>
              <p className="mt-2">{item.bio}</p>
              <div className="mt-3">
                <StatusButtons id={item.id} table="people" />
              </div>
            </article>
          ))}
          {!pending.stories.length &&
          !pending.lessons.length &&
          !pending.photos.length &&
          !pending.people.length ? (
            <p className="text-trunk/60">Nothing waiting.</p>
          ) : null}
        </div>
      </section>

      <section className="mt-14 rounded-2xl bg-paper p-6">
        <h2 className="font-display text-2xl">Livestream</h2>
        <form action={saveStream} className="mt-4 grid gap-3">
          <label className="font-ui text-sm">
            Status
            <select
              name="status"
              defaultValue={lists.stream?.status ?? "upcoming"}
              className="mt-1 w-full rounded-xl border border-trunk/15 bg-mist px-3 py-2"
            >
              <option value="upcoming">Upcoming</option>
              <option value="live">Live</option>
              <option value="ended">Ended (show recording)</option>
            </select>
          </label>
          <label className="font-ui text-sm">
            YouTube URL
            <input
              name="youtubeUrl"
              defaultValue={lists.stream?.youtubeUrl ?? ""}
              className="mt-1 w-full rounded-xl border border-trunk/15 bg-mist px-3 py-2"
            />
          </label>
          <label className="font-ui text-sm">
            Recording URL (if different)
            <input
              name="recordingUrl"
              defaultValue={lists.stream?.recordingUrl ?? ""}
              className="mt-1 w-full rounded-xl border border-trunk/15 bg-mist px-3 py-2"
            />
          </label>
          <label className="font-ui text-sm">
            Note (time, place)
            <input
              name="startNote"
              defaultValue={lists.stream?.startNote ?? ""}
              className="mt-1 w-full rounded-xl border border-trunk/15 bg-mist px-3 py-2"
            />
          </label>
          <button className="font-ui w-fit rounded-full bg-trunk px-5 py-2 text-paper">Save stream</button>
        </form>
      </section>

      <section className="mt-10 rounded-2xl bg-paper p-6">
        <h2 className="font-display text-2xl">Hymns</h2>
        <ul className="mt-4 space-y-6">
          {lists.hymns.map((hymn) => (
            <li key={hymn.id} className="border-t border-trunk/10 pt-4">
              <form action={saveHymn} className="grid gap-2">
                <input type="hidden" name="id" value={hymn.id} />
                <input
                  name="title"
                  defaultValue={hymn.title}
                  className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
                />
                <input
                  name="youtubeUrl"
                  placeholder="YouTube URL"
                  defaultValue={hymn.youtubeUrl ?? ""}
                  className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
                />
                <input
                  name="sortOrder"
                  defaultValue={hymn.sortOrder}
                  className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
                />
                <textarea
                  name="lyrics"
                  rows={6}
                  placeholder="Lyrics"
                  defaultValue={hymn.lyrics}
                  className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
                />
                <button className="font-ui w-fit rounded-full bg-trunk px-4 py-1.5 text-sm text-paper">
                  Save hymn
                </button>
              </form>
              <form action={deleteHymn} className="mt-2">
                <input type="hidden" name="id" value={hymn.id} />
                <button className="font-ui text-sm text-soil">Remove</button>
              </form>
            </li>
          ))}
        </ul>
        <form action={saveHymn} className="mt-6 grid gap-2 border-t border-trunk/10 pt-4">
          <p className="font-ui text-sm text-leaf">Add a hymn</p>
          <input
            name="title"
            required
            placeholder="Title"
            className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
          />
          <input
            name="youtubeUrl"
            placeholder="YouTube URL"
            className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
          />
          <input
            name="sortOrder"
            defaultValue={lists.hymns.length + 1}
            className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
          />
          <textarea
            name="lyrics"
            rows={4}
            placeholder="Lyrics (only verses you have the right to share)"
            className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
          />
          <button className="font-ui w-fit rounded-full bg-trunk px-4 py-1.5 text-sm text-paper">
            Add hymn
          </button>
        </form>
      </section>

      <section className="mt-10 rounded-2xl bg-paper p-6">
        <h2 className="font-display text-2xl">Life chapters</h2>
        <ul className="mt-4 space-y-6">
          {lists.chapters.map((chapter) => (
            <li key={chapter.id}>
              <form action={saveChapter} className="grid gap-2">
                <input type="hidden" name="id" value={chapter.id} />
                <input
                  name="period"
                  defaultValue={chapter.period}
                  className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
                />
                <input
                  name="title"
                  defaultValue={chapter.title}
                  className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
                />
                <textarea
                  name="body"
                  rows={5}
                  defaultValue={chapter.body}
                  className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
                />
                <button className="font-ui w-fit rounded-full bg-trunk px-4 py-1.5 text-sm text-paper">
                  Save chapter
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-paper p-6">
        <h2 className="font-display text-2xl">Publish a photo now</h2>
        <form action={publishKeeperPhoto} className="mt-4 grid gap-3" encType="multipart/form-data">
          <input name="photo" type="file" accept="image/*" required />
          <input
            name="caption"
            placeholder="Caption"
            className="rounded-xl border border-trunk/15 bg-mist px-3 py-2"
          />
          <button className="font-ui w-fit rounded-full bg-trunk px-4 py-1.5 text-sm text-paper">
            Publish
          </button>
        </form>
      </section>
    </div>
  );
}
