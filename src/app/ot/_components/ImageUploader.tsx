'use client';
import colors from '@/app/styles/colors';
import { UploadIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { CldUploadWidget } from 'next-cloudinary';
import { Dispatch, SetStateAction } from 'react';

interface CloudinaryResult {
  public_id: string;
}

interface Props {
  setPublicId: CallableFunction;
  multiple: boolean;
}

const ImageUploader = ({ setPublicId, multiple }: Props) => {
  return (
    <>
      <CldUploadWidget
        options={{
          sources: ['local'],
          multiple: multiple,
          clientAllowedFormats: ['jpgeg', 'jpg', 'png'],
        }}
        uploadPreset="lvoo9bpb"
        onUpload={(result, widget) => {
          if (result.event !== 'success') return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <Button onClick={(e) => open()} className="w-full">
            <UploadIcon />
            Subir Imagen
          </Button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default ImageUploader;
