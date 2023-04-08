import { handleFileSubmitFactory } from '@/component/common/utils';
import { Button, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const AccountCopy = () => {
  const toast = useToast({ position: 'bottom-right' });
  const [pending, setPending] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setUploadedFile(event.target.files[0]);
  };
  const handleFileSubmit = handleFileSubmitFactory('account_copy', uploadedFile, setPending, toast);

  return (
    <VStack w="full" align="flex-start">
      <Text fontWeight={600}>통장 사본</Text>
      <HStack w="full" justify="flex-end">
        <Input onChange={handleFileChange} w="full" type="file" size="sm" border="none" p="0px" />
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
    </VStack>
  );
};
