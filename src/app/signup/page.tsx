// src/app/signup/page.tsx
'use client';

import SignupForm from '@/components/SignupForm';
import { useRouter } from 'next/navigation';
import Silk from "@/components/Silk";

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
      
      
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md p-6 rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
          <SignupForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
    
  );
};

export default SignupPage;
