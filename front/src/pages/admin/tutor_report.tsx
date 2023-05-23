import { TutorReportListItem } from '@/component/Admin/TutorReportListItem';
import { useReportList } from '@/hooks';
import { Grid, HStack, Input, Spinner, Text, VStack } from '@chakra-ui/react';

const TutorReport = () => {
  const { data: report } = useReportList();

  if (!report) return <Spinner />;

  return (
    <VStack w="full" maxW="700px" spacing="50px">
      <HStack w="full" justify="space-between">
        <Text fontSize="xl" fontWeight={600}>
          튜터링 주간 보고서 확인
        </Text>
      </HStack>
      <VStack w="full">
        {report.map((el: any) => (
          <TutorReportListItem el={el} />
        ))}
      </VStack>
    </VStack>
  );
};

export default TutorReport;
