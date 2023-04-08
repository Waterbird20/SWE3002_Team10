import { WeeklyReportContainer } from '@/component/WeeklyReport/WeeklyReportContainer';
import { VStack } from '@chakra-ui/react';

export default function WeeklyReport() {
  return (
    <VStack w="full" maxW="700px" h="auto" spacing="50px">
      <WeeklyReportContainer />
    </VStack>
  );
}
