import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  HStack,
  ModalCloseButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../Layout/Logo.png';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const MobileNavbarModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();

  useEffect(() => {
    onClose();
  }, [router.route]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="top">
      <DrawerOverlay />
      <DrawerContent
        px={{ base: '20px', md: '50px' }}
        py={{ base: '35px', md: '50px' }}
        fontFamily="Montserrat"
        maxH="100vh"
        overflow="scroll"
      >
        <VStack w="full" align="flex-start" spacing="44px">
          <HStack w="full" justify="space-between">
            <Image src={logo} alt="logo" width={200} />
            <CloseButton onClick={onClose} />
          </HStack>
          <Accordion w="full" allowToggle>
            <AccordionItem py="10px">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="xl" fontWeight={600} _hover={{ cursor: 'pointer' }}>
                      모집과목
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack w="full" align="flex-start" spacing="20px">
                  <Link href="/class/tutee">
                    <Text fontSize="md" fontWeight={600}>
                      튜티
                    </Text>
                  </Link>
                  <Link href="/class/tutor">
                    <Text fontSize="md" fontWeight={600}>
                      튜터
                    </Text>
                  </Link>
                </VStack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem py="10px">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="xl" fontWeight={600} _hover={{ cursor: 'pointer' }}>
                      튜터
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack w="full" align="flex-start" spacing="20px">
                  <Link href="/tutor/weekly_report">
                    <Text fontSize="md" fontWeight={500}>
                      주간 보고서
                    </Text>
                  </Link>
                  <Link href="/tutor/file_submission">
                    <Text fontSize="md" fontWeight={500}>
                      서류 제출
                    </Text>
                  </Link>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </DrawerContent>
    </Drawer>
  );
};
