import { ImageUrlText } from '@/component/common/ImageUrlText';
import { Button, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const PaymentCertificate = ({ ingunbee_url, files, setFiles, tutoring_id }: any) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setFiles({ ...files, ingunbee_url: event.target.files[0] });
  };

  return (
    <HStack w="full" justify="space-between">
      <Text fontWeight={600}>인건비 지급 내역서</Text>
      <VStack align="flex-start" spacing="0px">
        <Input onChange={handleFileChange} w="full" type="file" size="sm" border="none" p="0px" />
        {ingunbee_url && <ImageUrlText url={ingunbee_url} tutoring_id={tutoring_id} />}
      </VStack>
    </HStack>
  );
};
