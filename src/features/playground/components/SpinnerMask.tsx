import { useEffect, useRef, useState } from 'react';
import { Animated, ColorValue, Easing, View, ViewStyle } from 'react-native';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Button,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { Spacer } from '../Spacer';
import { Experiment } from '../types';

const SpinnerMaskExperiment = () => {
  const theme = useTheme();
  const [time, setTime] = useState('5000');
  const [maskVisible, setMaskVisible] = useState(false);

  const onShowMask = async () => {
    setMaskVisible(true);
    await new Promise(r => setTimeout(r, parseInt(time, 10)));
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
            //onChangeText={text => setTime(text ? parseInt(text, 10) | 0 : '')}
            onChangeText={text => setTime(text.replace(/[^0-9]/g, ''))}
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

const rgbaMatcher = /^rgba\(([0-9.]+), ([0-9.]+), ([0-9.]+), ([0-9.]+)\)$/;
export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type RGBAPropertyModifier = number | ((original: number) => number);

export interface RGBAModifier {
  r?: RGBAPropertyModifier;
  g?: RGBAPropertyModifier;
  b?: RGBAPropertyModifier;
  a?: RGBAPropertyModifier;
}

export const modifyRGBA = (
  original: string,
  { r, g, b, a }: RGBAModifier,
): string => {
  if (!rgbaMatcher.test(original)) {
    return original;
  }

  const applyModifier = (
    original: string,
    modifier: RGBAPropertyModifier | undefined,
  ) => {
    if (modifier == null) {
      return original;
    }

    if (typeof modifier === 'number') {
      return modifier;
    }

    const num = parseFloat(original);
    return modifier(num);
  };

  return original.replace(rgbaMatcher, (_, _r, _g, _b, _a) => {
    return [
      'rgba(',
      applyModifier(_r, r),
      ', ',
      applyModifier(_g, g),
      ', ',
      applyModifier(_b, b),
      ', ',
      applyModifier(_a, a),
      ')',
    ].join('');
  });
};

export interface SpinnerMaskProps {
  visible: boolean;
  delay?: number;
  fadeInDuration?: number;
  backgroundColor?: ColorValue;
  maskStyle?: ViewStyle;
  activityIndicator?: ActivityIndicatorProps;
}

export const SpinnerMask = ({
  visible,
  delay = 0,
  fadeInDuration = 500,
  backgroundColor,
  maskStyle = {},
  activityIndicator = {},
  children,
}: React.PropsWithChildren<SpinnerMaskProps>) => {
  const [visibleDelayed, setVisibleDelayed] = useState(false);
  const [delayTimeout, setDelayTimeout] = useState(
    null as unknown as NodeJS.Timeout,
  );
  const [layout, setLayout] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [daRef, setDaRef] = useState(null as unknown as View | null);

  useEffect(() => {
    clearTimeout(delayTimeout);
    setVisibleDelayed(false);

    if (visible) {
      // eslint-disable-next-line no-new
      new Promise(r => {
        setDelayTimeout(setTimeout(r, delay));
      }).then(() => {
        fadeIn.resetAnimation();
        setVisibleDelayed(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, visible]);

  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: fadeInDuration,
      useNativeDriver: true,
      easing: Easing.in(Easing.cubic),
    }).start();
  }, [visibleDelayed, fadeIn, fadeInDuration]);

  const theme = useTheme();

  const useBackgroundColor =
    backgroundColor == null
      ? modifyRGBA(theme.colors.surfaceVariant, { a: 0.6 })
      : backgroundColor;

  return (
    <>
      <Portal>
        {visibleDelayed ? (
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              ...maskStyle,
              ...layout,
              opacity: fadeIn,
              backgroundColor: maskStyle.backgroundColor || useBackgroundColor,
            }}>
            <ActivityIndicator
              animating={true}
              size={layout.height * 0.4}
              {...activityIndicator}
            />
          </Animated.View>
        ) : (
          <></>
        )}
      </Portal>
      <View
        ref={ref => {
          setDaRef(ref);
        }}
        onLayout={() => {
          daRef?.measure((_, __, width, height, x, y) => {
            setLayout({ left: x, top: y, width, height });
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
