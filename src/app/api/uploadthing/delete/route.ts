import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export async function DELETE(req: Request) {
  try {
    const { key } = await req.json();

    console.log('Received key for deletion:', key);

    if (!key) {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 });
    }

    const deleted = await utapi.deleteFiles(Array.isArray(key) ? key : [key]);

    console.log('Deleted files response:', deleted);

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error('UploadThing delete error:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
