import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme, IconButton, Button } from 'react-native-paper';

interface TopBarProps {
  icon: string;
  onIconPress?: () => void;
  showAction?: boolean;
  actionText?: string;
  onAction?: () => void;
}

const TopBar = ({
  icon,
  onIconPress = () => {},
  showAction,
  actionText = '',
  onAction = () => {},
}: TopBarProps) => {
  const [actionVisible, setActionVisible] = useState(
    showAction === undefined ? actionText.length > 0 : showAction,
  );

  useEffect(() => {
    setActionVisible(
      showAction === undefined ? actionText.length > 0 : showAction,
    );
  }, [showAction, actionText]);

  const theme = useTheme();

  return (
    <View
      style={{
        height: 48,
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <IconButton
        icon={icon}
        size={24}
        iconColor={theme.colors.inversePrimary}
        onPress={onIconPress}
      />
      {actionVisible ? (
        <View style={{ paddingTop: 4, paddingRight: 8 }}>
          <Button mode="elevated" onPress={onAction}>
            {actionText}
          </Button>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

TopBar.defaultProps = { onPress: () => {} };

export default TopBar;
