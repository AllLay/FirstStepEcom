import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const uploadRouter: FileRouter = {
  productImage: f({ maxFileCount: 1 }).image(),
};

export type OurFileRouter = typeof uploadRouter;
