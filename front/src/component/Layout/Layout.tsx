import { Box, HStack, Flex, Spinner, useColorModeValue, VStack, Text, useMediaQuery } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from './Logo.png';
import { Navbar } from '../Navbar/Navbar';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      minW="100vw"
      minH="100vh"
      w="full"
      h="full"
      bg="gray.50"
      justify="center"
      fontFamily="Spoqa Han Sans Neo"
      py="40px"
    >
      <VStack w="full" h="auto" maxW="1100px" px="20px" justify="space-between" spacing="50px">
        <HStack w="full" justify="space-between">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
          <Navbar />
          <HStack spacing="20px" fontSize="sm">
            <Link href="/register">
              <Text>회원가입</Text>
            </Link>
            <Link href="/login">
              <Text>로그인</Text>
            </Link>
          </HStack>
        </HStack>

        <VStack w="full" h="full" align="center">
          {children}
        </VStack>
      </VStack>
    </Flex>
  );
};
