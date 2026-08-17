import { FeedbackForm, Field } from "@/components/FeedbackForm";
import {
  submitLesson,
  submitPhoto,
  submitRelative,
  submitStory,
} from "@/app/actions/contribute";
import { getFamily } from "@/lib/queries";

export const metadata = { title: "Contribute" };

export default async function ContributePage() {
  const { people } = await getFamily();
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-ui text-xs uppercase tracking-[0.28em] text-leaf">Add to the house</p>
      <h1 className="font-display mt-3 text-5xl">Contribute</h1>
      <p className="mt-4 text-lg text-trunk/75">
        Stories, lessons, photographs, and relatives wait here until the family keeper approves them.
        Nothing goes live on its own.
      </p>

      <section className="mt-12 rounded-2xl bg-paper p-6 shadow-sm">
        <h2 className="font-display text-2xl">A story</h2>
        <FeedbackForm action={submitStory} className="mt-4 grid gap-4">
          <Field label="Your name" name="authorName" required />
          <Field label="How you knew him" name="relation" />
          <Field label="Title" name="title" required />
          <Field label="The story" name="body" textarea required />
        </FeedbackForm>
      </section>

      <section className="mt-8 rounded-2xl bg-paper p-6 shadow-sm">
        <h2 className="font-display text-2xl">A lesson</h2>
        <FeedbackForm action={submitLesson} className="mt-4 grid gap-4">
          <Field label="Short title" name="title" required />
          <Field label="The lesson" name="body" textarea required />
          <Field label="As told by (optional)" name="attribution" />
        </FeedbackForm>
      </section>

      <section className="mt-8 rounded-2xl bg-paper p-6 shadow-sm">
        <h2 className="font-display text-2xl">A photograph</h2>
        <FeedbackForm action={submitPhoto} className="mt-4 grid gap-4">
          <Field label="Your name" name="submitter" />
          <Field label="Caption" name="caption" />
          <label className="font-ui text-sm">
            Photo
            <input
              name="photo"
              type="file"
              accept="image/*"
              required
              className="mt-1 block w-full text-sm"
            />
          </label>
        </FeedbackForm>
      </section>

      <section className="mt-8 rounded-2xl bg-paper p-6 shadow-sm">
        <h2 className="font-display text-2xl">A relative</h2>
        <FeedbackForm action={submitRelative} className="mt-4 grid gap-4">
          <Field label="Their name" name="name" required />
          <Field label="Years (optional)" name="years" />
          <label className="font-ui text-sm">
            They are a
            <select
              name="type"
              className="mt-1 w-full rounded-xl border border-trunk/15 bg-mist px-3 py-2"
              defaultValue="child"
            >
              <option value="child">child</option>
              <option value="parent">parent</option>
              <option value="spouse">spouse</option>
              <option value="sibling">sibling</option>
            </select>
          </label>
          <label className="font-ui text-sm">
            of
            <select
              name="relatedTo"
              required
              className="mt-1 w-full rounded-xl border border-trunk/15 bg-mist px-3 py-2"
            >
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </label>
          <Field label="A few words (optional)" name="bio" textarea />
        </FeedbackForm>
      </section>
    </div>
  );
}
