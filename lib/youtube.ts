const ID = /(?:v=|\/embed\/|youtu\.be\/|\/live\/|\/shorts\/)([A-Za-z0-9_-]{11})/;

export function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(ID);
  return match?.[1] ?? null;
}

export function embedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (trimmed.includes("/embed/")) {
    return trimmed.replace("www.youtube.com", "www.youtube-nocookie.com");
  }
  const id = youtubeId(trimmed);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

export function watchUrl(url: string | null | undefined): string | null {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url ?? null;
}
