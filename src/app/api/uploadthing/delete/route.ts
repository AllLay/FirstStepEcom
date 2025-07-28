import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export async function DELETE(req: Request) {
  try {
    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 });
    }

    const deleted = await utapi.deleteFiles(key);

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error('UploadThing delete error:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}