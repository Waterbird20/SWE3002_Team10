import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { WeeklyReportListItem } from './WeeklyReportListItem';
import { useRouter } from 'next/router';
import { myClassList } from '@/mock/totalClassList';
import { useMyWeeklyReport } from '@/hooks';

export const WeeklyReportList = ({ data }: any) => {
  return (
    <VStack w="full" spacing="20px" align="flex-start" fontSize="sm">
      {data.map((el: any, i: any) => (
        <WeeklyReportListItem key={i} el={el} />
      ))}
    </VStack>
  );
};
