//src/components/ApplicantList.tsx
'use client';
import { useEffect, useState } from 'react';
import { Application } from '@/types/application';

interface Props {
  jobId: string;
}

const ApplicantList = ({ jobId }: Props) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState('');
  const [sorting, setSorting] = useState(false);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`/api/jobs/${jobId}/applications`);
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error('Error fetching applicants:', err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const handleSort = async () => {
  if (!keywords.trim()) return;
  setSorting(true);

  try {
    const res = await fetch('/api/sort-resumes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords: keywords.split(',').map(k => k.trim()), resumes: applications }),
    });

    const data = await res.json();

    if (!Array.isArray(data.sorted)) {
      throw new Error('Sorted result is not an array');
    }

    setApplications(data.sorted);
  } catch (err) {
    console.error('AI sorting failed', err);
    alert('AI sorting failed. Try again later.');
  } finally {
    setSorting(false);
  }
};

  const handleDecision = async (applicationId: string, status: 'selected' | 'rejected') => {
    try {
      const res = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        // Update local state
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          )
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (loading) return <p>Loading applicants...</p>;
  if (applications.length === 0) return <p>No applicants yet.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter skills (e.g. React, Node)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />
        <button
          onClick={handleSort}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          {sorting ? 'Sorting...' : 'Sort with AI'}
        </button>
      </div>

      {applications.map((app) => (
        <div key={app._id} className="p-4 border rounded shadow-sm">
          <p className="font-medium">{app.student?.name} ({app.student?.email})</p>
          <p className="text-sm text-gray-600">Status: {app.status}</p>
          <a
            href={app.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm block"
          >
            View Resume
          </a>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleDecision(app._id, 'selected')}
              className="px-3 py-1 text-white bg-green-600 hover:bg-green-700 rounded text-sm"
            >
              Select
            </button>
            <button
              onClick={() => handleDecision(app._id, 'rejected')}
              className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded text-sm"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicantList;
