import { Box, Button, HStack, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IdentityCard } from './IdentityCard';
import { AccountCopy } from './AccountCopy';
import { PaymentCertificate } from './PaymentCertificate';
import { Receipt } from './Receipt';
import { ActivityReport } from './ActivityReport';
import { PrimaryButton } from '@/component/common/Button';
import { useTutoring } from '@/hooks';
import { useState } from 'react';
import { image_load, image_update } from '../../../../api';
import { useSession } from 'next-auth/react';

export const FileSubmissionContainer = () => {
  const router = useRouter();
  const { course_number } = router.query;
  const toast = useToast();
  const { data }: any = useSession();
  const { data: tutoring, refetch } = useTutoring(data.student_id, course_number as string);
  const [files, setFiles] = useState<{ [key: string]: File }>({});

  if (!tutoring) return <Spinner />;

  const {
    tutoring_id,
    tutor_grade,
    course_name,
    professor,
    syllabus,
    tutee1,
    tutee2,
    tutee3,
    tutee4,
    tutee5,
    mid_report1,
    mid_report2,
    mid_report3,
    mid_report4,
    mid_report5,
    mid_report6,
    mid_report7,
    mid_report8,
    mid_report9,
    mid_report10,
    time,
    credential_url,
    tongjang_url,
    ingunbee_url,
    receipt_url,
    report_url,
    completion,
  } = tutoring;

  const handleFileSubmit = async () => {
    try {
      const formData = new FormData();

      formData.set('tutoring_id', tutoring_id);
      formData.set('tutor_grade', tutor_grade);
      formData.set('course_name', course_name);
      formData.set('course_number', course_number as string);
      formData.set('professor', professor);
      for (const key in files) {
        if (files.hasOwnProperty(key)) formData.set(key, files[key]);
      }
      const res = await image_load(formData);
      const res2 = await image_update(tutoring_id, formData);

      if (!res2.ok) throw new Error('파일 제출에 실패했습니다.');

      toast({
        title: '파일 제출에 성공했습니다.',
        status: 'success',
      });
      refetch();
    } catch (e: any) {
      toast({
        title: e.message,
        status: 'error',
      });
    }
  };

  return (
    <VStack w="full" spacing="30px" align="flex-start">
      <Button size="sm" as={Link} href="/tutor">
        {'<'}
      </Button>
      <HStack w="full" justify="space-between">
        <VStack w="full" align="flex-start" spacing={0}>
          <Text fontSize="xl" fontWeight={600}>
            튜터 서류 제출
          </Text>
          <Text>{course_number}</Text>
        </VStack>
        <PrimaryButton onClick={handleFileSubmit}>제출</PrimaryButton>
      </HStack>

      <Box w="full" h="1px" bg="gray.300" />

      <VStack w="full" spacing="20px">
        <IdentityCard files={files} setFiles={setFiles} credential_url={credential_url} tutoring_id={tutoring_id} />
        <AccountCopy files={files} setFiles={setFiles} tongjang_url={tongjang_url} tutoring_id={tutoring_id} />
        <PaymentCertificate files={files} setFiles={setFiles} ingunbee_url={ingunbee_url} tutoring_id={tutoring_id} />
        <Receipt files={files} setFiles={setFiles} receipt_url={receipt_url} tutoring_id={tutoring_id} />
        <ActivityReport files={files} setFiles={setFiles} report_url={report_url} tutoring_id={tutoring_id} />
      </VStack>
    </VStack>
  );
};
