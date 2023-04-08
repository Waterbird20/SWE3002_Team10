import { HStack, Input, Text, VStack } from '@chakra-ui/react';
import { TuteeClassListItem } from './ClassListItem/TuteeClassListItem';
import { useEffect, useState } from 'react';
import { totalClassList } from '@/mock/totalClassList';

export const TuteeClassContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClassList, setFilteredClassList] = useState(totalClassList);

  useEffect(() => {
    if (searchTerm === '') setFilteredClassList(totalClassList);
    else
      setFilteredClassList(
        totalClassList.filter((className) => className.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [searchTerm]);

  return (
    <VStack w="full" maxW="500px" spacing="50px">
      <HStack w="full" justify="space-between">
        <VStack align="flex-start" spacing="0px" fontSize="xl" fontWeight={600}>
          <Text>튜티 (Tutee)</Text>
          <Text>모집 과목</Text>
        </VStack>
        <Input w="300px" bg="white" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </HStack>
      <VStack w="full" spacing="12px">
        {filteredClassList.map((className) => (
          <TuteeClassListItem className={className} />
        ))}
      </VStack>
    </VStack>
  );
};
