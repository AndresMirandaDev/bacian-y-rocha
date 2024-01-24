'use client';
import * as Form from '@radix-ui/react-form';
import { Box, Button, Card, Flex, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RiLoginCircleLine } from 'react-icons/ri';
import LoadingScreen from '../components/LoadingScreen';
import MovingBackground from '../background/page';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     const checkIfInitialLoad = !localStorage.getItem('isInitialLoad');

  //     if (checkIfInitialLoad) {
  //       // It's the initial load (refreshing the page)
  //       localStorage.setItem('isInitialLoad', 'true');
  //       setLoading(true); // Set loading to true when refreshing
  //     } else {
  //       // It's not the initial load
  //       localStorage.removeItem('isInitialLoad');
  //       setLoading(false); // Set loading to false after rendering
  //     }
  //   }, []);

  //   if (loading) return <LoadingScreen />;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });

    console.log(result);
    if (!result?.ok) {
      return toast.error('Correo o Contraseña inválido.');
    }
    router.push('/dashboard');
  };

  const errorMessageClassname = 'text-red-500 text-sm opacity-80';
  const inputClassname = 'input input-bordered w-full bg-transparent';

  return (
    <>
      <div className="flex h-screen w-screen  justify-center ">
        <MovingBackground />
        <Flex
          direction="column"
          justify="center"
          align="center"
          className="w-full p-5"
        >
          <Box className="md:h-2/3 sm:w-1/2 md:w-1/2 shadow-2xl z-10 bg-[rgba(254,254,254,0.68813462885154064)] rounded-2xl">
            <Flex
              direction="column"
              justify="center"
              align="center"
              height="100%"
              gap="8"
            >
              <Flex direction="column" gap="3">
                <Flex direction="column" gap="3">
                  <Text size="8" style={{ fontWeight: 'lighter' }}>
                    Inicia Sesión
                  </Text>
                  <Image
                    src={require('../../../public/assets/images/byrs.png')}
                    alt="Logo"
                    height={200}
                    width={200}
                  />
                </Flex>
                <Form.Root onSubmit={onSubmit}>
                  <Flex direction="column" gap="4">
                    <Form.Field className="rounded-md" name="email">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          flexDirection: 'column',
                        }}
                      >
                        <Form.Label className="text-zinc-500">Email</Form.Label>
                        <Form.Message
                          className={errorMessageClassname}
                          match="valueMissing"
                        >
                          Ingresa tu email.
                        </Form.Message>
                        <Form.Message
                          className={errorMessageClassname}
                          match="typeMismatch"
                        >
                          Email inválido.
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input
                          className={inputClassname}
                          type="email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field className="rounded-md" name="email">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          flexDirection: 'column',
                        }}
                      >
                        <Form.Label className="text-zinc-500">
                          Contraseña
                        </Form.Label>
                        <Form.Message
                          className={errorMessageClassname}
                          match="valueMissing"
                        >
                          Ingresa tu contraseña.
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input
                          className={inputClassname}
                          type="password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Control>
                    </Form.Field>
                    <Form.Submit asChild>
                      <Button size="4" className="bg-[var(--accent-9)]">
                        <Flex align="center" gap="2">
                          <RiLoginCircleLine />
                          <Text>Iniciar Sesión</Text>
                        </Flex>
                      </Button>
                    </Form.Submit>
                  </Flex>
                </Form.Root>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </div>
      <Toaster
        toastOptions={{
          style: { backgroundColor: 'tomato', color: '#f6f6f6' },
        }}
      />
    </>
  );
};

export default SignInPage;
