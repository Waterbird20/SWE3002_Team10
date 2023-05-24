import { Button, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { get_files } from '../../../../api';
import { ImageUrlText } from '@/component/common/ImageUrlText';

export const IdentityCard = ({ credential_url, files, setFiles, tutoring_id }: any) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setFiles({ ...files, credential_url: event.target.files[0] });
  };

  return (
    <HStack w="full" justify="space-between">
      <Text fontWeight={600}>신분증 사본</Text>
      <VStack align="flex-start" spacing="0px">
        <Input
          justifySelf="flex-end"
          onChange={handleFileChange}
          w="full"
          type="file"
          size="sm"
          border="none"
          p="0px"
        />
        {credential_url && <ImageUrlText url={credential_url} tutoring_id={tutoring_id} />}
      </VStack>
    </HStack>
  );
};
