import { TutorCompletionListItem } from '@/component/Admin/TutorCompletionListItem';
import { totalClassList } from '@/mock/totalClassList';
import { Grid, HStack, Input, Text, VStack } from '@chakra-ui/react';

const TutorCompletion = () => {
  return (
    <VStack w="full" maxW="900px" spacing="50px">
      <HStack w="full" justify="space-between">
        <Text fontSize="xl" fontWeight={600}>
          튜터링 최종보고서 확인 / 최종 수료 승인
        </Text>
      </HStack>
      <Grid w="full" gridTemplateColumns="repeat(6, 1fr)" gap="8px" fontSize="sm">
        {totalClassList.map((className) => (
          <TutorCompletionListItem className={className} />
        ))}
      </Grid>
    </VStack>
  );
};

export default TutorCompletion;
