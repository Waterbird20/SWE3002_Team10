import { WeeklyReportContainer } from '@/component/Tutor/WeeklyReport/WeeklyReportContainer';
import { Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function WeeklyReport() {
  return (
    <VStack w="full" maxW="700px" h="auto" spacing="10px" align="flex-start">
      <Button size="xs" as={Link} href="/tutor">
        {'<'}
      </Button>
      <WeeklyReportContainer />
    </VStack>
  );
}
