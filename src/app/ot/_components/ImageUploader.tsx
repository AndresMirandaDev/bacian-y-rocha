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
  allowedFormats: string[];
  title?: string;
}

const ImageUploader = ({
  setPublicId,
  multiple,
  allowedFormats,
  title = 'Subir imagen',
}: Props) => {
  return (
    <>
      <CldUploadWidget
        options={{
          sources: ['local'],
          multiple: multiple,
          clientAllowedFormats: [...allowedFormats],
        }}
        uploadPreset="lvoo9bpb"
        onUpload={(result, widget) => {
          if (result.event !== 'success') return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              open();
            }}
            className="w-full"
          >
            <UploadIcon />
            {title}
          </Button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default ImageUploader;
