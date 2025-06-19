// src/app/dashboard/recruiter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import JobCard from '@/components/JobCard';
import ApplicantList from '@/components/ApplicantList';
import { Job } from '@/types/job';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null); // Track which job is expanded
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      const session = await getSession();
      if (!session?.user?.email) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/recruiter/jobs');
      const data = await response.json();
      console.log('Jobs data:', data);

      if (response.ok && data.jobs) {
        setJobs(data.jobs);
      } else {
        console.error('Failed to load jobs:', data.error); 
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="border rounded-lg shadow-sm p-4">
              <JobCard job={job} />
              <button
                onClick={() =>
                  setExpandedJobId((prev) => (prev === job._id ? null : job._id))
                }
                className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                {expandedJobId === job._id ? 'Hide Applicants' : 'View Applicants'}
              </button>
              {expandedJobId === job._id && (
                <div className="mt-4">
                  <ApplicantList jobId={job._id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
