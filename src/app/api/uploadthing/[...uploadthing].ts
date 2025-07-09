import { createUploadthing, type FileRouter } from 'uploadthing/next';

const ut = createUploadthing();

const fileRouter: FileRouter = {
  imageUploader: ut
    .file()
    .image()
    .maxSize("4MB")
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for:", file.url);
    }),
};

export type OurFileRouter = typeof fileRouter;

export const { handler } = ut.use(fileRouter);
export { handler as GET, handler as POST };
