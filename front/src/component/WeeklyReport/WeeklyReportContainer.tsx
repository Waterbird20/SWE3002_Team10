import { Button, Flex, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { removeFile, submitFile } from './utils';
import { WeeklyReportUpload } from './WeeklyReportUpload';
import { WeeklyReportList } from './WeeklyReportList';

export const WeeklyReportContainer = () => {
  const { className, files } = {
    className: '분자생물학',
    files: [
      '분자생물학 2회차 2023.3.31 (금) 1시간 30분.pdf',
      '분자생물학 2회차 2023.3.31 (금) 1시간 30분.pdf',
      '분자생물학 2회차 2023.3.31 (금) 1시간 30분.pdf',
    ],
  };

  return (
    <>
      <Flex flexDir={{ base: 'column', sm: 'row' }} w="full" justify="space-between" gap="10px">
        <VStack align="flex-start" spacing="0px">
          <Text fontSize="xl" fontWeight={600}>
            내 주간 보고서
          </Text>
          <Text>{className}</Text>
        </VStack>
        <WeeklyReportUpload />
      </Flex>
      <WeeklyReportList />
    </>
  );
};
