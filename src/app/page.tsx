'use client';
import { useSession } from 'next-auth/react';

import LoginPage from './login/page';
import { redirect } from 'next/navigation';

import LoadingScreen from './components/LoadingScreen';
import { getServerSession } from 'next-auth';
import { useState } from 'react';

const Home = async () => {
  const session = useSession();

  if (session.status === 'loading') return <LoadingScreen />;
  if (session.status === 'authenticated') return redirect('/dashboard');

  return <LoginPage />;
};

export default Home;
