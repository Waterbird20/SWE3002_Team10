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
import { Logo } from '../common/Logo';

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
        fontFamily="Spoqa Han Sans Neo"
        maxH="100vh"
        overflow="scroll"
      >
        <VStack w="full" align="flex-start" spacing="44px">
          <HStack w="full" justify="space-between">
            <Link href="/">
              <Logo />
            </Link>
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
                    <Text fontSize="md">튜티</Text>
                  </Link>
                  <Link href="/class/tutor">
                    <Text fontSize="md">튜터</Text>
                  </Link>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem py="10px">
              <h2>
                <AccordionButton as={Link} href="/tutor">
                  <Box as="span" flex="1" textAlign="left">
                    <Text as={Link} href="/tutor" fontSize="xl" fontWeight={600} _hover={{ cursor: 'pointer' }}>
                      튜터
                    </Text>
                  </Box>
                </AccordionButton>
              </h2>
            </AccordionItem>
          </Accordion>
        </VStack>
      </DrawerContent>
    </Drawer>
  );
};
