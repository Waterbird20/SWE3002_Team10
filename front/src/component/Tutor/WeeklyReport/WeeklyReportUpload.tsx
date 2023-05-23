import { PrimaryButton } from '@/component/common/Button';
import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const WeeklyReportUpload = () => {
  const toast = useToast({ position: 'bottom-right' });
  const [pending, setPending] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setUploadedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {};

  return (
    <HStack>
      <Input onChange={handleFileChange} type="file" size="sm" w="200px" border="none" p="0px" />
      <PrimaryButton isLoading={pending} onClick={handleSubmit}>
        제출
      </PrimaryButton>
    </HStack>
  );
};
