import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppSnackBarContext } from '../components/AppSnackBar';
import { SpinnerMask } from '../components/SpinnerMask';
import TopBar from '../components/TopBar';
import { EditTodo } from '../features/todos/EditTodo';
import { selectTodoById, upsertTodoDelayed } from '../features/todos/slice';
import { Screens } from '../types';
import type { Id, Screen, ScreenProps, Todo } from '../types';
import { different } from '../utils';

interface TodoDetailsScreenProps {
  id: Id;
}

export const TodoDetailsScreen = ({
  navigation,
  route,
}: ScreenProps<TodoDetailsScreenProps>) => {
  const { id } = route.params;
  const appSnackBar = useContext(AppSnackBarContext);
  const [showSave, setShowSave] = useState(false);
  const [maskVisible, setMaskVisible] = useState(false);

  const todo = useAppSelector(state => selectTodoById(state, id));
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!showSave && todoHasChanges()) {
      setShowSave(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedTodo]);

  const todoHasChanges = () =>
    different(todo, updatedTodo, {
      emptyStringEqualsUndefined: true,
    });

  const goBack = () => navigation.navigate(Screens.TodoList);

  const saveTodo = async () => {
    if (todoHasChanges()) {
      setMaskVisible(true);
      await dispatch(upsertTodoDelayed(updatedTodo));
      setMaskVisible(false);
    }

    goBack();
  };

  const onBackWithoutSave = () => {
    appSnackBar.activate({
      message: 'i wonder if this will work',
      actionText: 'Save',
      onAction: saveTodo,
    });

    goBack();
  };

  return (
    <View>
      <TopBar
        icon="keyboard-backspace"
        onIconPress={onBackWithoutSave}
        actionText="Save"
        showAction={showSave}
        onAction={async () => {
          await saveTodo();
          goBack();
        }}
      />
      <ScrollView>
        <SpinnerMask visible={maskVisible}>
          <EditTodo item={todo} onTodoUpdated={setUpdatedTodo} />
        </SpinnerMask>
      </ScrollView>
    </View>
  );
};

const screen: Screen = {
  name: Screens.TodoDetails,
  screen: TodoDetailsScreen,
};

export default screen;
