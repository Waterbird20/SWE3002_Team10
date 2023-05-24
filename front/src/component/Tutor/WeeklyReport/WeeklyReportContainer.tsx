import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Radio,
  Spinner,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { WeeklyReportUpload } from './WeeklyReportUpload';
import { WeeklyReportList } from './WeeklyReportList';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMyWeeklyReport, useTutoring } from '@/hooks';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { admin_weekly_approve, weekly_upload } from '../../../../api';
import { PrimaryButton } from '@/component/common/Button';
import { useQueryClient } from 'react-query';

export const WeeklyReportContainer = () => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { course_number } = router.query;
  const { data: session }: any = useSession();
  const { data } = useMyWeeklyReport({
    student_id: session?.student_id,
    course_number,
  });
  const [inputs, setInputs] = useState({
    num: '',
    from: '',
    to: '',
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    imageURL: '',
    content: '',
  });

  const { data: tutoring } = useTutoring(session?.student_id, course_number as string);

  if (!data || !tutoring || !session) return <Spinner />;

  const handleSubmit = async () => {
    try {
      const params: any = {
        student_id: session?.student_id,
        course_number,
        num: inputs.num,
        attendance:
          (inputs.one ? inputs.one : '-') +
          (inputs.two ? inputs.two : '-') +
          (inputs.three ? inputs.three : '-') +
          (inputs.four ? inputs.four : '-') +
          (inputs.five ? inputs.five : '-'),
        content: inputs.content,
        course_name: tutoring.course_name,

        time: +((new Date(inputs.to).getTime() - new Date(inputs.from).getTime()) / 1000 / 60 / 60).toFixed(0),
        date_time: inputs.from + '_' + inputs.to,
      };

      const res = await weekly_upload(params);

      if (!res.ok) throw new Error('주간보고서 작성에 실패했습니다.');

      toast({
        title: '주간보고서가 작성되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries('myWeeklyReport');
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
      <Flex flexDir={{ base: 'column', sm: 'row' }} w="full" justify="space-between" gap="10px">
        <VStack align="flex-start" spacing="0px">
          <Text fontSize="xl" fontWeight={600}>
            내 주간 보고서
          </Text>
          <Text>{course_number}</Text>
        </VStack>
        {/* <WeeklyReportUpload /> */}
        <PrimaryButton onClick={handleSubmit}>제출</PrimaryButton>
      </Flex>
      <HStack w="full" align="flex-start" spacing="50px">
        <VStack w="50%" align="flex-start">
          <HStack w="full" align="flex-start">
            <Text w="80px" fontWeight={600}>
              회차
            </Text>
            <Input w="full" value={inputs.num} onChange={(e) => setInputs({ ...inputs, num: e.target.value })} />
          </HStack>
          <HStack w="full" align="flex-start">
            <Text w="80px" fontWeight={600}>
              학습내용
            </Text>
            <Textarea
              w="full"
              placeholder="100자 이내"
              value={inputs.content}
              onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
            />
          </HStack>
          <Text w="80px" fontWeight={600}>
            시간
          </Text>
          <VStack w="full" align="flex-start">
            <HStack w="full">
              <Text>From</Text>
              <Input w="full" type="datetime-local" onChange={(e) => setInputs({ ...inputs, from: e.target.value })} />
            </HStack>
            <HStack w="full">
              <Text>To</Text>
              <Input w="full" type="datetime-local" onChange={(e) => setInputs({ ...inputs, to: e.target.value })} />
            </HStack>
          </VStack>
        </VStack>

        <VStack w="50%" align="flex-start">
          <Text fontWeight={600}>튜티 출석 체크 </Text>
          {tutoring.tutee1 && (
            <Radio
              isChecked={!!inputs.one}
              onChange={(e) => {
                setInputs({ ...inputs, one: e.target.checked ? 'O' : 'X' });
              }}
            >
              튜티 1
            </Radio>
          )}
          {tutoring.tutee2 && (
            <Radio
              isChecked={!!inputs.two}
              onChange={(e) => setInputs({ ...inputs, two: e.target.checked ? 'O' : 'X' })}
            >
              튜티 2
            </Radio>
          )}
          {tutoring.tutee3 && (
            <Radio
              isChecked={!!inputs.three}
              onChange={(e) => setInputs({ ...inputs, three: e.target.checked ? 'O' : 'X' })}
            >
              튜티 3
            </Radio>
          )}
          {tutoring.tutee4 && (
            <Radio
              isChecked={!!inputs.four}
              onChange={(e) => setInputs({ ...inputs, four: e.target.checked ? 'O' : 'X' })}
            >
              튜티 4
            </Radio>
          )}
          {tutoring.tutee5 && (
            <Radio
              isChecked={!!inputs.five}
              onChange={(e) => setInputs({ ...inputs, five: e.target.checked ? 'O' : 'X' })}
            >
              튜티 5
            </Radio>
          )}
        </VStack>
      </HStack>

      <Box w="full" h="1px" bg="gray.300" />

      <WeeklyReportList data={data} />
    </VStack>
  );
};
