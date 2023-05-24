import { HStack, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { TuteeClassListItem } from './TuteeClassListItem';
import { useEffect, useState } from 'react';
import { useApprovedTutoringList } from '@/hooks';

export const TuteeClassContainer = () => {
  const { data: approvedList } = useApprovedTutoringList();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClassList, setFilteredClassList] = useState([]);

  useEffect(() => {
    if (searchTerm === '') setFilteredClassList(approvedList);
    else
      setFilteredClassList(
        approvedList.filter((el: any) => el.course_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [searchTerm]);

  if (!approvedList) return <Spinner />;

  return (
    <VStack w="full" maxW="700px" spacing="50px">
      <HStack w="full" justify="space-between">
        <Text fontSize="xl" fontWeight={600}>
          모집 과목 - 튜티 (Tutee)
        </Text>
        <Input w="300px" bg="white" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </HStack>
      <VStack w="full" spacing="12px">
        {(searchTerm ? filteredClassList : approvedList).map((el: any, i: any) => (
          <TuteeClassListItem el={el} key={i} />
        ))}
      </VStack>
    </VStack>
  );
};
