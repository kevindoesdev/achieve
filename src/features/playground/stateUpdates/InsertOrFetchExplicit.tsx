import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { Divider } from '../Divider';
import { Spacer } from '../Spacer';
import { TextValue } from '../TextValue';
import { selectAllIoF, selectIoFByValue, insertIfMissing } from '../slice';
import { Experiment } from '../types';

const LABEL_WIDTH = 120;

const InsertOrFetchWrapper = () => {
  const [returnIds, setReturnIds] = useState([] as string[]);

  const addReturnId = (value?: string) => {
    setReturnIds([...returnIds, value ?? '(empty)']);
  };

  return (
    <>
      <InsertOrFetch onSelected={addReturnId} />
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

interface InsertOrFetchProps {
  onSelected: (id?: string) => void;
}

const InsertOrFetch = ({ onSelected }: InsertOrFetchProps) => {
  const [value, setValue] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [fireOnSelectWhenReady, setFireOnSelectWhenReady] = useState(false);

  const allItems = useAppSelector(selectAllIoF);
  const fieldValueSelectedId = useAppSelector(
    state => selectIoFByValue(state, fieldValue)?.id,
  );

  const valueSelectedId = useAppSelector(
    state => selectIoFByValue(state, value)?.id,
  );

  const dispatch = useAppDispatch();

  const onPress = () => {
    setFireOnSelectWhenReady(false);
    setValue(fieldValue);
    dispatch(insertIfMissing(fieldValue));
    setFireOnSelectWhenReady(true);
  };

  useEffect(() => {
    if (fireOnSelectWhenReady && valueSelectedId != null) {
      onSelected(valueSelectedId);
      setFireOnSelectWhenReady(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSelectedId, fireOnSelectWhenReady]);

  return (
    <>
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
        <Button mode="contained" onPress={onPress}>
          Use value
        </Button>
      </View>
    </>
  );
};

export const experiment: Experiment = {
  title: 'Insert or Fetch (explicit)',
  description:
    "Creates a new entry if it doesn't exist and returns the id. This is the foundation for the InsertOrFetch Component.",
  content: InsertOrFetchWrapper,
};
