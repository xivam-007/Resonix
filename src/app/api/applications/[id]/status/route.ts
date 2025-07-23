//src/app/api/applications/[id]/status/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Application from '@/models/Application';

export async function PUT(req: NextRequest) {
  await dbConnect();

  // ✅ Extract the application ID from the URL
  const url = new URL(req.url);
  const pathParts = url.pathname.split('/');
  const id = pathParts[pathParts.length - 2]; // "status" is the last part

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
