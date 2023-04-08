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
            <MenuItem>튜티</MenuItem>
          </Link>
          <Link href="/class/tutor">
            <MenuItem>튜터</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton w="120px" as={Text} _hover={{ cursor: 'pointer' }}>
          튜터
        </MenuButton>
        <MenuList fontSize="xs" minW="120px">
          <Link href="/tutor/weekly_report">
            <MenuItem>주간 보고서</MenuItem>
          </Link>
          <Link href="/tutor/file_submission">
            <MenuItem>서류 제출</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </HStack>
  );
};
