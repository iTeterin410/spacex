import { SimpleGrid, Center, Loader, Text } from '@mantine/core';
import useLaunches from '../../hooks/useLaunches';
import CardLaunch from '../Card/CardLaunch';

function Main() {
  const { launches, loading, error } = useLaunches();

  if (loading) {
    return (
      <Center h={200}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h={200}>
        <Text c="red">Error: {error}</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid cols={3} spacing="lg" verticalSpacing="xl">
      {launches.map((launch) => (
        <CardLaunch key={launch.mission_name} launchData={launch} />
      ))}
    </SimpleGrid>
  );
}

export default Main; 