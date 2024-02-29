'use client';
import FileUploader from '@/app/components/cloud/FileUploader';
import colors from '@/app/styles/colors';
import { Button, Dialog, Flex, Grid, ScrollArea } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { MdPhotoLibrary } from 'react-icons/md';
import CloudImage from '@/app/components/cloud/CloudImage';

interface Props {
  photos: string[];
}

const GalleryModal = ({ photos }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          className="w-full cursor-pointer"
          style={{ backgroundColor: colors.grey }}
        >
          <MdPhotoLibrary />
          Galería de fotos
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Galería de fotos</Dialog.Title>
        <Dialog.Description>Registro de fotos de actividad</Dialog.Description>

        <ScrollArea>
          <Grid
            columns={{
              initial: '1',
              xs: '1',
              sm: '1',
              md: '1',
              lg: '3',
              xl: '3',
            }}
            gap="4"
          >
            {photos.map((photo) => {
              if (photo !== '') {
                return (
                  <CloudImage
                    key={photo}
                    alt="image"
                    src={photo}
                    width={200}
                    height={200}
                  />
                );
              }
            })}
          </Grid>
        </ScrollArea>
        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button
              className="cursor-pointer"
              style={{ backgroundColor: colors.tableHead }}
            >
              Cerrar
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default GalleryModal;
