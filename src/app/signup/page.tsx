// src/app/signup/page.tsx
'use client';

import SignupForm from '@/components/SignupForm';
import { useRouter } from 'next/navigation';
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

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
    <div>
      <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-xl font-medium tracking-tight text-transparent md:text-4xl"
      >
        Your journey starts here.  <br /> Sign in to explore and connect.
      </motion.h1>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <SignupForm onSubmit={handleSubmit} />
      </div>
    </LampContainer>
    </div>
    
  );
};

export default SignupPage;
