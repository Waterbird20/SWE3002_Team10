import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <HStack spacing="10px" fontWeight={500}>
      <Menu>
        <MenuButton w="120px" as={Text} _hover={{ cursor: 'pointer' }}>
          모집과목
        </MenuButton>
        <MenuList fontSize="xs" minW="120px">
          <Link href="/class/tutee">
            <MenuItem fontSize="sm" fontWeight={500}>
              튜티 - Tutee
            </MenuItem>
          </Link>
          <Link href="/class/tutor">
            <MenuItem fontSize="sm" fontWeight={500}>
              튜터 - Tutor
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <Link href="/tutor">
        <Text w="120px" as={Text} _hover={{ cursor: 'pointer' }}>
          튜터
        </Text>
      </Link>
    </HStack>
  );
};
