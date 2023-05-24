import { ImageUrlText } from '@/component/common/ImageUrlText';
import { Button, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const Receipt = ({ receipt_url, files, setFiles, tutoring_id }: any) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setFiles({ ...files, receipt_url: event.target.files[0] });
  };

  return (
    <HStack w="full" justify="space-between">
      <Text fontWeight={600}>영수증 첨부지</Text>
      <VStack align="flex-start" spacing="0px">
        <Input onChange={handleFileChange} w="full" type="file" size="sm" border="none" p="0px" />
        {receipt_url && <ImageUrlText url={receipt_url} tutoring_id={tutoring_id} />}
      </VStack>
    </HStack>
  );
};
