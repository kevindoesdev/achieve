import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import {
  Card,
  TextInput,
  Text,
  Chip,
  Portal,
  Dialog,
  Button,
  useTheme,
} from 'react-native-paper';

import { validateTodo } from './validate';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { InsertOrFetch } from '../../components/InsertOrFetch';
import { Id, Todo, IndexOf, ValidationResult, TodoProperty } from '../../types';
import { different } from '../../utils';
import {
  delayedInsertOrFetchTag,
  selectTagById,
  selectTagByValue,
} from '../tags/slice';

export interface EditTodoProps {
  item: Todo;
  onTodoUpdated: (item: Todo) => void;
  validate?: boolean;
}

export const EditTodo = ({
  item,
  onTodoUpdated,
  validate = false,
}: EditTodoProps) => {
  const [label, setLabel] = useState(item.label);
  const [tags, setTags] = useState(item.tags);
  const [notes, setNotes] = useState(item.notes);

  const makeTodo = (): Todo => ({
    id: item.id,
    label,
    tags,
    notes,
  });

  const [updatedTodo, setUpdatedTodo] = useState(makeTodo());

  const [errors, setErrors] = useState({} as IndexOf<string>);

  useEffect(() => {
    const { isValid, errors }: ValidationResult = validate
      ? validateTodo(makeTodo())
      : { isValid: true, errors: [] };

    const validation: IndexOf<string> = {};

    setErrors({});

    if (!isValid) {
      errors.forEach(error => {
        validation[error.property] =
          validation[error.property] || error.message;
      });
    }

    setErrors(validation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validate, label, tags, notes]);

  useEffect(() => {
    const todo = makeTodo();
    if (different(todo, updatedTodo, { emptyStringEqualsUndefined: true })) {
      setUpdatedTodo(todo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, tags, notes]);

  useEffect(() => {
    onTodoUpdated(updatedTodo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedTodo]);

  return (
    <View>
      <InputWrapper error={errors[TodoProperty.Label]}>
        <TextInput
          error={!!errors[TodoProperty.Label]}
          style={style.input}
          label="Label"
          value={label}
          onChangeText={setLabel}
        />
      </InputWrapper>
      <TagList onAddTag={tagId => setTags([...tags, tagId])} tags={tags} />
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
  onAddTag: (id: Id) => void;
}

const TagList = ({ tags, onAddTag }: TagListProps) => {
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
          <AddTagChip onAddTag={onAddTag} />
        </View>
      </Card.Content>
    </Card>
  );
};

interface TagProps {
  id: Id;
}

interface InputWrapperProps {
  error: string;
}

const InputWrapper = ({
  error,
  children,
}: PropsWithChildren<InputWrapperProps>) => {
  const theme = useTheme();

  return (
    <>
      {children}
      {error ? (
        <Text
          variant="labelLarge"
          style={{ marginLeft: 16, color: theme.colors.error }}>
          {error}
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

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

interface AddChipProps {
  onAddTag: (id: Id) => void;
}

const AddTagChip = ({ onAddTag }: AddChipProps) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [tag, setTag] = useState('');
  const inputRef = useRef<RNTextInput>(null);
  const dispatch = useAppDispatch();

  const tagIdSelector = (tag: string) => (state: RootState) =>
    selectTagByValue(state, tag)?.id;

  const onTagSelected = (tagId: string) => {
    onAddTag(tagId);
    hideDialog();
  };

  const showDialog = () => {
    setDialogVisible(true);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const hideDialog = () => {
    setTag('');
    setDialogVisible(false);
  };

  const addTag = async (text: string) => {
    if (!text) {
      return false;
    }

    await dispatch(delayedInsertOrFetchTag(tag));
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
          <InsertOrFetch selector={tagIdSelector(tag)} onReady={onTagSelected}>
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
              <InsertOrFetch.Button onPress={() => addTag(tag)}>
                Ok
              </InsertOrFetch.Button>
            </Dialog.Actions>
          </InsertOrFetch>
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
