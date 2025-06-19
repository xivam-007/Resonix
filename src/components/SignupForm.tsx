'use client';

import { useState } from 'react';

interface SignupFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'recruiter';
    profilePicture: string;
  }) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    profilePicture: '', // State for profile picture URL
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // If the user selects a file, we can upload it or store the URL here
      // For now, we will assume the file is uploaded and store the URL (you will need to handle the actual upload logic).
      // Set the profile picture URL (In production, this would be uploaded to a server)
      setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If no profile picture, set a default one
    const profilePicUrl = formData.profilePicture || 'https://imgs.search.brave.com/WzQXL-_MEyjP82boCkEziDfRL1iTLeolfB32EbcOtLk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/cG5naW1nLmNvbS9z/dGF0aWMvaW1nL2Nh/dC9lbW9qaS5wbmc'; // Default image URL

    onSubmit({
      ...formData,
      profilePicture: profilePicUrl, // Include the profile picture URL in the form data
      role: formData.role as 'student' | 'recruiter',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
      </select>

      {/* Profile Picture Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 rounded"
      />
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
