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
      className=" p-1 rounded-lg"
      gap="3"
    >
      <CldImageDefault {...props} />
      <Box>
        <Button
          className="w-full"
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
