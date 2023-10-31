import { useRef, useState } from 'react';
import { View } from 'react-native';
import { Button, Portal, Text, TextInput, useTheme } from 'react-native-paper';

import { Spacer } from '../Spacer';
import { Experiment } from '../types';

const SpinnerMaskExperiment = () => {
  const theme = useTheme();
  const [time, setTime] = useState(5000 as number | string);
  const [maskVisible, setMaskVisible] = useState(false);

  const onShowMask = async () => {
    setMaskVisible(true);
    await new Promise(r => setTimeout(r, typeof time === 'number' ? time : 0));
    setMaskVisible(false);
  };

  return (
    <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
      <SpinnerMask visible={maskVisible}>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dotted',
            borderColor: theme.colors.primary,
            padding: 8,
          }}>
          <Text variant="bodyMedium">
            Enter a number of milliseconds to show the mask
          </Text>
          <Spacer />
          <TextInput
            label="Milliseconds"
            value={String(time)}
            onChangeText={text => setTime(text ? parseInt(text, 10) | 0 : '')}
          />
          <Spacer />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button onPress={onShowMask} mode="contained">
              Show Spinner Mask
            </Button>
          </View>
        </View>
      </SpinnerMask>
    </View>
  );
};

export interface SpinnerMaskProps {
  visible: boolean;
}

export const SpinnerMask = ({
  visible,
  children,
}: React.PropsWithChildren<SpinnerMaskProps>) => {
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [daRef, setDaRef] = useState(null as unknown as View | null);

  //const ref = useRef(null);
  return (
    <>
      <Portal>
        {visible ? (
          <View
            style={{
              left: layout.x + 2,
              top: layout.y + 2,
              width: layout.width - 4,
              height: layout.height - 4,
              backgroundColor: 'red',
            }}></View>
        ) : (
          <></>
        )}
      </Portal>
      <View
        ref={ref => {
          setDaRef(ref);
        }}
        onLayout={event => {
          daRef?.measure((_, __, width, height, x, y) => {
            setLayout({ x, y, width, height });
          });
        }}>
        {children}
      </View>
    </>
  );
};

export const experiment: Experiment = {
  title: 'Spinner Mask',
  description: 'Places a mask with a spinner over child components',
  content: SpinnerMaskExperiment,
};
