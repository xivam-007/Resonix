import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Adjust the path as necessary
import connectToDatabase from "@/lib/mongoose";
import Application from "@/models/Application";
import Student from "@/models/Student";
import cloudinary from "@/utils/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const jobId = formData.get("jobId") as string;
    const message = formData.get("message") as string;
    const file = formData.get("resume") as File;

    if (!file || !file.name.endsWith(".pdf")) {
      return NextResponse.json({ error: "Invalid or missing resume file." }, { status: 400 });
    }

    await connectToDatabase();

    const student = await Student.findOne({ email: session.user.email });
    if (!student) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    const existing = await Application.findOne({ jobId, studentId: student._id });

    if (existing && existing.updatedCount >= 2) {
      return NextResponse.json({ error: "Max resume re-uploads reached (3)." }, { status: 403 });
    }

    // Read the file into buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw", // because it's a PDF
            folder: "resonix/resumes",
            public_id: `${student._id}_${jobId}_${Date.now()}`,
          },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result as { secure_url: string });
          }
        )
        .end(buffer);
    });

    const resumeURL = uploadResult.secure_url;

    if (existing) {
      existing.resumePath = resumeURL;
      existing.message = message;
      existing.updatedCount += 1;
      await existing.save();
    } else {
      await Application.create({
        jobId,
        studentId: student._id,
        resumePath: resumeURL,
        message,
        updatedCount: 0,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Apply job error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
