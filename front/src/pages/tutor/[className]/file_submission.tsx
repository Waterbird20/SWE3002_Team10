import { FileSubmissionContainer } from '@/component/Tutor/FileSubmission/FileSubmissionContainer';
import { Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';
export default function FileSubmission() {
  return (
    <VStack w="full" maxW="500px" h="auto" spacing="10px" align="flex-start">
      <Button size="xs" as={Link} href="/tutor">
        {'<'}
      </Button>
      <FileSubmissionContainer />
    </VStack>
  );
}
