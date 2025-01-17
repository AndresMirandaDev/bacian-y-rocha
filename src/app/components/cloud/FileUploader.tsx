'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { UploadIcon } from '@radix-ui/react-icons';

interface CloudinaryResult {
  public_id: string;
}

interface Props {
  publicId: string;
  setPublicId: Dispatch<SetStateAction<string>>;
  multiple: boolean;
}

const FileUploader = ({ publicId, setPublicId, multiple }: Props) => {
  return (
    <>
      {publicId && publicId !== 'pending' && (
        <CldImage src={publicId} width={270} height={180} alt="image" />
      )}
      <CldUploadWidget
        options={{
          sources: ['local'],
          multiple: multiple,
          clientAllowedFormats: ['pdf'],
        }}
        uploadPreset="egv7ezb1"
        onUpload={(result, widget) => {
          if (result.event !== 'success') return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button
            className="btn mt-3 bg-[var(--accent-9)] text-white hover:bg-gray-600"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              open();
            }}
            type="button"
          >
            <UploadIcon />
            Adjuntar Archivo
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default FileUploader;
