import { Event, EventContext } from '../../../components/Event';
import { Divider } from '../Divider';
import { Spacer } from '../Spacer';
import { Experiment } from '../types';

const EventListeners = () => {
  const onEvent = ({ event, payload }: EventContext) =>
    console.log(`Event fired (${event}): ${payload}`);

  return (
    <>
      <Event onEvent={onEvent}>
        <Event.Button mode="contained" event="activate" payload={'Activated!'}>
          Event 1 - Activate Event
        </Event.Button>
        <Spacer />
        <Event.Button mode="contained" event="cancel" payload={'Cancelled'}>
          Event 1 - Cancel Event
        </Event.Button>
      </Event>
      <Divider />
      <Event onEvent={onEvent}>
        <Event.Button mode="contained" payload={'You pressed the button!'}>
          Event 2 - Default Event
        </Event.Button>
      </Event>
    </>
  );
};

export const experiment: Experiment = {
  title: 'Event Listeners',
  description:
    'Uses the project Event Component to fire events through to a common event handler',
  content: EventListeners,
};
