import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

import { SpinnerMask } from '../../../components/SpinnerMask';
import { Spacer } from '../Spacer';
import { Experiment } from '../types';

const SpinnerMaskExperiment = () => {
  const theme = useTheme();
  const [time, setTime] = useState('5000');
  const [maskVisible, setMaskVisible] = useState(false);

  const onShowMask = async () => {
    setMaskVisible(true);
    await new Promise(r => setTimeout(r, parseInt(time, 10)));
    setMaskVisible(false);
  };

  return (
    <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
      <SpinnerMask visible={maskVisible}>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dotted',
            borderColor: theme.colors.primary,
            padding: 8,
          }}>
          <Text variant="bodyMedium">
            Enter a number of milliseconds to show the mask
          </Text>
          <Spacer />
          <TextInput
            label="Milliseconds"
            value={String(time)}
            onChangeText={text => setTime(text.replace(/[^0-9]/g, ''))}
          />
          <Spacer />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button onPress={onShowMask} mode="contained">
              Show Spinner Mask
            </Button>
          </View>
        </View>
      </SpinnerMask>
    </View>
  );
};

export const experiment: Experiment = {
  title: 'Spinner Mask',
  description: 'Places a mask with a spinner over child components',
  content: SpinnerMaskExperiment,
};
