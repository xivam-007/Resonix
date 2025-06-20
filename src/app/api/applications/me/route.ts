//src/app/api/applications/me/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongoose";
import Application from "@/models/Application";
import Job from "@/models/Job";

import Student from "@/models/Student";  // Import Student model

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "student" || !session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  // Find student document by email
  const student = await Student.findOne({ email: session.user.email });
  if (!student) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  // Query applications by student _id
  const applications = await Application.find({ studentId: student._id.toString() })
    .populate({
      path: "jobId",
      select: "title",  // no 'company' field in Job model, so exclude
      model: Job,
    });

  return NextResponse.json(applications);
}

