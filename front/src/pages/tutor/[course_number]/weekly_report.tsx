import { WeeklyReportContainer } from '@/component/Tutor/WeeklyReport/WeeklyReportContainer';
import { Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function WeeklyReport() {
  return (
    <VStack w="full" maxW="700px" h="auto" align="flex-start">
      <WeeklyReportContainer />
    </VStack>
  );
}
