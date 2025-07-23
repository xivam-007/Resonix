"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Job = {
  _id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  recruiterId: string;
};

export default function JobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="mt-20 text-5xl font-classy text-transparent bg-clip-text bg-gradient-to-r from-[#4f3ddb] via-[#8171fd] to-[#F8E9A1] drop-shadow-xl mb-8">Available Jobs</h1>
      <div className="space-y-6">
        {jobs.length === 0 ? (
          <p className="text-white">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-white/10 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-extrabold text-[#aea3fe]">{job.title}</h2>
              <p className="text-white mt-1 font-bold">🔴 {job.description}</p>
              <p className="text-white/50 text-sm mt-1 italic">
                Posted by: {job.recruiterId}
              </p>

              {!session ? (
  <Link
    href="/login"
    className="mt-3 inline-block text-blue-400 hover:underline"
  >
    Login to Apply
  </Link>
) : session.user?.role === "student" ? (
  <Link
    href={`/apply/${job._id}`}
    className="mt-3 inline-block px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
  >
    Apply
  </Link>
) : null}

            </div>
          ))
        )}
      </div>
    </div>
  );
}
