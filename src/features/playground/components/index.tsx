import { experiment as EventListeners } from './EventListeners';
import { experiment as WrapperListeners } from './WrapperListeners';

export const bench = {
  title: 'Components',
  experiments: [EventListeners, WrapperListeners],
};
