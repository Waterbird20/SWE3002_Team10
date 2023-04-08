import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IdentityCard } from './IdentityCard';
import { AccountCopy } from './AccountCopy';
import { PaymentCertificate } from './PaymentCertificate';
import { Receipt } from './Receipt';
import { ActivityReport } from './ActivityReport';

export const FileSubmissionContainer = () => {
  const router = useRouter();
  const { className } = router.query;

  return (
    <VStack w="full" spacing="30px" align="flex-start">
      <Button size="sm" as={Link} href="/tutor">
        {'<'}
      </Button>
      <VStack w="full" align="flex-start" spacing={0}>
        <Text fontSize="xl" fontWeight={600}>
          튜터 서류 제출
        </Text>
        <Text>{className}</Text>
      </VStack>

      <Box w="full" h="1px" bg="gray.300" />

      <VStack w="full" spacing="20px">
        <IdentityCard />
        <AccountCopy />
        <PaymentCertificate />
        <Receipt />
        <ActivityReport />
      </VStack>
    </VStack>
  );
};
