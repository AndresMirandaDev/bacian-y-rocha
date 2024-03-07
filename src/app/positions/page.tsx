import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Flex, Grid } from '@radix-ui/themes';
import PositionList from './_components/PositionList';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

const getPositions = async () => {
  const res = await fetch(
    `https://bacian-y-rocha-next.vercel.app/api/positions`,
    {
      cache: 'no-store',
    }
  );

  const quotes = await res.json();

  return quotes.body;
};

const PositionsPage = async () => {
  const positions = await getPositions();
  return (
    <>
      <Grid className="p-3" gap="4">
        <Flex>
          <Button>
            <PlusIcon />
            <Link href={'/positions/new'}>Agregar posición</Link>
          </Button>
        </Flex>
        <PositionList positions={positions} />
      </Grid>
      <Toaster />
    </>
  );
};

export default PositionsPage;
