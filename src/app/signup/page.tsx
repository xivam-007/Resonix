// src/app/signup/page.tsx
'use client';

import SignupForm from '@/components/SignupForm';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'recruiter';
    profilePicture: string;
  }) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Signup successful! Redirecting to login...');
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SignupPage;
