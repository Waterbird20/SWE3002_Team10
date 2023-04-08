import { Logo } from '@/component/common/Logo';
import { LockIcon } from '@chakra-ui/icons';
import { Button, GenericAvatarIcon, HStack, Input, InputGroup, InputLeftAddon, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

export default function Login() {
  return (
    <VStack maxW="400px" w="full" h="full" align="center" justify="center" spacing="32px" pb="80px">
      <Logo />
      <VStack w="full" spacing="12px">
        <InputGroup>
          <InputLeftAddon
            h="50px"
            w="50px"
            justifyContent="center"
            p={0}
            children={<GenericAvatarIcon boxSize="25px" color="black" />}
          />
          <Input h="50px" w="full" bg="white" placeholder="아이디" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            h="50px"
            w="50px"
            justifyContent="center"
            p={0}
            children={<LockIcon boxSize="20px" color="black" />}
          />
          <Input h="50px" type="password" w="full" bg="white" placeholder="비밀번호" />
        </InputGroup>
      </VStack>
      <Button h="50px" size="md" w="full" bg="#48702B" color="white">
        로그인
      </Button>
    </VStack>
  );
}
