import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { Experiment } from '../types';

const WrapperListeners = () => {
  return (
    <View>
      <Text>Wrapper listeners text</Text>
    </View>
  );
};

export const experiment: Experiment = {
  title: 'Wrapper Listeners',
  description:
    'When a parent component can listen for a specific event emitted by a child component',
  content: WrapperListeners,
};
