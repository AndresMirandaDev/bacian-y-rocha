'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { authOptions } from './api/auth/[...nextauth]/route';
import LoginPage from './login/page';
import { redirect } from 'next/navigation';
import { Container } from '@radix-ui/themes';
import LoadingScreen from './components/LoadingScreen';

const Home = () => {
  const session = useSession();

  if (session.status === 'authenticated') return redirect('/dashboard');
  if (session.status === 'loading') return <LoadingScreen />;

  return <LoginPage />;
};

export default Home;
