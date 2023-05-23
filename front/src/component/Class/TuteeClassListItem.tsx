import { PrimaryButton } from '@/component/common/Button';
import { HStack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { tutoring_apply } from '../../../api';

export const TuteeClassListItem = ({ el }: { el: any }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

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
        student_id: '2019315408',
        course_number,
      });
      if (!res.ok) throw new Error('신청 실패');
      toast({
        title: '신청 완료',
        status: 'success',
      });
    } catch (e) {
      toast({
        title: '신청 실패',
        status: 'error',
      });
    }
  };

  return (
    <HStack w="full" justify="space-between">
      <Text>{course_name}</Text>
      <HStack fontSize="xs">
        <Text>{tutoring_id.split('_')[0]}</Text>
        <Text>({tuteeNum}/5)</Text>
        <PrimaryButton onClick={handleApply}>신청</PrimaryButton>
      </HStack>
    </HStack>
  );
};
