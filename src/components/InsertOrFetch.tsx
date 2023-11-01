import { PropsWithChildren, useState, useEffect } from 'react';
import { GestureResponderEvent } from 'react-native';
import { ButtonProps } from 'react-native-paper';

import { Event, EventContext } from './Event';
import { SpinnerMask } from './SpinnerMask';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export interface InsertOrFetchProps {
  ignoreNull?: boolean;
  selector: (state: RootState) => any;
  onReady: (value: any) => void;
}

export enum InsertOrFetchEvents {
  Activate = 'activate',
  Deactivate = 'deactivate',
}

export const InsertOrFetch = ({
  ignoreNull = true,
  selector,
  onReady = () => {},
  children,
}: PropsWithChildren<InsertOrFetchProps>) => {
  const selectedValue = useAppSelector(selector);
  const [readyToFire, setReadyToFire] = useState(false);
  const [showMask, setShowMask] = useState(false);

  useEffect(() => {
    if (readyToFire) {
      setShowMask(true);
    }

    if (selectedValue == null && ignoreNull) {
      return;
    }

    if (readyToFire) {
      setReadyToFire(false);
      onReady(selectedValue);
      setShowMask(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, readyToFire, ignoreNull]);

  const onEvent = ({ event }: EventContext) => {
    if (event === InsertOrFetchEvents.Activate) {
      setReadyToFire(true);
    } else {
      setReadyToFire(false);
    }
  };

  return (
    <Event onEvent={onEvent}>
      <SpinnerMask visible={showMask}>{children}</SpinnerMask>
    </Event>
  );
};

export interface InsertOrFetchButtonProps extends ButtonProps {
  event: InsertOrFetchEvents;
  onPress?:
    | ((e: GestureResponderEvent) => (boolean | void) | Promise<boolean | void>)
    | (() => (boolean | void) | Promise<boolean | void>);
}

const InsertOrFetchButton = (props: InsertOrFetchButtonProps) => {
  return <Event.Button {...props} />;
};

InsertOrFetch.Button = InsertOrFetchButton;
