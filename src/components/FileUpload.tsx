'use client';

import { useState } from 'react';
import { useUploadThing, type UploadFile } from 'uploadthing/next';
import { Button } from 'your-ui-library-or-html';

interface FileUploadProps {
  onUpload: (url: string) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const { startUpload } = useUploadThing('imageUploader');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles as any);

    const res = await startUpload(selectedFiles);

    if (res && res.length > 0) {
      onUpload(res[0].fileUrl);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple={false}
        onChange={handleUpload}
        className="cursor-pointer"
      />
    </div>
  );
}
