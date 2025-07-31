import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN || '';

const utapi = new UTApi({
  apiKey: UPLOADTHING_TOKEN,
});

export async function DELETE(req: Request) {
  try {
    console.log('UploadThing DELETE route called');
    console.log('Using UploadThing token:', Boolean(UPLOADTHING_TOKEN));

    const { key } = await req.json();

    console.log('Received key for deletion:', key);

    if (!key) {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 });
    }

    const deleted = await utapi.deleteFiles(Array.isArray(key) ? key : [key]);
    console.log('Deleted files response:', deleted);
    
    if (deleted?.error) {
      console.error('UploadThing API error:', deleted.error);
      return NextResponse.json({ error: deleted.error }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    console.error('UploadThing delete error:', error.message, error.stack);
    return NextResponse.json({ error: error.message || 'Failed to delete file' }, { status: 500 });
  }
}
