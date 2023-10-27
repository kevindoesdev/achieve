import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Divider } from '../Divider';
import { Spacer } from '../Spacer';
import { TextValue } from '../TextValue';
import { Experiment } from '../types';

const SequencedUseStateUpdates = () => {
  const [value, setValue] = useState('');
  const [fieldValue, setFieldValue] = useState('');

  return (
    <>
      <TextValue label="Current value" labelWidth={100} value={value} />
      <TextValue label="Field value" labelWidth={100} value={fieldValue} />
      <Divider />
      <TextInput
        label="Enter a value"
        value={fieldValue}
        onChangeText={setFieldValue}
      />
      <Spacer />
      <View style={{ width: 200, marginHorizontal: 'auto', marginBottom: 8 }}>
        <Button mode="contained" onPress={() => setValue(fieldValue)}>
          Use value
        </Button>
      </View>
    </>
  );
};

export const experiment: Experiment = {
  title: 'Sequenced useState Updates',
  description: 'Stores a field value in state on press.',
  content: SequencedUseStateUpdates,
};
