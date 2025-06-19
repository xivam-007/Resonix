// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongoose";
import Student from "@/models/Student";
import Recruiter from "@/models/Recruiter";
import bcrypt from "bcryptjs";

// ✅ Exported authOptions with correct type
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Credentials are missing");

        await dbConnect();

        const { email, password, role } = credentials;
        if (!email || !password || !role) {
          throw new Error("Email, password, and role are required");
        }

        let user = null;

        if (role === "student") {
          user = await Student.findOne({ email });
        } else if (role === "recruiter") {
          user = await Recruiter.findOne({ email });
        } else {
          throw new Error("Invalid role");
        }

        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Incorrect password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // ✅ this is fine now
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    },
    
    
  },

  pages: {
    signIn: "/login",
  },
};

// 👇 use authOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
