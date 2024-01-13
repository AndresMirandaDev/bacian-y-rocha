'use client';
import { useSession } from 'next-auth/react';

import LoginPage from './login/page';
import { redirect } from 'next/navigation';

import LoadingScreen from './components/LoadingScreen';

const Home = () => {
  const session = useSession();

  if (session.status === 'authenticated') return redirect('/dashboard');
  if (session.status === 'loading') return <LoadingScreen />;

  return <LoginPage />;
};

export default Home;
