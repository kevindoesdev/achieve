import { useState } from 'react';
import { View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import TopBar from '../components/TopBar';
import { EditTodo } from '../features/todos/EditTodo';
import { selectTodoById, upsertTodoDelayed } from '../features/todos/slice';
import { Screens } from '../types';
import type { Id, Screen, ScreenProps, Todo } from '../types';
import { different } from '../utils';
import { InsertOrFetch } from '../components/InsertOrFetch';
import { SpinnerMask } from '../components/SpinnerMask';

interface TodoDetailsScreenProps {
  id: Id;
}

export const TodoDetailsScreen = ({
  navigation,
  route,
}: ScreenProps<TodoDetailsScreenProps>) => {
  const { id } = route.params;
  const [maskVisible, setMaskVisible] = useState(false);
  const todo = useAppSelector(state => selectTodoById(state, id));
  const [updatedTodo, setUpdatedTodo] = useState({} as Todo);
  const dispatch = useAppDispatch();

  return (
    <View>
      <TopBar
        icon="keyboard-backspace"
        onPress={async () => {
          if (
            different(todo as any, updatedTodo, {
              emptyStringEqualsUndefined: true,
            })
          ) {
            setMaskVisible(true);
            await dispatch(upsertTodoDelayed(updatedTodo));
            setMaskVisible(false);
          }
          navigation.navigate(Screens.TodoList);
        }}
      />
      <SpinnerMask visible={maskVisible}>
        <EditTodo item={todo} onTodoUpdated={setUpdatedTodo} />
      </SpinnerMask>
    </View>
  );
};

const screen: Screen = {
  name: Screens.TodoDetails,
  screen: TodoDetailsScreen,
};

export default screen;
