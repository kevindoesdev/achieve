import { View } from 'react-native';

import { useAppSelector } from '../app/hooks';
import TopBar from '../components/TopBar';
import TodoList from '../features/todos/TodoList';
import { selectTodos } from '../features/todos/slice';
import { Screens, Screen, ScreenProps } from '../types';

export const TodoListScreen = ({ navigation }: ScreenProps<object>) => {
  const todos = useAppSelector(state => selectTodos(state));

  const onItemPress = (id: string) => {
    navigation.navigate(Screens.TodoDetails, { id });
  };

  return (
    <View>
      <TopBar icon="menu" />
      <TodoList items={todos} onItemPress={onItemPress} />
    </View>
  );
};

const screen: Screen = {
  name: Screens.TodoList,
  subTitle: 'Todo List',
  screen: TodoListScreen,
};

export default screen;
