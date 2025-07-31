import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN;

export async function DELETE(req: Request) {
  try {
    if (!UPLOADTHING_TOKEN) {
      console.error("UPLOADTHING_TOKEN is not set in environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration: missing API token" },
        { status: 500 }
      );
    }

    const utapi = new UTApi({ apiKey: UPLOADTHING_TOKEN });

    // Parse request body for key
    let key: string | string[] | undefined;
    try {
      const json = await req.json();
      key = json.key;
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    if (!key || (Array.isArray(key) && key.length === 0)) {
      return NextResponse.json(
        { error: "Missing or empty 'key' in request body" },
        { status: 400 }
      );
    }

    // Always send an array to deleteFiles
    const keys = Array.isArray(key) ? key : [key];

    // Optionally: log the delete attempt (remove in production)
    console.log("Attempting to delete UploadThing keys:", keys);

    const deleted = await utapi.deleteFiles(keys);

    // Check if any errors occurred for any of the keys
    const errors = deleted.filter((result) => result.error);

    if (errors.length > 0) {
      console.error("UploadThing deletion error:", errors);
      return NextResponse.json(
        { error: "Failed to delete one or more files", details: errors },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      deleted
    });
  } catch (error: any) {
    console.error("UploadThing delete route error:", error);
    return NextResponse.json(
      { error: error?.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
