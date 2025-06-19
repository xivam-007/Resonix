'use client';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { use } from "react";

export default function Navbar() {
  const { data: session } = useSession();

  // Default path if role missing or unknown
  const dashboardPath = session?.user?.role === "recruiter"
    ? "/dashboard/recruiter"
    : "/dashboard/student";

  return (
    <nav className="sticky top-0 w-full z-50 bg-transparent backdrop-blur-md shadow-md border-b border-white/20 flex items-center justify-between p-4">
      <Link
        href="/"
        className="text-2xl font-bold bg-[linear-gradient(to_right,#C29226,#B27D0F,#D9B14A,#B27D0F,#C29226,#C7972B,#FADE7B)] bg-clip-text text-transparent"
      >
        Resonix
      </Link>

      <div className="space-x-4 text-white">
        <Link href="/jobs" className="hover:underline">Jobs</Link>

        {!session ? (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Sign Up</Link>
          </>
        ) : (
          <>
            <Link href={dashboardPath} className="hover:underline text-sm">
              Hi, {session.user?.name || "User"}
            </Link>
            <button onClick={() => signOut()} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
