'use client';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { use } from "react";
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { data: session } = useSession();

  // Default path if role missing or unknown
  const dashboardPath = session?.user?.role === "recruiter"
    ? "/dashboard/recruiter"
    : "/dashboard/student";

  return (
    <nav className="sticky top-0 w-full flex items-center justify-between p-4">
      <Link
        href="/"
        className="text-2xl font-bold bg-[linear-gradient(to_right,#C29226,#B27D0F,#D9B14A,#B27D0F,#C29226,#C7972B,#FADE7B)] bg-clip-text text-transparent"
      >
        Resonix
      </Link>

      <div className="space-x-4 text-white">

        <Link href="/jobs" passHref>
          <Button asChild className="hover:underline bg-blue-800 hover:bg-blue-500">
            <span>Jobs</span>
          </Button>
        </Link>


        {!session ? (
          <>
            <Link href="/login" passHref>
              <Button asChild className="hover:underline bg-blue-800 hover:bg-blue-500">
                <span>Login</span>
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button asChild className="hover:underline bg-blue-800 hover:bg-blue-500">
                <span>Sign Up</span>
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href={dashboardPath} className="hover:underline text-sm">
            <Button asChild className="hover:underline bg-blue-800 hover:bg-blue-500">
                <span>Hi, {session.user?.name || "User"}</span>
              </Button>
              
            </Link>
            <Button asChild onClick={() => signOut()} className="hover:underline bg-blue-800 hover:bg-blue-500">
                <span>Logout</span>
              </Button>
          </>
        )}
      </div>
    </nav>
  );
}
