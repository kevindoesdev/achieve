import { View, StyleSheet, Platform, Pressable } from 'react-native';
import { IconButton, Text, Chip } from 'react-native-paper';

import { useAppSelector } from '../../app/hooks';
import { Id, Todo } from '../../types';
import { notEmpty } from '../../utils';
import { selectTagById } from '../tags/slice';
import { useEffect, useState } from 'react';

interface TodoListItemProps {
  item: Todo;
  onEdit: (id: Id) => void;
}

enum ActionIcon {
  OpenDrawer = 'chevron-down',
  Edit = 'square-edit-outline',
}

const TodoListItem = ({ item, onEdit }: TodoListItemProps) => {
  const labelOnly = !item.tags.length;

  const [primaryIcon, setPrimaryIcon] = useState(ActionIcon.OpenDrawer);
  const [pressing, setPressing] = useState(false);
  const [pressingTimeout, setPressingTimeout] = useState(
    null as unknown as NodeJS.Timeout,
  );

  useEffect(() => {
    clearTimeout(pressingTimeout);
    if (pressing) {
      const timeout = setTimeout(() => {
        setPrimaryIcon(ActionIcon.Edit);
      }, 100);

      setPressingTimeout(timeout);
    } else {
      setPrimaryIcon(ActionIcon.OpenDrawer);
    }
  }, [pressing]);

  return (
    <View key={item.id} style={styles.container}>
      <IconButton
        icon={primaryIcon}
        size={36}
        style={{ marginTop: 8 }}
        onPressIn={() => {
          setPressing(true);
        }}
        onPressOut={() => {
          setPressing(false);
        }}
        onLongPress={() => {
          onEdit(item.id);
        }}
      />
      <Pressable
        style={{ width: '100%', paddingVertical: 16 }}
        onPress={() => {}}>
        {labelOnly ? (
          <LabelOnly label={item.label} />
        ) : (
          <Composite item={item} />
        )}
      </Pressable>
    </View>
  );
};

TodoListItem.defaultProps = { onItemPress: () => {} };

interface CompositeProps {
  item: Todo;
}

const Composite = ({ item }: CompositeProps) => {
  const tags = useAppSelector(state => {
    return item.tags.map(tagId => selectTagById(state, tagId)).filter(notEmpty);
  });

  return (
    <View>
      <Text style={{}} variant="titleMedium">
        {item.label}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {tags.map(tag => (
          <Chip
            key={tag.label}
            style={{ marginHorizontal: 4 }}
            mode="outlined"
            compact={true}
            elevated={true}>
            {tag.label}
          </Chip>
        ))}
      </View>
    </View>
  );
};

interface LabelOnlyProps {
  label: string;
}

const LabelOnly = ({ label }: LabelOnlyProps) => (
  <View style={styles.labelOnlyTextContainer}>
    <Text style={styles.labelOnlyText} variant="titleMedium">
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //marginTop: 16,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',
    borderBottomWidth: 1,
    //paddingBottom: 16,
  },
  labelOnlyTextContainer: Object.assign({
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 8,
  }),
  labelOnlyText: { flex: 1, verticalAlign: 'middle' },
} as any);

export default TodoListItem;
