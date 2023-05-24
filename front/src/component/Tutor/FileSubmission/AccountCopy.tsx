import { ImageUrlText } from '@/component/common/ImageUrlText';
import { Button, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const AccountCopy = ({ tongjang_url, files, setFiles, tutoring_id }: any) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setFiles({ ...files, tongjang_url: event.target.files[0] });
  };

  return (
    <HStack w="full" justify="space-between">
      <Text fontWeight={600}>통장 사본</Text>
      <VStack align="flex-start" spacing="0px">
        <Input onChange={handleFileChange} w="full" type="file" size="sm" border="none" p="0px" />
        {tongjang_url && <ImageUrlText url={tongjang_url} tutoring_id={tutoring_id} />}
      </VStack>
    </HStack>
  );
};
