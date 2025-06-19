//src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongoose';
import Student from '@/models/Student';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
      await connectMongoDB();
  
      const { email, password } = await req.json();
  
      console.log('Email:', email);
      console.log('Password:', password);
  
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
      }
  
      const student = await Student.findOne({ email });
  
      if (!student) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
  
      const isMatch = await bcrypt.compare(password, student.password);
  
      if (!isMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
  
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } catch (error: any) {
      console.error('Error logging in:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  
