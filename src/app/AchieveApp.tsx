import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import { store } from './store';
import * as themes from './themes';
import { AppSnackBar } from '../components/AppSnackBar';
import Playground from '../screens/PlaygroundScreen';
import TodoDetails from '../screens/TodoDetailsScreen';
import TodoList from '../screens/TodoListScreen';
import { Screen } from '../types';

const Stack = createStackNavigator();

const APP_TITLE = 'Achieve';

const displayOrder: Screen[] = [
  // Adding a line to ensure that it's easy for me to adjust screen order
  TodoList,
  TodoDetails,
  Playground,
];

const makeTitle = (subTitle?: string) => {
  if (!subTitle) {
    return APP_TITLE;
  }

  return `${APP_TITLE} - ${subTitle}`;
};

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
  const theme = themes.conservation.light;

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar
          style="dark"
          backgroundColor={theme.colors.inversePrimary}
          translucent={false}
        />
        <AppSnackBar>
          <NavigationContainer>
            <NavigationStack />
          </NavigationContainer>
        </AppSnackBar>
      </PaperProvider>
    </Provider>
  );
}
