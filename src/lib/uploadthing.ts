import { generateUploadThingURL, UTApi } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";

import { createUploadthing, type FileRouter } from "uploadthing/server";

export const uploadFiles = async (
  endpoint: string,
  opts: { files: File[] }
): Promise<
  {
    url: string;
    key: string;
    name: string;
    size: number;
    type: string;
  }[]
> => {
  const res = await fetch(`/api/uploadthing?slug=${endpoint}`, {
    method: "POST",
    body: opts.files[0],
  });

  if (!res.ok) {
    throw new UploadThingError("Upload failed");
  }

  const data = await res.json();
  return [data];
};
