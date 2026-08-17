import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function s3() {
  const bucket = process.env.S3_BUCKET || process.env.BUCKET;
  if (!bucket) return null;
  return {
    bucket,
    client: new S3Client({
      region: process.env.AWS_REGION || process.env.REGION || "auto",
      endpoint: process.env.AWS_ENDPOINT_URL || process.env.ENDPOINT,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.ACCESS_KEY_ID || "",
        secretAccessKey:
          process.env.AWS_SECRET_ACCESS_KEY || process.env.SECRET_ACCESS_KEY || "",
      },
    }),
  };
}

function safeName(name: string) {
  return `${Date.now()}-${name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80)}`;
}

export async function savePhoto(file: File) {
  if (!file.size) throw new Error("Empty file");
  if (file.size > 8_000_000) throw new Error("Photo must be under 8MB");
  if (!file.type.startsWith("image/")) throw new Error("Please upload an image");

  const key = safeName(file.name);
  const body = Buffer.from(await file.arrayBuffer());
  const remote = s3();

  if (remote) {
    await remote.client.send(
      new PutObjectCommand({
        Bucket: remote.bucket,
        Key: key,
        Body: body,
        ContentType: file.type,
      }),
    );
    return key;
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, key), body);
  return key;
}

export async function photoUrl(key: string) {
  const remote = s3();
  if (remote) {
    return getSignedUrl(
      remote.client,
      new GetObjectCommand({ Bucket: remote.bucket, Key: key }),
      { expiresIn: 60 * 60 },
    );
  }
  return `/uploads/${key}`;
}
