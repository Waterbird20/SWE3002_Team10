import { Button, HStack, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';

export const WeeklyReportListItem = ({ el }: any) => {
  const toast = useToast({ position: 'bottom-right' });
  const [pending, setPending] = useState(false);

  const handleFileRemove = async () => {};

  return (
    <HStack w="full" justify="space-between">
      <Text>{el.report_id}</Text>
      {el.approval === 1 ? <Text>승인됨</Text> : el.approval === 0 ? <Text>대기중</Text> : <Text>반려됨</Text>}
    </HStack>
  );
};
