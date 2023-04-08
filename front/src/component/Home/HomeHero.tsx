import { Box, HStack, Text, VStack, Image, Flex } from '@chakra-ui/react';
import main_hero from './main_hero.png';
import Link from 'next/link';

export const HomeHero = () => {
  return (
    <VStack w="full" h="auto" spacing="24px">
      <Box w="full" minH="200px" overflow="hidden">
        <Image src={main_hero.src} alt="main_hero" h="full" w="full" objectFit="cover" />
      </Box>
      <Flex flexDir={{ base: 'column', md: 'row' }} w="full" columnGap="50px" rowGap="12px">
        <Text
          as={Link}
          href="/tutor/weekly_report"
          w="full"
          bg="#48702B"
          textAlign="center"
          fontWeight={700}
          fontSize="16px"
          py="14px"
          color="white"
        >
          주간 보고서 제출
        </Text>
        <Text
          as={Link}
          href="/tutor/file_submission"
          w="full"
          bg="#48702B"
          textAlign="center"
          fontWeight={700}
          fontSize="16px"
          py="14px"
          color="white"
        >
          튜터 서류 제출
        </Text>
      </Flex>
    </VStack>
  );
};
