import { TutorConfirmListItem } from '@/component/Admin/TutorConfirmListItem';
import { TutorReportListItem } from '@/component/Admin/TutorReportListItem';
import { TutorClassListItem } from '@/component/Class/ClassListItem/TutorClassListItem';
import { useReportList } from '@/hooks';
import { totalClassList } from '@/mock/totalClassList';
import { Grid, HStack, Input, Text, VStack } from '@chakra-ui/react';

const TutorReport = () => {
  const { data: report } = useReportList();

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
