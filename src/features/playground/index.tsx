import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';

import { Bench } from './types';

const benches: Bench[] = [
  {
    title: 'State Updates',
    experiments: [
      {
        title: 'Block 1',
        content: <></>,
      },
      {
        title: 'Block 2',
        content: <></>,
      },
      {
        title: 'Block 3',
        content: <></>,
      },
    ],
  },
  {
    title: 'Next one',
    experiments: [{ title: 'Experiment', content: <></> }],
  },
];

const Playground = () => {
  return (
    <View style={{ padding: 16 }}>
      {benches.map(bench => (
        <View style={styles.bench}>
          <Text variant="headlineMedium">{bench.title}</Text>
          <View style={styles.experimentBench}>
            {bench.experiments.map(experiment => (
              <Surface style={styles.experiment}>
                <Text variant="titleMedium">{experiment.title}</Text>
                {experiment.content}
              </Surface>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Playground;

const styles = StyleSheet.create({
  bench: { marginBottom: 16 },
  experimentBench: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  experiment: {
    margin: 8,
    padding: 8,
    minHeight: 100,
    minWidth: 200,
  },
});
