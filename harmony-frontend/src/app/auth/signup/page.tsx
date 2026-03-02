'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(username, displayName || username, password);
      const raw = searchParams.get('returnUrl') ?? '';
      const returnUrl =
        raw.startsWith('/') && !raw.startsWith('//')
          ? raw.replace(/^\/c\//, '/channels/')
          : null;
      router.push(returnUrl ?? '/channels/harmony-hq/general');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-marathon-bg-primary'>
      <div className='w-full max-w-md rounded-lg bg-marathon-bg-secondary p-8 shadow-lg'>
        <h1 className='mb-2 text-center text-2xl font-bold text-white'>Create an account</h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='username'
              className='mb-2 block text-xs font-bold uppercase text-marathon-text-muted'
            >
              Username <span className='text-red-400'>*</span>
            </label>
            <input
              id='username'
              type='text'
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className='w-full rounded bg-marathon-bg-tertiary p-2.5 text-white placeholder-marathon-text-muted outline-none focus:ring-2 focus:ring-marathon-accent'
              placeholder='Choose a username'
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor='displayName'
              className='mb-2 block text-xs font-bold uppercase text-marathon-text-muted'
            >
              Display Name
            </label>
            <input
              id='displayName'
              type='text'
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className='w-full rounded bg-marathon-bg-tertiary p-2.5 text-white placeholder-marathon-text-muted outline-none focus:ring-2 focus:ring-marathon-accent'
              placeholder='How others see you'
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='mb-2 block text-xs font-bold uppercase text-marathon-text-muted'
            >
              Password <span className='text-red-400'>*</span>
            </label>
            <input
              id='password'
              type='password'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full rounded bg-marathon-bg-tertiary p-2.5 text-white placeholder-marathon-text-muted outline-none focus:ring-2 focus:ring-marathon-accent'
              placeholder='Create a password'
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className='text-sm text-red-400' role='alert'>
              {error}
            </p>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded bg-marathon-accent py-2.5 font-medium text-black transition-colors hover:bg-marathon-accent/80 disabled:opacity-50'
          >
            {isSubmitting ? 'Creating account...' : 'Continue'}
          </button>

          <p className='text-sm text-marathon-text-muted'>
            Already have an account?{' '}
            <Link href='/auth/login' className='text-marathon-accent hover:underline'>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
