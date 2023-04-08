import { HStack, Text, useDisclosure } from '@chakra-ui/react';

export const TuteeClassListItem = ({ className }: { className: string }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <HStack w="full" justify="space-between">
      <Text>{className}</Text>
      <Text
        fontSize="xs"
        py="4px"
        px="15px"
        bg="#48702B"
        color="white"
        borderRadius="5px"
        fontWeight={700}
        _hover={{ cursor: 'pointer' }}
        onClick={onOpen}
      >
        신청
      </Text>
    </HStack>
  );
};
