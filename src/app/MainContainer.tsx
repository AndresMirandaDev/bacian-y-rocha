'use client';
import { Box, Container } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const MainContainer = ({ children }: PropsWithChildren) => {
  const { data, status } = useSession();
  const currentPath = usePathname();

  if (currentPath.includes('gantt')) {
    return <Box className="ml-16 bg-slate-200 ">{children}</Box>;
  }

  return (
    <Container
      className={classNames({
        'ml-16': status === 'authenticated',
        'bg-slate-200 ': true,
      })}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
