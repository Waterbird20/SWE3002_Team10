import { HomeHero } from '@/component/Home/HomeHero';
import { TuteeClassList } from '@/component/Home/TuteeClassList';
import { TutorClassList } from '@/component/Home/TutorClassList';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

export default function Home() {
  return (
    <VStack w="full" maxW="1100px" h="auto" spacing="50px">
      <HomeHero />
      <Flex flexDir={{ base: 'column', md: 'row' }} w="full" gap="50px">
        <TuteeClassList />
        <TutorClassList />
      </Flex>
    </VStack>
  );
}
