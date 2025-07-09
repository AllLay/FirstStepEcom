import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } }),
} satisfies FileRouter;
