import { HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { TuteeClassListItem } from '../Class/TuteeClassListItem';
import Link from 'next/link';
import { totalClassList } from '@/mock/totalClassList';
import { useApprovedTutoringList } from '@/hooks';

export const HomeTuteeClassContainer = () => {
  const { data: approvedList } = useApprovedTutoringList();

  if (!approvedList) return <Spinner />;

  return (
    <VStack w="full" spacing="30px">
      <HStack w="full" justify="space-between">
        <Text fontSize="xl" fontWeight={700}>
          모집 과목 - 튜티 (Tutee)
        </Text>
        <Text as={Link} href="/class/tutee" color="#48702B" fontWeight={700} fontSize="sm">
          더보기
        </Text>
      </HStack>
      <VStack w="full" spacing="16px">
        {approvedList.slice(0, 5).map((el: any, i: any) => (
          <TuteeClassListItem el={el} key={i} />
        ))}
      </VStack>
    </VStack>
  );
};
