'use client';

import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/lib/uploadthing';

interface FileUploadProps {
  onUpload: (url: string) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  return (
    <div className="w-full">
      <UploadButton<OurFileRouter, 'imageUploader'>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (!res || res.length === 0) return;
          // in v7 the URL field is `url`
          onUpload(res[0].url);
        }}
        onUploadError={(error) => {
          console.error('Upload failed:', error);
        }}
      />
    </div>
  );
}
