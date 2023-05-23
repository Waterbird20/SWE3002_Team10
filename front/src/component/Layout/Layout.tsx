import {
  Box,
  HStack,
  Flex,
  VStack,
  Text,
  useMediaQuery,
  useDisclosure,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../Navbar/Navbar';
import { MobileNavbarModal } from '../Navbar/MobileNavbarModal';
import menu_burger from './menu-icon-dark.svg';
import { Logo } from '../common/Logo';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSm] = useMediaQuery('(max-width: 768px)');
  const { data, status } = useSession();
  const router = useRouter();
  console.log(data);

  useEffect(() => {
    //@ts-ignore
    if (status === 'authenticated' && !data?.registered && router.pathname !== '/register') router.push('/register');
    if (status === 'unauthenticated' && router.pathname === '/register') router.push('/');
    //@ts-ignore
    if (status === 'authenticated' && data?.registered && router.pathname === '/register') router.push('/');
  }, [router, status]);

  if (status === 'loading')
    return (
      <Flex
        minW="100vw"
        minH="100vh"
        w="full"
        h="full"
        bg="gray.50"
        justify="center"
        align="center"
        fontFamily="Spoqa Han Sans Neo"
        py="40px"
      >
        <Spinner />
      </Flex>
    );

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
      <VStack w="full" h="auto" maxW="1100px" px="20px" justify="space-between" spacing="60px">
        <HStack w="full" justify="space-between">
          <Link href="/">
            <Logo />
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
                {status === 'unauthenticated' ? (
                  <Text _hover={{ cursor: 'pointer' }} onClick={() => signIn()}>
                    로그인
                  </Text>
                ) : (
                  <>
                    <Text _hover={{ cursor: 'pointer' }} onClick={() => signOut()}>
                      로그아웃
                    </Text>
                    {
                      //@ts-ignore
                      data?.role === 'admin' && (
                        <Menu>
                          <MenuButton as={Text} _hover={{ cursor: 'pointer' }}>
                            관리자
                          </MenuButton>
                          <MenuList fontSize="xs" minW="120px">
                            <Link href="/admin/tutor_confirm">
                              <MenuItem fontSize="sm" fontWeight={500}>
                                튜터링 승인
                              </MenuItem>
                            </Link>
                            <Link href="/admin/tutor_report">
                              <MenuItem fontSize="sm" fontWeight={500}>
                                튜터링 중간보고서
                              </MenuItem>
                            </Link>
                            <Link href="/admin/tutor_completion">
                              <MenuItem fontSize="sm" fontWeight={500}>
                                튜터링 최종 승인
                              </MenuItem>
                            </Link>
                          </MenuList>
                        </Menu>
                      )
                    }
                  </>
                )}
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
