// src/app/recruiter/post-job/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'; // or 'next/router' in older versions


export default function PostJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          requiredSkills: skills.split(",").map((s) => s.trim()),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to post job");

      setMessage("✅ Job posted successfully!");
      setTitle("");
      setDescription("");
      setSkills("");
      router.push('/dashboard/recruiter'); // Redirect to the recruiter dashboard
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-white">
      <h1 className="mt-20 text-5xl font-classy text-transparent bg-clip-text bg-gradient-to-r from-[#4f3ddb] via-[#8171fd] via-[#a093fe] to-[#F8E9A1] drop-shadow-xl mb-2">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/10 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none"
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full bg-white/10 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Required Skills (comma-separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full bg-white/10 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#281e5d] hover:bg-[#322574] p-2 rounded font-semibold"
        >

          {loading ? "Posting..." : "Post Job"}
        </button>
        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}

