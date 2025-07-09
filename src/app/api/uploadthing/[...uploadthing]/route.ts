import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

console.log("f is", f);

export const uploadRouter = {
  imageUploader: f.image({ maxFileCount: 1 }),
};

const handler = f.handleUpload(uploadRouter);

export { handler as GET, handler as POST };
