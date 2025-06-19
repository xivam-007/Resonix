// src/app/api/jobs/recruiter/[recruiterId]/route.ts
// This lists all the jobs posted by a specific recruiter.
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Job from '@/models/Job';
import mongoose from 'mongoose';

export async function GET(req: Request, { params }: { params: { recruiterId: string } }) {
  try {
    await connectToDatabase();

    const { recruiterId } = params;

    if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
      return NextResponse.json({ error: 'Invalid recruiter ID' }, { status: 400 });
    }

    const jobs = await Job.find({ recruiterId });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
