import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Application from '@/models/Application';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;
  const { status } = await req.json();

  try {
    const app = await Application.findByIdAndUpdate(id, { status }, { new: true });

    if (!app) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(app, { status: 200 });
  } catch (err) {
    console.error('Update failed:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
