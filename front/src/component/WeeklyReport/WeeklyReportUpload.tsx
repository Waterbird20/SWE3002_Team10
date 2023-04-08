import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import { submitFile } from './utils';
import { ChangeEvent, useState } from 'react';

export const WeeklyReportUpload = () => {
  const toast = useToast({ position: 'bottom-right' });
  const [pending, setPending] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSubmit = async () => {
    setPending(true);
    if (uploadedFile) {
      try {
        await submitFile(uploadedFile);
        toast({
          title: '파일이 업로드되었습니다.',
          status: 'success',
        });
      } catch (e: any) {
        toast({
          title: '파일 업로드에 실패했습니다.',
          status: 'error',
        });
      }
    } else {
      toast({
        title: '파일을 선택해주세요.',
        status: 'error',
      });
    }
    setPending(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setUploadedFile(event.target.files[0]);
  };

  return (
    <HStack>
      <Input onChange={handleFileChange} type="file" size="sm" w="200px" border="none" p="0px" />
      <Button
        py="5px"
        h="fit-content"
        px="15px"
        bg="#48702B"
        borderRadius="5px"
        color="white"
        fontSize="sm"
        fontWeight={600}
        _hover={{ cursor: 'pointer' }}
        isLoading={pending}
        onClick={handleFileSubmit}
      >
        제출
      </Button>
    </HStack>
  );
};
