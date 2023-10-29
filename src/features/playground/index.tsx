import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';

import { Divider } from './Divider';
import { Spacer } from './Spacer';
import { bench as stateUpdateBench } from './stateUpdates';
import { bench as componentsBench } from './components';
import { Bench } from './types';

const benches: Bench[] = [componentsBench, stateUpdateBench];

const Playground = () => {
  return (
    <ScrollView style={{ padding: 16 }}>
      {benches.map(bench => (
        <View key={bench.title} style={styles.bench}>
          <Text variant="headlineMedium">{bench.title}</Text>
          <View style={styles.experimentBench}>
            {bench.experiments.map(experiment => (
              <Surface
                key={`${bench.title}-${experiment.title}`}
                style={styles.experiment}>
                <Text variant="titleLarge">{experiment.title}</Text>
                <Text variant="titleSmall">{experiment.description}</Text>
                <Divider />
                {experiment.content()}
              </Surface>
            ))}
          </View>
        </View>
      ))}
      <Spacer height={100} />
    </ScrollView>
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
    width: '100%',
    maxWidth: 420,
  },
});
