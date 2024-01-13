'use client';
import {
  Box,
  Container,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
} from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

import Skeleton from './components/Skeleton';
import Link from 'next/link';
import classNames from 'classnames';

const UserAvatar = () => {
  const { data, status } = useSession();

  if (status === 'unauthenticated') return null;

  return (
    <nav
      className={classNames({
        'w-screen shadow-sm bg-[var(--accent-9)]': true,
        hidden: status === 'loading',
      })}
    >
      <Flex justify="end" mr="5">
        <Box className="text-slate-500 text-2xl flex justify-center items-center h-12 w-12 ">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Box className="cursor-pointer text-slate-100 text-4xl">
                {status === 'authenticated' && <FaUserCircle />}
                {status === 'loading' && <Skeleton />}
              </Box>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="p-2">
              <DropdownMenu.Label>
                <Text className="text-center capitalize" size="2">
                  {data?.user?.name}
                </Text>
              </DropdownMenu.Label>
              <DropdownMenu.Label>
                <Text className="text-center" size="2">
                  {data?.user?.email}
                </Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item className="bg-slate-300">
                <Link href="/api/auth/signout">Cerrar Sesión</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
      </Flex>
    </nav>
  );
};

export default UserAvatar;
