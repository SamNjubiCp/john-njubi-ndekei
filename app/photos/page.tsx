import { getPublishedPhotos } from "@/lib/queries";

export const metadata = { title: "Photos" };

export default async function PhotosPage() {
  const photos = await getPublishedPhotos();
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-ui text-xs uppercase tracking-[0.28em] text-leaf">Kept in the light</p>
      <h1 className="font-display mt-3 text-5xl">Photos</h1>
      <p className="mt-4 max-w-2xl text-lg text-trunk/75">
        Pictures the family has approved. Add one from Contribute.
      </p>
      {photos.length === 0 ? (
        <p className="mt-12 rounded-2xl bg-paper p-8 text-trunk/65">
          The album is empty for now. Upload a photograph and the keeper will hang it here.
        </p>
      ) : (
        <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((photo) => (
            <li key={photo.id} className="mb-4 break-inside-avoid">
              <figure className="overflow-hidden rounded-2xl bg-paper shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt={photo.caption || "A photograph"} className="w-full" />
                {(photo.caption || photo.submitter) && (
                  <figcaption className="font-ui px-4 py-3 text-sm text-trunk/70">
                    {photo.caption}
                    {photo.submitter ? ` · ${photo.submitter}` : ""}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
