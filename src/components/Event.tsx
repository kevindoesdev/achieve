import { nanoid } from '@reduxjs/toolkit';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  GestureResponderEvent,
} from 'react-native';
import { Button } from 'react-native-paper';
import type { Props as ButtonProps } from 'react-native-paper/lib/typescript/components/Button/Button';

export interface EventContext {
  event?: string;
  payload: any;
}

export interface EventProps {
  onEvent: (context: EventContext) => void;
}

const EventNameContext = createContext('');

export const Event = ({
  children,
  onEvent,
}: React.PropsWithChildren<EventProps>) => {
  const [eventName] = useState(`event-context-${nanoid()}`);
  const [listener, setListener] = useState(
    null as unknown as EmitterSubscription,
  );

  // on mount
  useEffect(() => {
    setListener(
      DeviceEventEmitter.addListener(eventName, data => onEvent?.(data)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // componentWillUnmount
    return () => {
      listener?.remove();
    };
  }, [listener]);

  return (
    <EventNameContext.Provider value={eventName}>
      {children}
    </EventNameContext.Provider>
  );
};

export interface EventButtonProps extends ButtonProps {
  event?: string;
  payload: any;
  onPress?: (e: GestureResponderEvent) => boolean | null | undefined;
}

const EventButton = (props: EventButtonProps) => {
  const eventName = useContext(EventNameContext);

  const context: EventContext = {
    event: props.event || 'default',
    payload: props.payload,
  };

  const onPress = (e: GestureResponderEvent) => {
    if (props?.onPress?.(e) === false) {
      return;
    }

    DeviceEventEmitter.emit(eventName, context);
  };

  return <Button {...props} onPress={onPress} />;
};

Event.Button = EventButton;
