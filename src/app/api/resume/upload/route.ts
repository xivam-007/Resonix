import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import cloudinary from "@/utils/cloudinary";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session || session.user.role !== "student") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "raw", folder: "resumes" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({ success: true, data: res });
  } catch (err) {
    console.error("Cloudinary upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
