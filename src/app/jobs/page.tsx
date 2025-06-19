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
      <h1 className="text-3xl font-bold mb-6 text-white">Available Jobs</h1>
      <div className="space-y-6">
        {jobs.length === 0 ? (
          <p className="text-white">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-white/10 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-yellow-300">{job.title}</h2>
              <p className="text-white mt-1">{job.description}</p>
              <p className="text-white text-sm mt-1 italic">
                Posted by: {job.recruiterId}
              </p>

              {session ? (
                <Link
                  href={`/apply/${job._id}`}
                  className="mt-3 inline-block px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                >
                  Apply
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="mt-3 inline-block text-blue-400 hover:underline"
                >
                  Login to Apply
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
