import { generateUploadThingURL } from 'uploadthing/client';
import { FileRouter } from '@/app/api/uploadthing/core';

export const uploadFiles = async (
  endpoint: keyof FileRouter,
  { files }: { files: File[] }
) => {
  const url = generateUploadThingURL(`/api/uploadthing`, endpoint);
  const formData = new FormData();

  files.forEach((file) => formData.append('files', file));

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');

  return res.json();
};
