'use client';

import LoginForm from '@/components/LoginForm';
import { signIn } from 'next-auth/react';
import Silk from "@/components/Silk";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

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
      router.push(`/dashboard/${formData.role}`); // Redirect to dashboard after successful login
      // You can redirect to dashboard here
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Silk background */}
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={10}
          scale={1}
          color="170123"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Login form with glass effect */}
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md p-6 rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Log In</h2>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
