"use client";

import { useEffect, useState } from "react";

type Application = {
  _id: string;
  resumePath: string;
  updatedCount: number;
  status: string;
  jobId: {
    _id: string;
    title: string;
  };
};

export default function StudentDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/applications/me");
        const data = await res.json();
        if (Array.isArray(data)) {
          setApplications(data);
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="mt-20 text-5xl font-classy text-transparent bg-clip-text bg-gradient-to-r from-[#4f3ddb] via-[#8171fd] via-[#a093fe] to-[#F8E9A1] drop-shadow-xl mb-10">Your Applications</h1>
      <div className="space-y-4 text-white/50">
        {applications.length === 0 && <p>No applications yet.</p>}
        {applications.map((app) => (
          <div
            key={app._id}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {app.jobId?.title || "Unknown Job"}
              </h2>
              <p className="mt-2 text-sm">
                Resume:{" "}
                {app.resumePath ? (
                  <a
                    href={app.resumePath}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-red-600">Not uploaded</span>
                )}
              </p>
              <p className="text-sm">Edits left: {2 - app.updatedCount}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={
                    app.status === "selected"
                      ? "text-green-600 font-semibold"
                      : app.status === "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                  }
                >
                  {app.status}
                </span>
              </p>
            </div>

            <a
              href={`/applications/${app._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
