import { PrimaryButton } from '@/component/common/Button';
import {
  Grid,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FlexGridItem } from '../common/FlexGridItem';
import { useReportList } from '@/hooks';
import { useState } from 'react';
import { admin_weekly_approve, admin_weekly_return } from '../../../api';

export const RejectModal = ({ isOpen, onClose, student_id, course_number, num }: any) => {
  const toast = useToast();
  const handleReject = async () => {
    try {
      const res = await admin_weekly_return({
        student_id,
        course_number,
        num,
        return_reason: text,
      });

      if (!res.ok) throw new Error('반려에 실패했습니다.');

      toast({
        title: '반려되었습니다.',
        status: 'success',
      });

      onClose();
    } catch (e: any) {
      toast({
        title: e.message,
        status: 'error',
      });
    }
  };
  const [text, setText] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>반려사유</Text>
        </ModalHeader>
        <ModalBody>
          <VStack w="full">
            <Textarea w="full" value={text} onChange={(e) => setText(e.target.value)} />
            <HStack w="full" justify="flex-end">
              <PrimaryButton onClick={handleReject}>확인</PrimaryButton>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const TutorReportListItem = ({ el }: { el: any }) => {
  const toast = useToast();
  const { isOpen: isConfirmOpen, onClose: onConfirmClose, onOpen: onConfirmOpen } = useDisclosure({ id: 'confirm' });
  const { isOpen: isRejectOpen, onClose: onRejectClose, onOpen: onRejectOpen } = useDisclosure({ id: 'reject' });

  const { attendance, content, course_number, date_time, filename, image_url, num, report_id, time } = el;
  const student_id = report_id.split('_')[0];
  const [start_timestamp, end_timestamp] = date_time.split('~');
  const attendArr = attendance.split('').filter((el: any) => el !== '-');

  const handleApprove = async () => {
    try {
      const res = await admin_weekly_approve({
        student_id,
        course_number,
        num,
        tutoring_time: time,
      });

      if (!res.ok) throw new Error('승인에 실패했습니다.');

      toast({
        title: '승인되었습니다.',
        status: 'success',
      });
      onConfirmClose();
    } catch (e: any) {
      toast({
        title: e.message,
        status: 'error',
      });
    }
  };

  return (
    <HStack w="full" justify="space-between">
      <RejectModal
        isOpen={isRejectOpen}
        onClose={onRejectClose}
        student_id={student_id}
        course_number={course_number}
        num={num}
      />
      <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>주간보고서 승인</Text>
          </ModalHeader>
          <ModalBody>
            <VStack w="full" spacing="24px">
              <HStack w="full" justify="space-between">
                <Text>회차</Text>
                <Text>{num}</Text>
              </HStack>

              <HStack w="full" justify="space-between">
                <Text>시간</Text>
                <HStack>
                  <Text>{new Date(start_timestamp).toLocaleString()}</Text>
                  <Text>~ {new Date(end_timestamp).toLocaleTimeString()}</Text>
                </HStack>
              </HStack>

              <Grid w="full" gridTemplateColumns="repeat(3, 1fr)" gap="20px" fontSize="sm">
                <FlexGridItem justifyContent="flex-start">튜티</FlexGridItem>
                <FlexGridItem>출석</FlexGridItem>
                <FlexGridItem>결석</FlexGridItem>
                {attendArr.map((el: any, i: any) => (
                  <>
                    <FlexGridItem justifyContent="flex-start">튜티 {i + 1}</FlexGridItem>
                    {el === 'O' ? (
                      <>
                        <FlexGridItem color="green.700">O</FlexGridItem>
                        <FlexGridItem></FlexGridItem>
                      </>
                    ) : (
                      <>
                        <FlexGridItem></FlexGridItem>
                        <FlexGridItem color="red.700">O</FlexGridItem>
                      </>
                    )}
                  </>
                ))}
              </Grid>

              <VStack w="full" align="flex-start">
                <Text>학습내용</Text>
                <Text>{content}</Text>
              </VStack>

              <HStack w="full">
                <PrimaryButton w="full" onClick={handleApprove}>
                  승인
                </PrimaryButton>
                <PrimaryButton w="full" bg="red.700" onClick={onRejectOpen}>
                  반려
                </PrimaryButton>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Text onClick={onConfirmOpen}>{course_number}</Text>
      <HStack spacing="20px">
        <Text>{student_id}</Text>
        <HStack>
          <PrimaryButton onClick={handleApprove}>승인</PrimaryButton>
          <PrimaryButton bg="red.700" onClick={onRejectOpen}>
            반려
          </PrimaryButton>
        </HStack>
      </HStack>
    </HStack>
  );
};
