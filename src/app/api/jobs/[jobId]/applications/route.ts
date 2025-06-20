import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Application from '@/models/Application';
import Student from '@/models/Student'; // ✅ Make sure you have this model

export async function GET(req: NextRequest, context: { params: { jobId: string } }) {
  const { jobId } = context.params;
  await connectDB();

  try {
    const applications = await Application.find({ jobId })
      .populate({
        path: 'studentId',
        model: 'Student',
        select: '_id name email',
      });

    // Format the response
    const formatted = applications.map((app: any) => ({
      _id: app._id,
      jobId: app.jobId,
      resumeUrl: app.resumePath,
      status: app.status,
      student: {
        _id: app.studentId._id,
        name: app.studentId.name,
        email: app.studentId.email,
      },
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
