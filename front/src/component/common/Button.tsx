import { Button, ButtonProps, Text, TextProps } from '@chakra-ui/react';

export const PrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      fontSize="xs"
      size="xs"
      py="4px"
      px="15px"
      bg="#48702B"
      color="white"
      borderRadius="5px"
      fontWeight={700}
      {...props}
    >
      {children}
    </Button>
  );
};
