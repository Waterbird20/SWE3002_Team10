import { myClassList } from '@/mock/totalClassList';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export const TutorHomeContainer = () => {
  return (
    <>
      <Text fontSize="2xl" fontWeight={600} w="full">
        내 튜터 과목
      </Text>
      <VStack w="full" spacing="20px">
        {myClassList.map((el) => {
          return (
            <HStack w="full" justify="space-between">
              <Text fontWeight={500}>{el.className}</Text>
              <HStack>
                <Button as={Link} href={`/tutor/${el.className}/weekly_report`} size="sm">
                  주간보고서
                </Button>
                <Button as={Link} size="sm" href={`/tutor/${el.className}/file_submission`}>
                  서류 제출
                </Button>
              </HStack>
            </HStack>
          );
        })}
      </VStack>
    </>
  );
};
