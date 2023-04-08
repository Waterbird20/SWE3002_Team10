import { Button, HStack, Input, InputGroup, InputLeftAddon, Text, VStack } from '@chakra-ui/react';

export default function Register() {
  return (
    <VStack maxW="500px" w="full" h="full" align="flex-start" justify="center" spacing="32px" pb="80px">
      <Text color="#76932F" fontSize="xl" fontWeight={600}>
        회원가입
      </Text>
      <VStack w="full" spacing="24px">
        <InputGroup>
          <InputLeftAddon children="학번" />
          <Input type="number" w="full" bg="white" placeholder="학번" textAlign="end" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="아이디" />
          <Input w="full" bg="white" placeholder="아이디" textAlign="end" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="비밀번호" />
          <Input type="password" w="full" bg="white" placeholder="비밀번호" textAlign="end" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="비밀번호" />
          <Input type="password" w="full" bg="white" placeholder="비밀번호 확인" textAlign="end" />
        </InputGroup>
      </VStack>
      <HStack w="full">
        <Button w="full">뒤로</Button>
        <Button w="full">확인</Button>
      </HStack>
    </VStack>
  );
}
