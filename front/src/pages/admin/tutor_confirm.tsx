import { TutorConfirmListItem } from '@/component/Admin/TutorConfirmListItem';
import { useApprovedTutoringList, useWaitingTutoringList } from '@/hooks';
import { totalClassList } from '@/mock/totalClassList';
import { Grid, HStack, Input, Spinner, Text, VStack } from '@chakra-ui/react';

const TutorConfirm = () => {
  const { data: waitingList } = useWaitingTutoringList();
  const { data: approvedList } = useApprovedTutoringList();

  if (!waitingList || !approvedList) return <Spinner />;

  return (
    <VStack w="full" maxW="700px" spacing="50px">
      <HStack w="full" justify="space-between">
        <Text fontSize="xl" fontWeight={600}>
          튜터링 승인
        </Text>
      </HStack>
      <Grid w="full" gridTemplateColumns="repeat(4, 1fr)" gap="8px" fontSize="sm">
        {waitingList.map((el: any) => (
          <TutorConfirmListItem el={el} />
        ))}
        {approvedList.map((el: any) => (
          <TutorConfirmListItem el={el} />
        ))}
      </Grid>
    </VStack>
  );
};

export default TutorConfirm;
