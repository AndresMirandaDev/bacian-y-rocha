import { Box, Button, Card, Flex, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import LoadingScreen from '../components/LoadingScreen';

const LoginPage = () => {
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
  return (
    <div className="flex h-screen w-screen  justify-center items-center bg-cyan-700">
      <Flex
        direction="column"
        justify="center"
        align="center"
        className="w-full"
      >
        <Card className="md:h-1/2 md:w-1/2 shadow-2xl">
          <Flex
            direction="column"
            justify="center"
            align="center"
            height="100%"
            gap="8"
          >
            <Flex direction="column" gap="3">
              <Text size="8" style={{ fontWeight: 'lighter' }}>
                Bienvenido
              </Text>
              <Image
                src={require('../../../public/assets/images/generic-logo.png')}
                alt="Logo"
                height={400}
                width={400}
              />
            </Flex>
            <Flex justify="center" align="center">
              <Button size="4" onClick={() => signIn()}>
                <Flex align="center" gap="2">
                  <RiLoginCircleLine />
                  <Text>Iniciar Sesión</Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default LoginPage;
