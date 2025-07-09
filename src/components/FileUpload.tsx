'use client';

import { UploadButton } from '@uploadthing/next';
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
          onUpload(res[0].url);
        }}
        onUploadError={(error) => {
          console.error('Upload failed:', error);
        }}
      />
    </div>
  );
}
