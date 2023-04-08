import { HStack, Input, Text, VStack } from '@chakra-ui/react';
import { TuteeClassListItem } from './ClassListItem/TuteeClassListItem';
import { useEffect, useState } from 'react';

const classList = [
  'AI',
  '데이터베이스',
  '웹 프로그래밍',
  '알고리즘',
  'AI',
  '데이터베이스',
  '웹 프로그래밍',
  '알고리즘',
  'AI',
  '데이터베이스',
  '웹 프로그래밍',
  '알고리즘',
  'AI',
  '데이터베이스',
  '웹 프로그래밍',
  '알고리즘',
];

export const TuteeClassContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClassList, setFilteredClassList] = useState(classList);

  useEffect(() => {
    if (searchTerm === '') setFilteredClassList(classList);
    else
      setFilteredClassList(classList.filter((className) => className.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm]);

  return (
    <VStack w="full" maxW="700px" spacing="50px">
      <HStack w="full" justify="space-between">
        <Text fontSize="xl" fontWeight={600}>
          모집 과목 - 튜티 (Tutee)
        </Text>
        <Input w="300px" bg="white" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </HStack>
      <VStack w="full" spacing="20px">
        {filteredClassList.map((className) => (
          <TuteeClassListItem className={className} />
        ))}
      </VStack>
    </VStack>
  );
};
