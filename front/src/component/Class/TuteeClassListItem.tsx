import { PrimaryButton } from '@/component/common/Button';
import { HStack, Modal, ModalContent, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { tutoring_apply } from '../../../api';
import { useSession } from 'next-auth/react';
import { useQueryClient } from 'react-query';

export const TuteeClassListItem = ({ el }: { el: any }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data }: any = useSession();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    approval,
    available_time,
    course_name,
    course_number,
    motive,
    professor,
    syllabus,
    tutee,
    tutor_grade,
    tutoring_id,
  } = el;

  const tuteeNum = tutee.split(',').length;

  const handleApply = async () => {
    try {
      const res = await tutoring_apply({
        student_id: data.student_id,
        tutoring_id,
      });
      const result = await res.json();
      if (result?.success !== 'True') throw new Error('신청 실패');
      toast({
        title: '신청 완료',
        status: 'success',
      });
      queryClient.invalidateQueries('approvedTutoringList');
    } catch (e) {
      toast({
        title: '신청 실패',
        status: 'error',
      });
    }
  };

  return (
    <HStack w="full" justify="space-between">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent></ModalContent>
      </Modal>
      <Text onClick={onOpen}>{course_name}</Text>
      <HStack fontSize="xs">
        <Text>{tutoring_id.split('_')[0]}</Text>
        <Text>({tuteeNum}/5)</Text>
        <PrimaryButton onClick={handleApply}>신청</PrimaryButton>
      </HStack>
    </HStack>
  );
};
