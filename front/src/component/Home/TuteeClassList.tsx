import { HStack, Text, VStack } from '@chakra-ui/react';
import { TuteeClassListItem } from '../ListItem/TuteeClassListItem';
import Link from 'next/link';

const classList = ['AI', '데이터베이스', '웹 프로그래밍', '알고리즘'];

export const TuteeClassList = () => {
  return (
    <VStack w="full" spacing="30px">
      <HStack w="full" justify="space-between">
        <Text fontSize="xl" fontWeight={700}>
          튜터 모집 과목
        </Text>
        <Text as={Link} href="/class/tutee" color="#48702B" fontWeight={700} fontSize="sm">
          더보기
        </Text>
      </HStack>
      <VStack w="full" spacing="16px">
        {classList.map((className) => (
          <TuteeClassListItem className={className} />
        ))}
      </VStack>
    </VStack>
  );
};
