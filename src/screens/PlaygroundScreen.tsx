import TopBar from '../components/TopBar';
import Playground from '../features/playground';
import { Screens, Screen, ScreenProps } from '../types';

export const PlaygroundScreen = ({ navigation }: ScreenProps<object>) => (
  <>
    <TopBar
      icon="keyboard-backspace"
      onIconPress={() => navigation.navigate(Screens.TodoList)}
    />
    <Playground />
  </>
);

const screen: Screen = {
  name: Screens.Playground,
  subTitle: 'Playground',
  screen: PlaygroundScreen,
};

export default screen;
