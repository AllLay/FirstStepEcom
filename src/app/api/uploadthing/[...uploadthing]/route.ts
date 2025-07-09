import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter: FileRouter = {
  productImage: f.image({ maxFileCount: 1 }),
};

const handler = f.handleUpload(uploadRouter);

export { handler as GET, handler as POST };
