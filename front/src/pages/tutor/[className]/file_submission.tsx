import { FileSubmissionContainer } from '@/component/Tutor/FileSubmission/FileSubmissionContainer';
import { Button, VStack } from '@chakra-ui/react';

export default function FileSubmission() {
  return (
    <VStack w="full" maxW="700px" h="auto" align="flex-start">
      <FileSubmissionContainer />
    </VStack>
  );
}
