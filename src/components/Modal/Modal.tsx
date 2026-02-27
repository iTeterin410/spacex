import { Box, Button, Card, Flex, Group, Image, Text } from '@mantine/core';
import { createPortal } from 'react-dom';
import type { Launch } from '../../types/launch';


type ModalProps = {
  launchData: Launch;
  isOpen: boolean;
  onClose: () => void;
};


export default function Modal({ launchData, isOpen, onClose }: ModalProps) {

  const modalElement = document.getElementById('modal');


  if (!isOpen || !modalElement) return null;

  return createPortal(
    <Box
      pos="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0,0,0,0.5)"
      style={{ zIndex: 1000 }}
      onClick={onClose}  
    >
      <Card
        shadow="lg"
        padding="lg"
        radius="md"
        withBorder
        pos="fixed"
        top="50%"
        left="50%"
        style={{
          transform: 'translate(-50%, -50%)',
          maxWidth: '90%',
          width: '500px',
          maxHeight: '90vh',
          overflow: 'auto',
          zIndex: 1001
        }}
        onClick={(e) => e.stopPropagation()}  
      >
        <Flex direction="column" gap="md">
         
          <Group justify="space-between" wrap="nowrap">
            <Text size="xl" fw={700}>
              {launchData.mission_name}
            </Text>
            <Button 
              variant="subtle" 
              color="gray" 
              onClick={onClose}
              size="compact-md"
            >
              ✕
            </Button>
          </Group>

        
          <Image
            src={launchData.links?.mission_patch_small}
            alt={launchData.mission_name}
            height={150}
            fit="contain"
            fallbackSrc="https://via.placeholder.com/150"
          />

          
          <Box>
            <Text fw={500}>Mission name:</Text>
            <Text c="dimmed" mb="md">
              {launchData.mission_name}
            </Text>

            <Text fw={500}>Rocket name:</Text>
            <Text c="dimmed" mb="md">
              {launchData.rocket?.rocket_name || 'Unknown'}
            </Text>

            {launchData.details && (
              <>
                <Text fw={500}>Details:</Text>
                <Text c="dimmed">
                  {launchData.details}
                </Text>
              </>
            )}
          </Box>
        </Flex>
      </Card>
    </Box>,
    modalElement
  );
}