import { View } from 'react-native';

import { Event } from '../../../components/Event';
import { Experiment } from '../types';

const EventListeners = () => {
  return (
    <>
      <Event onActivate={context => console.log('event activated ', context)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Event.Button mode="contained" eventContent={'button-1'}>
            Button 1
          </Event.Button>
          <Event.Button mode="contained" eventContent={'button-2'}>
            Button 2
          </Event.Button>
        </View>
      </Event>
      <Event onActivate={context => console.log('event activated ', context)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 8,
          }}>
          <Event.Button mode="contained" eventContent={'button-3'}>
            Button 3
          </Event.Button>
          <Event.Button mode="contained" eventContent={'button-4'}>
            Button 4
          </Event.Button>
        </View>
      </Event>
    </>
  );
};

export const experiment: Experiment = {
  title: 'Event Listeners',
  description:
    'Uses DeviceEventEmitter (deprecated) to bubble events using a key defined by a Context',
  content: EventListeners,
};
