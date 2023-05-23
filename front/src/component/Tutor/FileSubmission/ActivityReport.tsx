import { Button, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const ActivityReport = ({ report_url, files, setFiles }: any) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) setFiles({ ...files, report_url: event.target.files[0] });
  };

  return (
    <HStack w="full" justify="space-between">
      <Text fontWeight={600}>활동보고서</Text>
      <HStack justify="flex-end">
        <Input onChange={handleFileChange} w="full" type="file" size="sm" border="none" p="0px" />
      </HStack>
    </HStack>
  );
};
