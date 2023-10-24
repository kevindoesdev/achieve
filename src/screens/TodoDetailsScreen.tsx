import { View } from 'react-native';

import { useAppSelector } from '../app/hooks';
import TopBar from '../components/TopBar';
import { EditTodo } from '../features/todos/EditTodo';
import { selectTodoById } from '../features/todos/slice';
import { Screens } from '../types';
import type { Id, Screen, ScreenProps } from '../types';

interface TodoDetailsScreenProps {
  id: Id;
}

export const TodoDetailsScreen = ({
  navigation,
  route,
}: ScreenProps<TodoDetailsScreenProps>) => {
  const { id } = route.params;
  const todo = useAppSelector(state => selectTodoById(state, id));

  return (
    <View>
      <TopBar
        icon="keyboard-backspace"
        onPress={() => navigation.navigate(Screens.TodoList)}
      />
      <EditTodo item={todo} />
    </View>
  );
};

const screen: Screen = {
  name: Screens.TodoDetails,
  screen: TodoDetailsScreen,
};

export default screen;
