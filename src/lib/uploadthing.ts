import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
