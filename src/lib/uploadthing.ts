import { createUploadthing } from 'uploadthing/next';

const uploadthing = createUploadthing();

export const ourFileRouter = uploadthing.router({
  imageUploader: uploadthing.file()
    .image()
    .maxSize("4MB"),
});

export const useUploadThing = uploadthing.useUploadThing;
