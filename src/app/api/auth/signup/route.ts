//src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Student from "@/models/Student";
import Recruiter from "@/models/Recruiter";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  const { name, email, password, role, company, profilePicture } = await req.json();

  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (role === "student") {
      const existing = await Student.findOne({ email });
      if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 400 });

      const newStudent = new Student({ name, email, password: hashedPassword, profilePicture });
      await newStudent.save();

      return NextResponse.json({ message: "Student registered successfully" });
    }

    if (role === "recruiter") {
      const existing = await Recruiter.findOne({ email });
      if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 400 });

      const newRecruiter = new Recruiter({ name, email, password: hashedPassword, company, profilePicture });
      await newRecruiter.save();

      return NextResponse.json({ message: "Recruiter registered successfully" });
    }

    return NextResponse.json({ error: "Invalid role" }, { status: 400 });

  } catch (err) {
    return NextResponse.json({ error: "Signup failed", details: err }, { status: 500 });
  }
}
