import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import Application from "@/models/Application";
import Student from "@/models/Student";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student" || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const student = await Student.findOne({ email: session.user.email });
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    const applicationId = params.id;

    let data;
    try {
      data = await req.json();
    } catch (jsonErr) {
      console.error("Failed to parse JSON body:", jsonErr);
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const { resumePath } = data;
    if (!resumePath) {
      return NextResponse.json({ message: "resumePath is required" }, { status: 400 });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 });
    }

    if (application.studentId.toString() !== student._id.toString()) {
      return NextResponse.json({ message: "Unauthorized to edit this application" }, { status: 403 });
    }

    if (application.updatedCount >= 2) {
      return NextResponse.json({ message: "Resume update limit reached" }, { status: 403 });
    }

    application.resumePath = resumePath;
    application.updatedCount += 1;
    await application.save();

    return NextResponse.json({ message: "Resume updated successfully", application });
  } catch (error) {
    console.error("PUT /api/applications/[id] error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
