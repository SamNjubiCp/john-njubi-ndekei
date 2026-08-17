import assert from "node:assert/strict";
import { embedUrl, youtubeId } from "./youtube";

assert.equal(youtubeId("dQw4w9WgXcQ"), "dQw4w9WgXcQ");
assert.equal(
  youtubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
  "dQw4w9WgXcQ",
);
assert.equal(youtubeId("https://youtu.be/dQw4w9WgXcQ"), "dQw4w9WgXcQ");
assert.equal(
  youtubeId("https://www.youtube.com/embed/dQw4w9WgXcQ"),
  "dQw4w9WgXcQ",
);
assert.equal(youtubeId("https://www.youtube.com/live/dQw4w9WgXcQ"), "dQw4w9WgXcQ");
assert.equal(youtubeId(""), null);
assert.equal(youtubeId(null), null);
assert.equal(
  embedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
  "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
);
console.log("youtube tests ok");
