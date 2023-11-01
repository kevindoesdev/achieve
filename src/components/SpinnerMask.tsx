import { useEffect, useRef, useState } from 'react';
import { Animated, ColorValue, Easing, View, ViewStyle } from 'react-native';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Portal,
  useTheme,
} from 'react-native-paper';

import { modifyRGBA } from '../utils';

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
