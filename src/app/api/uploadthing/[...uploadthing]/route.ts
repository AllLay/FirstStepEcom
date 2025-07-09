import { createUploadthing, type FileRouter } from "uploadthing/next";

const uploadthing = createUploadthing();

const imageUploader = uploadthing
  .fileTypes(["image"])
  .maxFileSize(1024 * 1024 * 10)
  .onUploadComplete(({ file }) => {
    console.log("Upload complete for file:", file);
  });

export const ourFileRouter: FileRouter = {
  imageUploader,
};

export const { GET, POST } = uploadthing(ourFileRouter);
