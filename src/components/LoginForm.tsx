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
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
