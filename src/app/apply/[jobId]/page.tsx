// src/app/apply/[jobId]/page.tsx

"use client";

import { use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyJobPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params); // ✅ unwrap with use()

  const { data: session } = useSession();
  const router = useRouter();

  const [resume, setResume] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!resume) {
      setError("Please upload your resume.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("message", message);
    formData.append("jobId", jobId);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to apply.");
      }

      router.push("/dashboard/student");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) return <p className="text-white">Please login to apply.</p>;

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-white mb-4">Apply for this Job</h1>
      <form onSubmit={handleApply} className="space-y-4">
        <div>
          <label className="text-white block mb-1">Upload Resume (PDF only)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className="block w-full"
          />
        </div>
        <div>
          <label className="text-white block mb-1">Optional Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 rounded"
            rows={4}
            placeholder="Anything you want the recruiter to know?"
          />
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 text-black font-semibold"
        >
          {loading ? "Submitting..." : "Apply"}
        </button>
      </form>
    </div>
  );
}

