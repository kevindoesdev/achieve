import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, useTheme } from 'react-native-paper';
import { Provider } from 'react-redux';

import { store } from './store';
import TodoDetails from '../screens/TodoDetailsScreen';
import TodoList from '../screens/TodoListScreen';

const Stack = createStackNavigator();

const APP_TITLE = 'Achieve';

const makeTitle = (subTitle?: string) => {
  if (!subTitle) {
    return APP_TITLE;
  }

  return `${APP_TITLE} - ${subTitle}`;
};

const NavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={TodoList.name}
        options={{ title: makeTitle(TodoList.subTitle) }}
        component={TodoList.screen}
      />
      <Stack.Screen
        name={TodoDetails.name}
        options={{ title: makeTitle(TodoDetails.subTitle) }}
        component={TodoDetails.screen}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const theme = useTheme();

  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar
          style="dark"
          backgroundColor={theme.colors.inversePrimary}
          translucent={false}
        />
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
