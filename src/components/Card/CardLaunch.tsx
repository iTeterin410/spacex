import { Card, Image, Text, Button, Flex } from '@mantine/core';
import { useReducer } from 'react';
import type { Launch } from '../../types/launch';
import Modal from '../Modal/Modal';

type Props = {
  launchData: Launch;
};

type StateType = {
  isOpen: boolean;
};

type ActionType = 
  | { type: 'OPEN' }
  | { type: 'CLOSE' };


const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};


export default function CardLaunch({ launchData }: Props) {
  const [state, dispatch] = useReducer(reducer, { isOpen: false });

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Flex direction="column" gap="md" align="center">
          
          <Image
            src={launchData.links?.mission_patch_small}
            alt={launchData.mission_name}
            height={200}
            fit="contain"
            fallbackSrc="https://via.placeholder.com/200"
          />

         
          <Text ta="center" fw={500} size="lg">
            {launchData.mission_name}
          </Text>

          
          <Text ta="center" c="dimmed">
            {launchData.rocket?.rocket_name || 'Unknown rocket'}
          </Text>

         
          <Button 
            fullWidth 
            radius="md"
            onClick={() => dispatch({ type: 'OPEN' })}
          >
            See more
          </Button>
        </Flex>
      </Card>

     
      <Modal 
        isOpen={state.isOpen}
        launchData={launchData}
        onClose={() => dispatch({ type: 'CLOSE' })}
      />
    </>
  );
}