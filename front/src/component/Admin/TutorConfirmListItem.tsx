import { PrimaryButton } from '@/component/common/Button';
import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FlexGridItem } from '../common/FlexGridItem';
import { admin_tutoring_approve, admin_tutoring_return } from '../../../api';
import { useQueryClient } from 'react-query';

export const TutorConfirmListItem = ({ el }: { el: any }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    approval,
    course_number,
    available_time,
    professor,
    motive,
    syllabus,
    course_name,
    tutor_grade,
    tutee,
    tutoring_id,
  } = el;

  const student_id = tutoring_id.split('_')[0];

  const handleApprove = async () => {
    try {
      const res = await admin_tutoring_approve({
        course_number: course_number,
        student_id,
      });

      if (!res.ok) throw new Error('승인 실패');

      toast({
        title: '승인 성공',
        status: 'success',
      });
      queryClient.invalidateQueries('waitingTutoringList');
      queryClient.invalidateQueries('approvedTutoringList');
    } catch (e: any) {
      toast({
        title: e.message,
        status: 'error',
      });
    }
  };

  const handleReject = async () => {
    try {
      const res = await admin_tutoring_return({
        course_number: course_number,
        student_id: tutoring_id.split('_')[0],
      });

      toast({
        title: '승인 성공',
        status: 'success',
      });
      queryClient.invalidateQueries('waitingTutoringList');
      queryClient.invalidateQueries('approvedTutoringList');
    } catch (e: any) {
      toast({
        title: e.message,
        status: 'error',
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack>
              <HStack w="full" justify="space-between">
                <Text>튜터 신청</Text>
                <Text>{course_name}</Text>
              </HStack>

              <HStack w="full" justify="space-between">
                <Text>취득 성적</Text>
                <Text>{tutor_grade}</Text>
              </HStack>

              <HStack w="full" justify="space-between">
                <Text>수강한 교수명</Text>
                <Text>{professor}</Text>
              </HStack>

              <VStack w="full" align="flex-start">
                <Text>지원 동기</Text>
                <Text>{motive}</Text>
              </VStack>

              <VStack w="full" align="flex-start">
                <Text>튜터링 계획</Text>
                <Text>{syllabus}</Text>
              </VStack>

              <VStack w="full" align="flex-start">
                <Text>가능한 시간</Text>
                <Text>{available_time}</Text>
              </VStack>

              <HStack w="full">
                <PrimaryButton bg="red.700" onClick={handleReject}>
                  반려
                </PrimaryButton>
                <PrimaryButton onClick={handleApprove}>승인</PrimaryButton>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <FlexGridItem justifyContent="flex-start" onClick={onOpen}>
        <Text>{course_name}</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text>{tutor_grade}</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text>{student_id}</Text>
      </FlexGridItem>
      <FlexGridItem justifyContent="flex-end">
        {approval ? (
          <PrimaryButton isDisabled bg="gray.800">
            승인됨
          </PrimaryButton>
        ) : (
          <HStack>
            <PrimaryButton onClick={handleApprove}>승인</PrimaryButton>
            <PrimaryButton bg="red.700" onClick={handleReject}>
              반려
            </PrimaryButton>
          </HStack>
        )}
      </FlexGridItem>
    </>
  );
};
