import { myClassList } from '@/mock/totalClassList';
import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { PrimaryButton } from '../common/Button';
import { useState } from 'react';
import { tutoring_apply, tutoring_propose } from '../../../api';
import { useMadeTutoring } from '@/hooks';
import { useSession } from 'next-auth/react';

export const TutorHomeContainer = () => {
  const { data }: any = useSession();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const [inputs, setInputs] = useState<{
    tutor_grade: string;
    course_name: string;
    course_number: string;
    professor: string;
    motive: string;
    syllabus: string;
    available_time: string;
  }>({
    tutor_grade: '',
    course_name: '',
    course_number: '',
    professor: '',
    motive: '',
    syllabus: '',
    available_time: '',
  });

  //@ts-ignore
  const { data: madeTutoring } = useMadeTutoring(data.student_id);

  const handlePropose = async () => {
    try {
      const res = await tutoring_propose({ ...inputs, student_id: data.student_id, tutee: '' });

      if (!res.ok) throw new Error('신청 실패');

      toast({
        title: '신청 성공',
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

  if (!madeTutoring) return <Spinner />;

  return (
    <>
      <HStack w="full">
        <Text fontSize="2xl" fontWeight={600} w="full">
          내 튜터 과목
        </Text>
        <PrimaryButton onClick={onOpen}>튜터링 개설하기</PrimaryButton>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>튜터 신청</Text>
            </ModalHeader>
            <ModalBody>
              <VStack fontSize="xs">
                <HStack w="full" justify="space-between">
                  <Text>과목명</Text>
                  <Input
                    size="xs"
                    w="200px"
                    variant="flushed"
                    value={inputs.course_name}
                    onChange={(e) => setInputs({ ...inputs, course_name: e.target.value })}
                  />
                </HStack>

                <HStack w="full" justify="space-between">
                  <Text>취득 성적</Text>
                  <Input
                    size="xs"
                    w="200px"
                    variant="flushed"
                    value={inputs.tutor_grade}
                    onChange={(e) => setInputs({ ...inputs, tutor_grade: e.target.value })}
                  />
                </HStack>

                <HStack w="full" justify="space-between">
                  <Text>수강한 교수명</Text>
                  <Input
                    size="xs"
                    w="200px"
                    variant="flushed"
                    value={inputs.professor}
                    onChange={(e) => setInputs({ ...inputs, professor: e.target.value })}
                  />
                </HStack>

                <HStack w="full" justify="space-between">
                  <Text>과목/분반 (ex. SWE3002_42)</Text>
                  <Input
                    size="xs"
                    w="200px"
                    variant="flushed"
                    value={inputs.course_number}
                    onChange={(e) => setInputs({ ...inputs, course_number: e.target.value })}
                  />
                </HStack>

                <VStack w="full" align="flex-start">
                  <Text>지원 동기</Text>
                  <Textarea
                    fontSize="xs"
                    value={inputs.motive}
                    onChange={(e) => setInputs({ ...inputs, motive: e.target.value })}
                  />
                </VStack>

                <VStack w="full" align="flex-start">
                  <Text>튜터링 계획</Text>
                  <Textarea
                    fontSize="xs"
                    value={inputs.syllabus}
                    onChange={(e) => setInputs({ ...inputs, syllabus: e.target.value })}
                  />
                </VStack>

                <VStack w="full" align="flex-start">
                  <Text>가능한 시간</Text>
                  <Textarea
                    fontSize="xs"
                    value={inputs.available_time}
                    onChange={(e) => setInputs({ ...inputs, available_time: e.target.value })}
                  />
                </VStack>

                <HStack w="full">
                  <PrimaryButton w="full" bg="gray" onClick={onClose}>
                    이전
                  </PrimaryButton>
                  <PrimaryButton w="full" onClick={handlePropose}>
                    신청
                  </PrimaryButton>
                </HStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
      <VStack w="full" spacing="20px">
        {madeTutoring.map((el: any) => {
          return (
            <HStack w="full" justify="space-between">
              <Text fontWeight={500}>{el.course_name}</Text>
              <HStack>
                <Button as={Link} href={`/tutor/${el.course_number}/weekly_report`} size="sm">
                  주간보고서
                </Button>
                <Button as={Link} size="sm" href={`/tutor/${el.course_number}/file_submission`}>
                  서류 제출
                </Button>
              </HStack>
            </HStack>
          );
        })}
      </VStack>
    </>
  );
};
