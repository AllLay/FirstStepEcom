'use client';

import { UploadButton } from 'uploadthing/components';

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
          onUpload(res[0].url);
        }}
        onUploadError={(error) => {
          console.error('Upload failed:', error);
        }}
      />
    </div>
  );
}
