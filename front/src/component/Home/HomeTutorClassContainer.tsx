import { HStack, Text, VStack } from '@chakra-ui/react';
import { TutorClassListItem } from '../Class/ClassListItem/TutorClassListItem';
import Link from 'next/link';
import { totalClassList } from '@/mock/totalClassList';

export const HomeTutorClassContainer = () => {
  return (
    <VStack w="full" spacing="30px">
      <HStack w="full" justify="space-between">
        <Text fontSize="xl" fontWeight={700}>
          모집 과목 - 튜터 (Tutor)
        </Text>
        <Text as={Link} href="/class/tutor" color="#48702B" fontWeight={700} fontSize="sm">
          더보기
        </Text>
      </HStack>
      <VStack w="full" spacing="16px">
        {totalClassList.slice(0, 5).map((className) => (
          <TutorClassListItem className={className} />
        ))}
      </VStack>
    </VStack>
  );
};
