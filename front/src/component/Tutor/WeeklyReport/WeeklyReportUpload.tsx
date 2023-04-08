import { handleFileSubmitFactory, uploadFile } from '@/component/common/utils';
import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const WeeklyReportUpload = () => {
  const toast = useToast({ position: 'bottom-right' });
  const [pending, setPending] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
        onClick={handleFileSubmitFactory('weekly_report', uploadedFile, setPending, toast)}
      >
        제출
      </Button>
    </HStack>
  );
};
