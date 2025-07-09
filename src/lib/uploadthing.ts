import { createUploadthing, type FileRouter } from 'uploadthing/react';

const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } }),
} satisfies FileRouter;
