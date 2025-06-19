//src/app/applications/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditApplication() {
  const { id } = useParams(); // ✅ Use useParams instead of receiving params prop
  const [application, setApplication] = useState<any>(null);
  const [newResume, setNewResume] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchApp = async () => {
      const res = await fetch(`/api/applications/me`);
      const data = await res.json();
      const found = data.find((a: any) => a._id === id); // id from useParams
      setApplication(found);
    };

    fetchApp();
  }, [id]);

  const handleResumeUpload = async () => {
    if (!newResume || !application) return;

    if (application.updatedCount >= 2) {
      alert("Resume upload limit reached (3 times max)");
      return;
    }

    setUploading(true);

    // 🔁 Upload to Cloudinary or wherever
    const formData = new FormData();
    formData.append("file", newResume);
    formData.append("upload_preset", "ml_default"); // if using Cloudinary

    const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/dftx5zuqb/raw/upload", {
      method: "POST",
      body: formData,
    });

    const cloudinaryData = await cloudinaryRes.json();
console.log("Cloudinary response:", cloudinaryData);

const resumePath = cloudinaryData.secure_url;
if (!resumePath) {
  alert("Failed to upload resume. Please try again.");
  setUploading(false);
  return;
}

;

    // 🔁 Send to backend to update Application
    console.log("Updating resume with path:", resumePath);

    const updateRes = await fetch(`/api/applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumePath }),
    });

    const updateData = await updateRes.json();

    if (updateRes.ok) {
      alert("Resume updated successfully");
      router.push("/dashboard/student");
    } else {
      alert(updateData.message || "Failed to update resume");
    }

    setUploading(false);
  };

  if (!application) return <p>Loading application...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Resume for Job: {application.jobId.title}</h1>

      <p className="text-gray-700 mb-2">
        Current Resume:
        <a href={application.resumePath} className="text-blue-600 underline ml-2" target="_blank" rel="noopener noreferrer">
          View
        </a>
      </p>
      <p className="text-sm text-gray-500 mb-4">Edits remaining: {2 - application.updatedCount}</p>

      <input
        type="file"
        onChange={(e) => setNewResume(e.target.files?.[0] || null)}
        accept=".pdf,.doc,.docx"
        className="mb-4"
      />

      <button
        onClick={handleResumeUpload}
        disabled={uploading || !newResume}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {uploading ? "Uploading..." : "Upload New Resume"}
      </button>
    </div>
  );
}
