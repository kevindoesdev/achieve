import { useRef, useState } from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import {
  Card,
  TextInput,
  Text,
  Chip,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper';

import { useAppSelector } from '../../app/hooks';
import { Id, Todo } from '../../types';
import { selectTagById } from '../tags/slice';

interface Props {
  item: Todo;
}

export const EditTodo = ({ item }: Props) => {
  const [label, setLabel] = useState(item.label);
  const [notes, setNotes] = useState('');

  return (
    <View>
      <TextInput
        style={style.input}
        label="Label"
        value={label}
        onChangeText={setLabel}
      />
      <TagList tags={item.tags} />
      <TextInput
        style={style.input}
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline={true}
        numberOfLines={8}
      />
    </View>
  );
};

interface TagListProps {
  tags: Id[];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <Card mode="contained" style={[style.input, style.card]}>
      <Card.Content style={style.cardContentTitle}>
        <Text variant="labelMedium">Tags</Text>
      </Card.Content>
      <Card.Content>
        <View style={{ flexDirection: 'row' }}>
          {tags.map(tag => (
            <Tag key={tag} id={tag} />
          ))}
          <AddChip />
        </View>
      </Card.Content>
    </Card>
  );
};

interface TagProps {
  id: Id;
}

const Tag = ({ id }: TagProps) => {
  const tag = useAppSelector(state => selectTagById(state, id));

  return (
    <CommonChip
      value={tag.label}
      onClose={() => {
        console.log('close');
      }}
    />
  );
};

interface MyChipProps {
  onClose?: () => void;
  onPress?: () => void;
  icon?: string;
  value: string;
}

const CommonChip = (props: MyChipProps) => (
  <Chip
    {...props}
    style={{ marginRight: 4 }}
    compact={true}
    elevated={true}
    mode="outlined">
    {props.value}
  </Chip>
);

const AddChip = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [tag, setTag] = useState('');
  const inputRef = useRef<RNTextInput>(null);

  const showDialog = () => {
    setDialogVisible(true);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const hideDialog = () => {
    setTag('');
    setDialogVisible(false);
  };
  const addTag = (text: string) => {
    // dispatch upsert tag
    console.log('Setting tag', text);
    hideDialog();
  };

  return (
    <>
      <CommonChip
        icon="plus-circle"
        value="Add new tag..."
        onPress={showDialog}
      />
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">Enter a tag name</Text>
            <TextInput
              ref={inputRef}
              dense={true}
              value={tag}
              onChangeText={setTag}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={() => addTag(tag)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const style = StyleSheet.create({
  input: {
    margin: 8,
    borderRadius: 4,
  },
  card: {
    borderBottomColor: 'rgb(28, 27, 31)',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
  },
  cardContentTitle: {
    paddingTop: 8,
    marginBottom: 4,
  },
});
