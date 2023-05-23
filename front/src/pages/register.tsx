import { Button, HStack, Input, InputGroup, InputLeftAddon, Text, VStack, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { account_register } from '../../api';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Register() {
  const router = useRouter();
  const { data, update } = useSession();
  const toast = useToast();
  const [inputs, setInputs] = useState({
    student_id: '',
    name: '',
  });

  const handleRegister = async () => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ ...inputs, email: data?.user?.email }),
      });

      if (res.status !== 200) throw new Error('등록에 실패했습니다.');

      toast({
        title: '등록되었습니다.',
        status: 'success',
      });

      await update();
      router.push('/');
    } catch (e: any) {
      toast({
        title: '등록에 실패했습니다.',
        status: 'error',
      });
    }
  };

  return (
    <VStack maxW="400px" w="full" h="full" align="flex-start" justify="center" spacing="32px" pb="80px">
      <Text color="#76932F" fontSize="xl" fontWeight={600}>
        회원가입
      </Text>
      <VStack w="full" spacing="24px">
        <InputGroup>
          <InputLeftAddon children="학번" />
          <Input
            type="number"
            w="full"
            bg="white"
            textAlign="end"
            value={inputs.student_id}
            onChange={(e) => setInputs({ ...inputs, student_id: e.target.value })}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="이름" />
          <Input
            w="full"
            bg="white"
            textAlign="end"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
        </InputGroup>
      </VStack>
      <HStack w="full" color="white">
        <Button w="full" bg="#48702B" onClick={handleRegister}>
          확인
        </Button>
      </HStack>
    </VStack>
  );
}
