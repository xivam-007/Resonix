'use client';

import LoginForm from '@/components/LoginForm';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const handleSubmit = async (formData: {
    email: string;
    password: string;
    role: 'student' | 'recruiter';
  }) => {
    const res = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      role: formData.role,
      redirect: false,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      alert('Logged in successfully');
      // You can redirect to dashboard here
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
