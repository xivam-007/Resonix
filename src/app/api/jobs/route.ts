// src/app/api/jobs/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Job from "@/models/Job";
import connectDB from "@/lib/mongoose";

// Handle GET request – fetch all jobs
export async function GET() {
  try {
    await connectDB(); // connect to MongoDB
    const jobs = await Job.find().lean();
    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to load jobs" }, { status: 500 });
  }
}

// Handle POST request – create a new job
export async function POST(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, requiredSkills } = body;

    if (!title || !description || !requiredSkills) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newJob = new Job({
      title,
      description,
      requiredSkills,
      recruiterId: session.user.email,
    });

    await newJob.save();

    return NextResponse.json({ message: "Job posted successfully" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
