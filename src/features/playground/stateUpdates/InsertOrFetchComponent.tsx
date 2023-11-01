import { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import {
  InsertOrFetch,
  InsertOrFetchEvents,
} from '../../../components/InsertOrFetch';
import { Divider } from '../Divider';
import { Spacer } from '../Spacer';
import { TextValue } from '../TextValue';
import {
  selectAllIoF,
  selectIoFByValue,
  insertIfMissing,
  insertIfMissingDelayed,
} from '../slice';
import { Experiment } from '../types';

const LABEL_WIDTH = 120;

const InsertOrFetchWrapper = () => {
  const [returnIds, setReturnIds] = useState([] as string[]);

  const addReturnId = (value?: string) => {
    setReturnIds([...returnIds, value ?? '(empty)']);
  };

  return (
    <>
      <Body onSelected={addReturnId} />
      <Divider />
      <Text variant="labelMedium" style={{ fontWeight: 'bold' }}>
        Value bubbled
      </Text>
      {returnIds.map((item, index) => (
        <TextValue
          label={String(index + 1)}
          key={index}
          value={item}
          labelWidth={20}
        />
      ))}
    </>
  );
};

interface BodyProps {
  onSelected: (id?: string) => void;
}

const Body = ({ onSelected }: BodyProps) => {
  const [value, setValue] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [valueSelectedId, setValueSelectedId] = useState(
    null as unknown as string,
  );

  const allItems = useAppSelector(selectAllIoF);
  const fieldValueSelectedId = useAppSelector(
    state => selectIoFByValue(state, fieldValue)?.id,
  );

  const selectedIdSelector = (value: string) => (state: RootState) =>
    selectIoFByValue(state, value)?.id;

  const dispatch = useAppDispatch();

  const onPress = () => {
    if (!fieldValue) {
      return false;
    }

    setValue(fieldValue);
    dispatch(insertIfMissing(fieldValue));
  };

  const onPressAsync = async () => {
    if (!fieldValue) {
      return false;
    }

    setValue(fieldValue);
    await dispatch(insertIfMissingDelayed(fieldValue));
  };

  return (
    <InsertOrFetch
      selector={selectedIdSelector(value)}
      onReady={id => {
        setValueSelectedId(id);
        onSelected(id);
      }}>
      {allItems.map(item => (
        <TextValue
          label={item.value}
          key={item.id}
          value={item.id}
          labelWidth={LABEL_WIDTH}
        />
      ))}
      <Divider />

      <TextValue label="Current value" labelWidth={LABEL_WIDTH} value={value} />
      <TextValue
        label="Current value id"
        labelWidth={LABEL_WIDTH}
        value={valueSelectedId}
      />
      <TextValue
        label="Field value id"
        labelWidth={LABEL_WIDTH}
        value={fieldValueSelectedId}
      />

      <Divider />

      <TextInput
        label="Enter a value"
        value={fieldValue}
        onChangeText={setFieldValue}
      />
      <Spacer />
      <View style={{ width: 200, marginHorizontal: 'auto', marginBottom: 8 }}>
        <InsertOrFetch.Button
          event={InsertOrFetchEvents.Activate}
          mode="contained"
          onPress={onPress}>
          Use value (sync)
        </InsertOrFetch.Button>
        <Spacer />
        <InsertOrFetch.Button
          event={InsertOrFetchEvents.Activate}
          mode="contained"
          onPress={onPressAsync}>
          Use value (async)
        </InsertOrFetch.Button>
      </View>
    </InsertOrFetch>
  );
};

export const experiment: Experiment = {
  title: 'Insert or Fetch (component)',
  description:
    "Creates a new entry if it doesn't exist and returns the id. Async dispatches result in a spinner. This functionality is encapsulated in the InsertOrFetch Component.",
  content: InsertOrFetchWrapper,
};
