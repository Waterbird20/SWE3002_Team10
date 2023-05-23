import { PrimaryButton } from '@/component/common/Button';
import { HStack, Text, useDisclosure } from '@chakra-ui/react';
import { FlexGridItem } from '../common/FlexGridItem';

export const TutorCompletionListItem = ({ className }: { className: string }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <FlexGridItem justifyContent="flex-start" onClick={onOpen}>
        <Text>{className}</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text>완료 or 미제출</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text>9/10</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text>14/15</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text>홍길동</Text>
      </FlexGridItem>
      <FlexGridItem>
        <PrimaryButton onClick={onOpen}>승인</PrimaryButton>
      </FlexGridItem>
    </>
  );
};
