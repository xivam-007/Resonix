// src/app/api/jobs/[jobId]/route.ts
import { NextResponse } from 'next/server';
import Job from '@/models/Job';
import connectDB from '@/lib/mongoose';

export async function GET(_: Request, { params }: { params: { jobId: string } }) {
  await connectDB();
  try {
    const job = await Job.findById(params.jobId);
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

    return NextResponse.json(job, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { jobId: string } }) {
  await connectDB();
  try {
    const body = await req.json();
    const updatedJob = await Job.findByIdAndUpdate(params.jobId, body, { new: true });
    return NextResponse.json(updatedJob);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { jobId: string } }) {
  await connectDB();
  try {
    await Job.findByIdAndDelete(params.jobId);
    return NextResponse.json({ message: 'Job deleted' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Delete failed' }, { status: 500 });
  }
}
