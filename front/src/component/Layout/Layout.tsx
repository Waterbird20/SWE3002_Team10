import {
  Box,
  HStack,
  Flex,
  Spinner,
  useColorModeValue,
  VStack,
  Text,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from './Logo.png';
import { Navbar } from '../Navbar/Navbar';
import { MobileNavbarModal } from '../Navbar/MobileNavbarModal';
import menu_burger from './menu-icon-dark.svg';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSm] = useMediaQuery('(max-width: 768px)');

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
            <Image width={isSm ? 180 : 250} src={logo} alt="logo" />
          </Link>
          {isSm ? (
            <>
              <MobileNavbarModal isOpen={isOpen} onClose={onClose} />
              <Box _hover={{ cursor: 'pointer' }} onClick={onOpen}>
                <Image width={20} src={menu_burger} alt="menu_burger" />
              </Box>
            </>
          ) : (
            <>
              <Navbar />
              <HStack spacing="20px" fontSize="sm">
                <Link href="/register">
                  <Text>회원가입</Text>
                </Link>
                <Link href="/login">
                  <Text>로그인</Text>
                </Link>
              </HStack>
            </>
          )}
        </HStack>

        <VStack w="full" h="full" align="center">
          {children}
        </VStack>
      </VStack>
    </Flex>
  );
};
