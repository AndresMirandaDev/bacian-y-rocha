import colors from '@/app/styles/colors';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import {
  Popover,
  Button,
  Flex,
  Avatar,
  Box,
  TextArea,
  Checkbox,
  Text,
} from '@radix-ui/themes';
import React, { PropsWithChildren, ReactNode, SetStateAction } from 'react';

const ActivityPopOver = ({ children }: PropsWithChildren) => {
  return (
    <Popover.Root>
      <Popover.Trigger className="w-full">
        <Button style={{ backgroundColor: colors.buttonColors.primary }}>
          <ChatBubbleIcon width="16" height="16" />
          Descripción
        </Button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 400 }}>
        <Flex gap="3">
          <Box grow="1">
            {children}
            <Flex gap="3" mt="3" justify="between">
              <Popover.Close>
                <Button
                  size="2"
                  style={{ backgroundColor: colors.buttonColors.primary }}
                >
                  Aceptar
                </Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default ActivityPopOver;
