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
  const [size, setSize] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [daRef, setDaRef] = useState(null as unknown as View | null);

  const updateSize = () => {
    daRef?.measure((_, __, width, height) => {
      setSize({ left: 0, top: 0, width, height });
    });
  };

  useEffect(() => {
    clearTimeout(delayTimeout);
    setVisibleDelayed(false);

    if (visible) {
      // eslint-disable-next-line no-new
      new Promise(r => {
        setDelayTimeout(setTimeout(r, delay));
      }).then(() => {
        fadeIn.resetAnimation();
        updateSize();
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
    <View>
      <Portal.Host>
        <Portal>
          {visibleDelayed ? (
            <Animated.View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                ...maskStyle,
                ...size,
                opacity: fadeIn,
                backgroundColor:
                  maskStyle.backgroundColor || useBackgroundColor,
              }}>
              <ActivityIndicator
                animating={true}
                size={Math.min(size.width, size.height) * 0.3}
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
          onLayout={updateSize}>
          {children}
        </View>
      </Portal.Host>
    </View>
  );
};
