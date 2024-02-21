import { Card, Flex, Grid } from '@radix-ui/themes';
import RegisterActions from './RegisterActions';
import UserTable from './UserTable';
import { Toaster } from 'react-hot-toast';

const getUsers = async () => {
  const res = await fetch(`https://bacian-y-rocha-next.vercel.app/api/users`, {
    cache: 'no-store',
  });

  const users = await res.json();

  return users.body;
};

const RegisterPage = async () => {
  const users = await getUsers();

  return (
    <>
      <Grid
        columns={{ initial: '1', xs: '1', sm: '1', md: '1', lg: '1', xl: '1' }}
        className="p-3"
        gap="4"
      >
        <Flex>
          <RegisterActions />
        </Flex>

        <Card>
          <UserTable users={users} />
        </Card>
      </Grid>
      <Toaster />
    </>
  );
};

export default RegisterPage;
