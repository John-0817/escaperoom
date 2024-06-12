'use client'

import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/firebaseConfig';

export default function RenderLoginForm() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.current && password.current) {
      try {
        await signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        setError(null);
        
        router.push('/playground');
      } catch (error) {
        setError('Failed to log in. Please check your email and password.');
      }
    } else {
      setError('Email or password is missing.');
    }
  };

  return (
    <form onSubmit={handleLogin} className='w-[300px] h-[500px] flex flex-col px-4 py-2 text-xs font-medium border shadow-lg rounded-lg'>
      <h1 className='my-8 text-xl font-black text-center'>Login</h1>
      <div className='flex flex-col'>
        {/* Email */}
        <label 
          htmlFor="email" 
          className='pl-1 text-sm font-bold'
        >
          Email
        </label>
        <input 
          id="email" 
          type="email" 
          ref={email} 
          className='my-1 pl-2 leading-7 bg-gray-100 rounded-xl'
        />
      </div>
      <div className=' flex flex-col mt-1'>
        {/* Password */}
        <label 
          htmlFor="password" 
          className='pl-1 text-sm font-bold'
        >
          Password
        </label>
        <input 
          id="password" 
          type="password" 
          ref={password} 
          className='my-1 pl-2 leading-7 bg-gray-100 rounded-xl'
        />
      </div>
      {/* Message Output */}
      {error && <p className='mt-1 text-red-500'>{error}</p>}
      <div className='grow place-content-end'>
        <div className='flex flex-col mb-8 justify-center gap-4'>
          <button 
            type="submit" 
            className='flex justify-center items-center leading-7 bg-blue-200 shadow text-sm font-semibold'
          >
            Log In
          </button>
          <div className='flex items-baseline justify-center'>
            <p>Don&apos;t have an account?</p>
            <Link 
              href={'/register'} 
              className='text-sm font-semibold ml-1 leading-none'
            >
              Register
            </Link>
            <p className='ml-1 leading-none'>now!</p>
          </div>
        </div>
      </div>
    </form>
  )
}
