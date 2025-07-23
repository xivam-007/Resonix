'use client';

import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (formData: {
    email: string;
    password: string;
    role: 'student' | 'recruiter';
  }) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      role: formData.role as 'student' | 'recruiter',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full bg-white/10 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full bg-white/10 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="w-full bg-white/10 text-white placeholder-white/40 p-3 rounded-xl focus:outline-none"
      >
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button type="submit" className="w-full py-3 bg-white text-black rounded-xl font-semibold transition hover:opacity-90 mb-4">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
