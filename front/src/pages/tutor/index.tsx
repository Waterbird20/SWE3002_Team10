import { TutorHomeContainer } from '@/component/Tutor/TutorHomeContainer';
import { myClassList } from '@/mock/totalClassList';
import { Text, VStack } from '@chakra-ui/react';

export default function Tutor() {
  return (
    <VStack w="full" maxW="700px" spacing="50px">
      <TutorHomeContainer />
    </VStack>
  );
}
