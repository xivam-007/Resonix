'use client';

import LoginForm from '@/components/LoginForm';
import { signIn } from 'next-auth/react';
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

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
        Connecting talent with opportunity — one login away.  
      </motion.h1>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </LampContainer>
      
    </div>
  );
};

export default LoginPage;
