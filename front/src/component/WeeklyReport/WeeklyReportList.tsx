import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { WeeklyReportListItem } from './WeeklyReportListItem';

export const WeeklyReportList = () => {
  const { className, files } = {
    className: '분자생물학',
    files: [
      '분자생물학 2회차 2023.3.31 (금) 1시간 30분.pdf',
      '분자생물학 2회차 2023.3.31 (금) 1시간 30분.pdf',
      '분자생물학 2회차 2023.3.31 (금) 1시간 30분.pdf',
    ],
  };

  return (
    <VStack w="full" spacing="20px" align="flex-start">
      {files.map((file, i) => (
        <WeeklyReportListItem key={i} file={file} />
      ))}
    </VStack>
  );
};
