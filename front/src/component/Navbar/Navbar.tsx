import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <HStack spacing="10px" fontWeight={500}>
      <Link href="/class/tutee">
        <Text w="120px" as={Text} _hover={{ cursor: 'pointer' }}>
          모집과목
        </Text>
      </Link>
      <Link href="/tutor">
        <Text w="120px" as={Text} _hover={{ cursor: 'pointer' }}>
          튜터
        </Text>
      </Link>
    </HStack>
  );
};
