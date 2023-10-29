import { nanoid } from '@reduxjs/toolkit';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  GestureResponderEvent,
} from 'react-native';
import { Button } from 'react-native-paper';
import type { Props as ButtonProps } from 'react-native-paper/lib/typescript/components/Button/Button';

export interface EventProps {
  onActivate: (context?: any) => void;
}

export const Event = ({
  children,
  onActivate,
}: React.PropsWithChildren<EventProps>) => {
  const [eventName] = useState(`event-context-${nanoid()}`);
  const [listener, setListener] = useState(
    null as unknown as EmitterSubscription,
  );

  // on mount
  useEffect(() => {
    setListener(
      DeviceEventEmitter.addListener(eventName, data => {
        if (data.type === 'activate' && onActivate) {
          onActivate(data.context);
        }
      }),
    );
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
  eventContent?: any;
}

const EventButton = (props: EventButtonProps) => {
  const eventName = useContext(EventNameContext);

  const onPress = (e: GestureResponderEvent) => {
    DeviceEventEmitter.emit(eventName, {
      type: 'activate',
      context: props.eventContent,
    });

    if (props?.onPress) {
      props.onPress(e);
    }
  };

  return <Button {...props} onPress={onPress} />;
};

Event.Button = EventButton;

const EventNameContext = createContext('');
