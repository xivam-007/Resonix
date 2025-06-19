// src/app/student/upload-resume/page.tsx
'use client';

import { useState } from 'react';

export default function UploadResumePage() {
  const [form, setForm] = useState({
    skills: '',
    resumeUrl: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/student/upload-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skills: form.skills,
        resumeUrl: form.resumeUrl,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Resume uploaded successfully ✅');
      setForm({ skills: '', resumeUrl: '' });
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={form.skills}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="resumeUrl"
          placeholder="Link to your resume (Google Drive, etc.)"
          value={form.resumeUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
