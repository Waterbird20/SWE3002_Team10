import { Button, HStack, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';

export const WeeklyReportListItem = ({ file }: { file: string }) => {
  const toast = useToast({ position: 'bottom-right' });
  const [pending, setPending] = useState(false);

  const handleFileRemove = async () => {};

  return (
    <HStack w="full" justify="space-between">
      <Text>{file}</Text>
      <Button bg="red.600" color="white" size="xs" onClick={handleFileRemove} isLoading={pending}>
        삭제
      </Button>
    </HStack>
  );
};
