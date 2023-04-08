import { HStack, Text, VStack } from '@chakra-ui/react';
import { TuteeClassListItem } from '../Class/ClassListItem/TuteeClassListItem';
import Link from 'next/link';
import { totalClassList } from '@/mock/totalClassList';

export const HomeTuteeClassContainer = () => {
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
        {totalClassList.slice(0, 5).map((className) => (
          <TuteeClassListItem className={className} />
        ))}
      </VStack>
    </VStack>
  );
};
