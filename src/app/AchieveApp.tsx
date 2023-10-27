import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, useTheme } from 'react-native-paper';
import { Provider } from 'react-redux';

import { store } from './store';
import Playground from '../screens/PlaygroundScreen';
import TodoDetails from '../screens/TodoDetailsScreen';
import TodoList from '../screens/TodoListScreen';
import { Screen } from '../types';

const Stack = createStackNavigator();

const APP_TITLE = 'Achieve';

const makeTitle = (subTitle?: string) => {
  if (!subTitle) {
    return APP_TITLE;
  }

  return `${APP_TITLE} - ${subTitle}`;
};

// prettier-ignore
const displayOrder: Screen[] = [
  Playground, 
  TodoList, 
  TodoDetails
];

const NavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {displayOrder.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          options={{ title: makeTitle(screen.subTitle) }}
          component={screen.screen}
        />
      ))}
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
