// src/app/api/jobs/post/route.ts
import { NextResponse } from "next/server";
import Job from "@/models/Job";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log("Session inside POST route:", session);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, requiredSkills } = await req.json();

    const job = new Job({
      title,
      description,
      requiredSkills,
      recruiterId: session.user.email,  // Using email directly from session
    });

    await job.save();

    return NextResponse.json({ message: "Job posted successfully!" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to post job" }, { status: 500 });
  }
}
