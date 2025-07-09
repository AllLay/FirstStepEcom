import { createUploadthing, type FileRouter } from "@uploadthing/next";

const ut = createUploadthing();

export const uploadRouter = {
  imageUploader: ut
    .fileType("image")
    .maxSize("4MB")
    .middleware(async (_req, _res) => {
      return { userId: "logged‑in user id" };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete!", file);
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const { handler: uploadthingHandler } = ut;
