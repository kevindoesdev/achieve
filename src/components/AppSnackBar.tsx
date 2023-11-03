import { PropsWithChildren, createContext, useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';

export interface AppSnackBarProps {}

export interface AppSnackBarConfig {
  message: string;
  actionText: string;
  onAction: () => void;
}

interface AppSnackBarContextConfig {
  activate: (config: AppSnackBarConfig) => void;
}

export const AppSnackBarContext = createContext({} as AppSnackBarContextConfig);

export const AppSnackBar = ({
  children,
}: PropsWithChildren<AppSnackBarProps>) => {
  const [label, setLabel] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [actionHandler, setActionHandler] = useState(
    null as unknown as Function,
  );

  const appSnackBarContext: AppSnackBarContextConfig = {
    activate: ({ message, actionText, onAction }) => {
      setLabel(actionText);
      setMessage(message);
      setVisible(true);
      setActionHandler(onAction);
    },
  };

  return (
    <AppSnackBarContext.Provider value={appSnackBarContext}>
      {children}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label,
            onPress: async () => {
              if (typeof actionHandler === 'function') {
                await actionHandler();
              }
            },
          }}>
          {message}
        </Snackbar>
      </Portal>
    </AppSnackBarContext.Provider>
  );
};
