import { Button, HStack, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { removeFile } from './utils';

export const WeeklyReportListItem = ({ file }: { file: string }) => {
  const toast = useToast({ position: 'bottom-right' });
  const [pending, setPending] = useState(false);

  const handleFileRemove = async (fileName: string) => {
    setPending(true);
    try {
      await removeFile(fileName);
      toast({
        title: '파일이 삭제되었습니다.',
        status: 'success',
      });
    } catch {
      toast({
        title: '파일 삭제에 실패했습니다.',
        status: 'error',
      });
    }
    setPending(false);
  };

  return (
    <HStack w="full" justify="space-between">
      <Text>{file}</Text>
      <Button bg="red.600" color="white" size="xs" onClick={() => handleFileRemove(file)} isLoading={pending}>
        삭제
      </Button>
    </HStack>
  );
};
