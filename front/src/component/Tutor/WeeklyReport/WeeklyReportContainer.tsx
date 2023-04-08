import { Flex, Text, VStack } from '@chakra-ui/react';
import { WeeklyReportUpload } from './WeeklyReportUpload';
import { WeeklyReportList } from './WeeklyReportList';
import { useRouter } from 'next/router';

export const WeeklyReportContainer = () => {
  const router = useRouter();
  const { className } = router.query;

  return (
    <>
      <Flex flexDir={{ base: 'column', sm: 'row' }} w="full" justify="space-between" gap="10px">
        <VStack align="flex-start" spacing="0px">
          <Text fontSize="xl" fontWeight={600}>
            내 주간 보고서
          </Text>
          <Text>{className}</Text>
        </VStack>
        <WeeklyReportUpload />
      </Flex>
      <WeeklyReportList />
    </>
  );
};
