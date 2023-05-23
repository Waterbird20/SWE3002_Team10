import { Box, Button, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import { WeeklyReportUpload } from './WeeklyReportUpload';
import { WeeklyReportList } from './WeeklyReportList';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMyWeeklyReport } from '@/hooks';

export const WeeklyReportContainer = () => {
  const router = useRouter();
  const { course_number } = router.query;
  const { data } = useMyWeeklyReport({
    student_id: '2019315408',
    course_number,
  });

  console.log(data);

  return (
    <VStack w="full" spacing="30px" align="flex-start">
      <Button size="sm" as={Link} href="/tutor">
        {'<'}
      </Button>
      <Flex flexDir={{ base: 'column', sm: 'row' }} w="full" justify="space-between" gap="10px">
        <VStack align="flex-start" spacing="0px">
          <Text fontSize="xl" fontWeight={600}>
            내 주간 보고서
          </Text>
          <Text>{course_number}</Text>
        </VStack>
        <WeeklyReportUpload />
      </Flex>

      <Box w="full" h="1px" bg="gray.300" />

      <WeeklyReportList />
    </VStack>
  );
};
