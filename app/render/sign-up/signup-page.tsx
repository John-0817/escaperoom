'use client'

import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/firebaseConfig';

export default function RenderSignUpForm() {
  const userName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.current?.value) {
      setError('Username is missing.');
      return;
    }

    if (!email.current?.value) {
      setError('Email is missing.');
      return;
    }
    
    if (!password.current?.value) {
      setError('Password is missing.');
      return;
    }
  
    if (!confirmPassword.current?.value) {
      setError('Please confirm your password.');
      return;
    }
  
    if (password.current.value !== confirmPassword.current.value) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
      setError(null);
      setSuccess(true);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email already exist.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. It should be at least 6 characters long.');
          break;
        default:
          setError('Failed to sign up. Please check your email and password.');
          break;
      }
    }
  };

  return(
    <form onSubmit={handleSignUp} className='w-[300px] h-[500px] flex flex-col px-4 py-2 text-xs font-medium border shadow-lg rounded-lg'>
      <h1 className='my-8 text-xl font-black text-center'>Sign up</h1>
      <div className='flex flex-col'>
        <label 
          htmlFor="userName" 
          className='pl-1 text-sm font-bold'
        >
          Username
        </label>
        <input 
          id="userName" 
          type="userName" 
          ref={userName} 
          className='my-1 pl-2 leading-7 bg-gray-100 rounded-xl'
        />
      </div>
      <div className='flex flex-col mt-1'>
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
      <div className='flex flex-col mt-1'>
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
      <div className='flex flex-col mt-1'>
        <label 
          htmlFor="confirmPassword" 
          className='pl-1 text-sm font-bold'
        >
          Confirm Password
        </label>
        <input 
          id="confirmPassword" 
          type="confirmPassword" 
          ref={confirmPassword} 
          className='my-1 pl-2 leading-7 bg-gray-100 rounded-xl'
        />
      </div>
      {error && <p className='mt-1 text-red-500'>{error}</p>}
      <div className='grow place-content-end'>
        <div className='flex flex-col mb-8 justify-center gap-4'>
          <button 
            type="submit" 
            className='flex justify-center items-center leading-7 bg-blue-200 shadow text-sm font-semibold'
          >
            Sign up
          </button>
          <div className='flex items-baseline justify-center'>
            <p>Already have an account?</p>
            <Link 
              href={'/login'} 
              className='text-sm font-semibold ml-1 leading-none'
            >
              Login
            </Link>
            <p className='ml-1 leading-none'>now!</p>
          </div>
        </div>
      </div>
    </form>
  )

}