import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppSnackBarContext } from '../components/AppSnackBar';
import { SpinnerMask } from '../components/SpinnerMask';
import TopBar from '../components/TopBar';
import { EditTodo } from '../features/todos/EditTodo';
import {
  makeNewTodo,
  selectTodoById,
  upsertTodoDelayed,
} from '../features/todos/slice';
import { Screens } from '../types';
import type { Id, Screen, ScreenProps, Todo } from '../types';
import { different } from '../utils';

interface TodoDetailsScreenProps {
  id?: Id;
}

export const TodoDetailsScreen = ({
  navigation,
  route,
}: ScreenProps<TodoDetailsScreenProps>) => {
  const appSnackBar = useContext(AppSnackBarContext);
  const [showSave, setShowSave] = useState(false);
  const [maskVisible, setMaskVisible] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({} as Todo);

  const dispatch = useAppDispatch();

  const goBack = () => navigation.navigate(Screens.TodoList);

  const saveTodo = async () => {
    if (showSave) {
      setMaskVisible(true);
      await dispatch(upsertTodoDelayed(updatedTodo));
      setMaskVisible(false);
    }

    goBack();
  };

  const onBackWithoutSave = () => {
    if (showSave) {
      appSnackBar.activate({
        message: 'Your changes were not saved',
        actionText: 'Save them now',
        onAction: () => dispatch(upsertTodoDelayed(updatedTodo)),
      });
    }

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
          {route.params.id ? (
            <EditTodoWrapper
              id={route.params.id}
              onShowSave={() => setShowSave(true)}
              onTodoUpdated={setUpdatedTodo}
            />
          ) : (
            <NewTodo
              onShowSave={() => setShowSave(true)}
              onTodoUpdated={setUpdatedTodo}
            />
          )}
        </SpinnerMask>
      </ScrollView>
    </View>
  );
};

interface CommonEditProps {
  onShowSave: () => void;
  onTodoUpdated: (todo: Todo) => void;
}

interface EditTodoWrapperProps extends CommonEditProps {
  id: Id;
}

const EditTodoWrapper = ({
  id,
  onShowSave,
  onTodoUpdated,
}: EditTodoWrapperProps) => {
  const todo = useAppSelector(state => selectTodoById(state, id));
  const [updatedTodo, setUpdatedTodo] = useState(todo);
  const [onSaveFired, setOnSaveFired] = useState(false);

  const todoHasChanges = () =>
    different(todo, updatedTodo, {
      emptyStringEqualsUndefined: true,
    });

  useEffect(() => {
    if (!onSaveFired && todoHasChanges()) {
      setOnSaveFired(true);
      onShowSave();
    }

    onTodoUpdated(updatedTodo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedTodo]);

  return <EditTodo item={todo} onTodoUpdated={setUpdatedTodo} />;
};

interface NewTodoProps extends CommonEditProps {}

const NewTodo = ({ onShowSave, onTodoUpdated }: NewTodoProps) => {
  const [todo] = useState(makeNewTodo()); //useAppSelector(() => makeNewTodo());
  const [initComplete, setInitComplete] = useState(false);

  if (!initComplete) {
    setTimeout(() => {
      onShowSave();
    }, 1);
    setInitComplete(true);
  }

  return <EditTodo item={todo} onTodoUpdated={onTodoUpdated} />;
};

const screen: Screen = {
  name: Screens.TodoDetails,
  screen: TodoDetailsScreen,
};

export default screen;
