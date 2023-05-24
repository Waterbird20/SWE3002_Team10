import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

export const Navbar = () => {
  const { status } = useSession();

  return (
    <HStack spacing="10px" fontWeight={500}>
      <Link href="/class/tutee">
        <Text w="120px" as={Text} _hover={{ cursor: 'pointer' }}>
          모집과목
        </Text>
      </Link>
      {status === 'authenticated' ? (
        <Link href="/tutor">
          <Text w="120px" as={Text} _hover={{ cursor: 'pointer' }}>
            튜터
          </Text>
        </Link>
      ) : (
        <Text w="120px" as={Text} _hover={{ cursor: 'pointer' }} onClick={() => signIn()}>
          튜터
        </Text>
      )}
    </HStack>
  );
};
