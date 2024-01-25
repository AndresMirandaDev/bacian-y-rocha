'use client';

import { cloudinaryBaseUrl } from '@/cloud/config';
import { DownloadIcon } from '@radix-ui/react-icons';
import { Box, Button, IconButton } from '@radix-ui/themes';
import { CldImage as CldImageDefault, CldImageProps } from 'next-cloudinary';

const CldImage = (props: CldImageProps) => {
  return (
    <>
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
    </>
  );
};

export default CldImage;
