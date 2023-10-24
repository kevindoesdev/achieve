import { View, StyleSheet, Platform, Pressable } from "react-native";
import { IconButton, Text, Chip } from "react-native-paper";
import { Id, Todo } from "../../types";
import { selectTagById } from '../tags/slice'
import { notEmpty } from "../../utils";
import { useAppSelector } from "../../app/hooks";

interface TodoListItemProps {
  item: Todo,
  onItemPress: (id: Id) => void
}

const TodoListItem = ({ item, onItemPress }: TodoListItemProps) => {
  const labelOnly = !item.tags.length;

  return (
    <View key={item.id} style={styles.container}>
      <IconButton icon="checkbox-blank-outline" size={24} />
      <Pressable onPress={() => {
        onItemPress(item.id)}}>
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
  item: Todo
}

const Composite = ({ item }: CompositeProps) => {
  
  const tags = useAppSelector((state) => {
    return item.tags.map(tagId => selectTagById(state, tagId)).filter(notEmpty)
  })
  
  return (
    <View>
      <Text style={{}} variant="titleMedium">
        {item.label}
      </Text>
      <View style={{ flexDirection: "row" }}>
        {tags.map((tag) => (
          <Chip
            key={tag.label}
            style={{ marginHorizontal: 4 }}
            compact={true}
            elevated={true}
          >
            {tag.label}
          </Chip>
        ))}
      </View>
    </View>
  );
};

interface LabelOnlyProps {
  label: string
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
    flexDirection: "row",
    marginTop: 16,
    borderBottomColor: "grey",
    borderStyle: "dotted",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  labelOnlyTextContainer: Object.assign(
    {
      flexDirection: "column",
      flex: 1,
    },
    Platform.OS === "web" ? { paddingTop: 14 } : {}
  ),
  labelOnlyText: { flex: 1, verticalAlign: "middle" },
} as any);

export default TodoListItem;
