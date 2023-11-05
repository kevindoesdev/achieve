import { ScrollView, StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

import { useAppSelector } from '../app/hooks';
import { getInverseTheme } from '../app/themes';
import TopBar from '../components/TopBar';
import TodoList from '../features/todos/TodoList';
import { selectTodos } from '../features/todos/slice';
import { Screens, Screen, ScreenProps } from '../types';

export const TodoListScreen = ({ navigation }: ScreenProps<object>) => {
  const theme = useTheme();

  const todos = useAppSelector(state => selectTodos(state));

  const onItemPress = (id: string) => {
    navigation.navigate(Screens.TodoDetails, { id });
  };

  const onFABPress = () => {
    navigation.navigate(Screens.TodoDetails, {});
  };

  return (
    <>
      <TopBar icon="menu" />
      <ScrollView>
        <TodoList items={todos} onItemPress={onItemPress} />
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        theme={getInverseTheme(theme)}
        size="large"
        onPress={onFABPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const screen: Screen = {
  name: Screens.TodoList,
  subTitle: 'Todo List',
  screen: TodoListScreen,
};

export default screen;
