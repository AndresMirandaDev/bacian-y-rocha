'use client';
import { Container } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

const MainContainer = ({ children }: PropsWithChildren) => {
  const { data, status } = useSession();

  return (
    <Container
      className={classNames({
        'ml-16': status === 'authenticated',
        'bg-slate-200': true,
      })}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
