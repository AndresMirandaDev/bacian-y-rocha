import { User } from '@prisma/client';
import React from 'react';

interface Props {
  user: User;
}

const UserDetails = ({ user }: Props) => {
  return <div>{user.name}</div>;
};

export default UserDetails;
