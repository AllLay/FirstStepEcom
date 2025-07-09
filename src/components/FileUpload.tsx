'use client';

import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

export function FileUpload({ onUpload }: { onUpload: (url: string) => void }) {
  return (
    <UploadButton<OurFileRouter>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res && res[0]?.url) {
          onUpload(res[0].url);
        }
      }}
      onUploadError={(error) => {
        console.error('Upload failed:', error.message);
        alert('Image upload failed.');
      }}
    />
  );
}
