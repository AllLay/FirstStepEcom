'use client';

import { UploadButton } from 'uploadthing/react';

interface FileUploadProps {
  onUpload: (url: string) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  return (
    <div className="w-full">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (!res || res.length === 0) return;
          const fileUrl = res[0].url;
          onUpload(fileUrl);
        }}
        onUploadError={(error) => {
          console.error('Upload failed:', error);
        }}
      />
    </div>
  );
}
