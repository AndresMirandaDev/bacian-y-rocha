'use client';

import { cloudinaryBaseUrl } from '@/cloud/config';
import { DownloadIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, IconButton } from '@radix-ui/themes';
import { CldImage as CldImageDefault, CldImageProps } from 'next-cloudinary';

const CldImage = (props: CldImageProps) => {
  return (
    <Flex
      direction="column"
      justify="between"
      className="border border-slate-300 p-1 rounded-lg"
    >
      <CldImageDefault {...props} />
      <Box>
        <Button
          onClick={() =>
            window.open(
              `${cloudinaryBaseUrl}/image/upload/${props.src}`,
              '_blank'
            )
          }
        >
          <DownloadIcon />
          Descargar
        </Button>
      </Box>
    </Flex>
  );
};

export default CldImage;
