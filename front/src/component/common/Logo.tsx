import { HStack, Text, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import logo from './Logo.png';

export const Logo = () => {
  const [isSm] = useMediaQuery('(max-width: 768px)');

  return (
    <HStack spacing="4px">
      <Image width={isSm ? 120 : 180} src={logo} alt="logo" />
      <Text color="#5A5B6C" fontSize={{ base: 'sm', md: 'xl' }} fontWeight={600}>
        성균튜터링
      </Text>
    </HStack>
  );
};
