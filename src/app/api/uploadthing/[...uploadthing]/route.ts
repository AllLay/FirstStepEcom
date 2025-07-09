import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const uploadRouter: FileRouter = {
  productImage: f({ maxFileCount: 1 }).image(),
};

const handler = f.handleUpload(uploadRouter);

export { handler as GET, handler as POST };
