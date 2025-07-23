'use client';
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { data: session } = useSession();
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll);

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Default path if role missing or unknown
  const dashboardPath = session?.user?.role === "recruiter"
    ? "/dashboard/recruiter"
    : "/dashboard/student";

  return (
    <header className={`fixed w-full left-1/2 py-5 px-5 md:px-20 -translate-x-1/2 z-[100] transition-all duration-300 ease-in-out ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="mx-auto flex items-center justify-between">
      <Link
        href="/"
        className="text-2xl font-bold bg-[linear-gradient(to_right,#C29226,#B27D0F,#D9B14A,#B27D0F,#C29226,#C7972B,#FADE7B)] bg-clip-text text-transparent"
      >
        Resonix
      </Link>

      <div className="space-x-4 text-white">

        <Link href="/jobs" passHref>
          <Button asChild className="hover:underline bg-gray-300 text-black hover:bg-gray-400">
            <span>Jobs</span>
          </Button>
        </Link>


        {!session ? (
          <>
            <Link href="/login" passHref>
              <Button asChild className="hover:underline bg-gray-300 text-black hover:bg-gray-400">
                <span>Login</span>
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button asChild className="hover:underline bg-gray-300 text-black hover:bg-gray-400">
                <span>Sign Up</span>
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href={dashboardPath} className="hover:underline text-sm">
            <Button asChild className="hover:underline bg-gray-300 text-black hover:bg-gray-400">
                <span>Hi, {session.user?.name || "User"}</span>
              </Button>
              
            </Link>
            <Button asChild onClick={() => signOut()} className="hover:underline bg-gray-300 text-black hover:bg-gray-400">
                <span>Logout</span>
              </Button>
          </>
        )}
      </div>
      </div>
    </header>
  );
}
