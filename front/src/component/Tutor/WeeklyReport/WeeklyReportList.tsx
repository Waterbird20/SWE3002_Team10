import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { WeeklyReportListItem } from './WeeklyReportListItem';
import { useRouter } from 'next/router';
import { myClassList } from '@/mock/totalClassList';

export const WeeklyReportList = () => {
  const router = useRouter();
  const { className } = router.query;
  const curClass = myClassList.find((el) => el.className === className);

  if (!curClass) return null;

  return (
    <VStack w="full" spacing="20px" align="flex-start" fontSize="sm">
      {curClass.files.map((file, i) => (
        <WeeklyReportListItem key={i} file={file} />
      ))}
    </VStack>
  );
};
