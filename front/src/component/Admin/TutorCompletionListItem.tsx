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
import { ImageUrlText } from '../common/ImageUrlText';
import { admin_final_approve, admin_final_return } from '../../../api';
import { useState } from 'react';

export const RejectModal = ({ isOpen, onClose, student_id, course_number, num }: any) => {
  const toast = useToast();
  const [text, setText] = useState('');

  const handleReject = async () => {
    try {
      const res = await admin_final_return({
        student_id,
        course_number,
        text,
      });

      if (!res.ok) throw new Error('승인 실패');

      toast({
        title: '승인 완료',
        status: 'success',
      });
    } catch (e: any) {
      toast({
        title: e.message,
        status: 'error',
      });
    }
  };

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

export const TutorCompletionListItem = ({ el }: any) => {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isRejectOpen, onClose: onRejectClose, onOpen: onRejectOpen } = useDisclosure({ id: 'reject' });

  const {
    course_name,
    course_id,
    total_count,
    total_time,
    tutor_name,
    status,
    credential_url,
    tongjang_url,
    ingunbee_url,
    receipt_url,
    report_url,
    tutee_attendance,
    tutoring_id,
  } = el;

  const completion = ![credential_url, tongjang_url, ingunbee_url, receipt_url, report_url].includes('');

  const handleApprove = async () => {
    try {
      const res = await admin_final_approve({
        student_id: tutoring_id.split('_')[0],
        course_number: course_id,
      });

      if (!res.ok) throw new Error('승인 실패');

      toast({
        title: '승인 완료',
        status: 'success',
      });
    } catch (e: any) {
      toast({
        title: e.message,
        status: 'error',
      });
    }
  };

  return (
    <>
      <FlexGridItem justifyContent="flex-start" onClick={onOpen}>
        <RejectModal
          isOpen={isRejectOpen}
          onClose={onRejectClose}
          student_id={tutoring_id.split('_')[0]}
          course_number={course_id}
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>튜터링 최종 보고서 확인 및 수료 승인</ModalHeader>
            <ModalBody>
              <VStack fontSize="xs" spacing="20px">
                <HStack w="full" justify="space-between">
                  <Text>
                    {course_name}({tutor_name})
                  </Text>
                  <Text>
                    회차({total_count}/10) 시간({total_time}/20)
                  </Text>
                </HStack>

                <HStack w="full" justify="space-between">
                  <Text fontWeight={600}>신분증 사본</Text>
                  {credential_url ? (
                    <ImageUrlText url={credential_url} tutoring_id={tutoring_id} />
                  ) : (
                    <Text color="red.600">미제출</Text>
                  )}
                </HStack>

                <HStack w="full" justify="space-between">
                  <Text fontWeight={600}>통장 사본</Text>
                  {tongjang_url ? (
                    <ImageUrlText url={tongjang_url} tutoring_id={tutoring_id} />
                  ) : (
                    <Text color="red.600">미제출</Text>
                  )}
                </HStack>

                <HStack w="full" justify="space-between">
                  <Text fontWeight={600}>인건비지급내역서</Text>
                  {ingunbee_url ? (
                    <ImageUrlText url={ingunbee_url} tutoring_id={tutoring_id} />
                  ) : (
                    <Text color="red.600">미제출</Text>
                  )}
                </HStack>

                <HStack w="full" justify="space-between">
                  <Text fontWeight={600}>영수증첨부지</Text>
                  {receipt_url ? (
                    <ImageUrlText url={receipt_url} tutoring_id={tutoring_id} />
                  ) : (
                    <Text color="red.600">미제출</Text>
                  )}
                </HStack>

                <HStack w="full" justify="space-between">
                  <Text fontWeight={600}>활동보고서</Text>
                  {report_url ? (
                    <ImageUrlText url={report_url} tutoring_id={tutoring_id} />
                  ) : (
                    <Text color="red.600">미제출</Text>
                  )}
                </HStack>

                <VStack w="full" align="flex-start">
                  <Text fontSize="md" fontWeight={600}>
                    튜티 출석
                  </Text>
                  <Grid w="full" gridTemplateColumns="repeat(11, 1fr)">
                    <FlexGridItem></FlexGridItem>
                    {new Array(10).fill(0).map((el, i) => (
                      <FlexGridItem>{i + 1}</FlexGridItem>
                    ))}
                    {Object.entries(tutee_attendance).map(([tutee, attendance]: any) => {
                      const attendanceArr = attendance.split('');
                      attendanceArr.length < 10 &&
                        attendanceArr.push(...new Array(10 - attendanceArr.length).fill('-'));

                      return (
                        <>
                          <FlexGridItem>{tutee}</FlexGridItem>
                          {attendanceArr.map((el: any) => (
                            <FlexGridItem>{el}</FlexGridItem>
                          ))}
                        </>
                      );
                    })}
                  </Grid>
                </VStack>

                <HStack w="full">
                  <PrimaryButton w="full" bg="gray" onClick={onRejectOpen}>
                    반려
                  </PrimaryButton>
                  <PrimaryButton w="full" onClick={handleApprove}>
                    승인
                  </PrimaryButton>
                </HStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Text onClick={onOpen}>{course_name}</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text color={completion ? 'green.600' : 'red.600'}>{completion ? '서류 제출 완료' : '서류 미제출'}</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text>{total_count}/10</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text>{total_time}/15</Text>
      </FlexGridItem>
      <FlexGridItem>
        <Text>{tutor_name}</Text>
      </FlexGridItem>
      <FlexGridItem>
        {status === 'T' ? (
          <PrimaryButton isDisabled bg="gray.800">
            승인됨
          </PrimaryButton>
        ) : status === 'N' ? (
          <PrimaryButton isDisabled bg="gray.800">
            반려됨
          </PrimaryButton>
        ) : (
          <HStack>
            <PrimaryButton onClick={handleApprove}>승인</PrimaryButton>
            <PrimaryButton bg="red.700" onClick={onRejectOpen}>
              반려
            </PrimaryButton>
          </HStack>
        )}
      </FlexGridItem>
    </>
  );
};
