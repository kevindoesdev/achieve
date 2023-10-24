import { View } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';

const TopBar = ({ icon, onPress }: { icon: string; onPress: () => void }) => {
  const theme = useTheme();

  return (
    <View style={{ height: 48, backgroundColor: theme.colors.primary }}>
      <IconButton
        icon={icon}
        size={24}
        iconColor={theme.colors.inversePrimary}
        onPress={onPress}
      />
    </View>
  );
};

TopBar.defaultProps = { onPress: () => {} };

export default TopBar;
