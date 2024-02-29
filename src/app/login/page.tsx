'use client';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { RiLoginCircleLine } from 'react-icons/ri';
import MovingBackground from '../components/background/MovingBackground';

const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen  justify-center items-center bg-blue-950">
      <MovingBackground />
      <Flex
        direction="column"
        justify="center"
        align="center"
        className="w-full"
      >
        <Box className="md:h-1/2 md:w-1/2 shadow-2xl transition-all duration-700 bg-[rgba(254,254,254,0.48813462885154064)] hover:bg-[rgba(254,254,254,0.68813462885154064)] rounded-xl z-10 p-5">
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
                src={require('../../../public/assets/images/byrs.png')}
                alt="Logo"
                height={150}
                width={150}
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
        </Box>
      </Flex>
    </div>
  );
};

export default LoginPage;
