'use client';
import FileUploader from '@/app/components/cloud/FileUploader';
import colors from '@/app/styles/colors';
import { Button, Dialog, Flex, Grid, ScrollArea } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { MdPhotoLibrary } from 'react-icons/md';
import CloudImage from '@/app/components/cloud/CloudImage';
import { TrashIcon } from '@radix-ui/react-icons';

interface Props {
  photos: string[];
  title: string;
  description: string;
  updateFiles?: CallableFunction;
  updatable?: boolean;
}

const GalleryModal = ({
  photos,
  title,
  description,
  updateFiles,
  updatable,
}: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          className="w-full cursor-pointer"
          style={{ backgroundColor: colors.grey }}
        >
          <MdPhotoLibrary />
          {title}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>

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
            gap="3"
          >
            {photos.map((photo) => {
              if (photo !== '') {
                return (
                  <Flex
                    direction="column"
                    className="border border-slate-300 rounded-md p-1"
                    key={photo}
                    justify="between"
                  >
                    <CloudImage
                      alt="image"
                      src={photo}
                      width={200}
                      height={200}
                    />

                    {updatable && updateFiles && (
                      <Button
                        className=" rounded-md"
                        style={{ backgroundColor: colors.buttonColors.danger }}
                        onClick={() => {
                          updateFiles(photo);
                        }}
                      >
                        <TrashIcon />
                        Eliminar
                      </Button>
                    )}
                  </Flex>
                );
              }
            })}
          </Grid>
        </ScrollArea>
        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button
              className="cursor-pointer mt-5"
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
