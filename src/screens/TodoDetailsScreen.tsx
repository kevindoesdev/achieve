import { View } from 'react-native';
import { Screens } from '../types'
import type { Id, Screen, ScreenProps } from '../types';
import { selectTodoById } from '../features/todos/slice';
import { EditTodo } from '../features/todos/EditTodo'
import TopBar from '../components/TopBar';
import { useAppSelector } from '../app/hooks';

interface TodoDetailsScreenProps {
  id: Id
}


export const TodoDetailsScreen = ({navigation, route}: ScreenProps<TodoDetailsScreenProps>) => {
  const { id } = route.params;
  const todo = useAppSelector((state) => selectTodoById(state, id))
  
  return (
    <View>
      <TopBar
        icon="keyboard-backspace"
        onPress={() => navigation.navigate(Screens.TodoList)}
      />
      <EditTodo item={todo} />
    </View>
  )
}

const screen: Screen = {
  name: Screens.TodoDetails,
  screen: TodoDetailsScreen
}

export default screen;