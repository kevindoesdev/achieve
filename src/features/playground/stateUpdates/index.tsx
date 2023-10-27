import { experiment as insertOrFetch } from './InsertOrFetch';
import { experiment as sequencedUseStateUpdate } from './SequencedUseStateUpdate';

export const bench = {
  title: 'State Updates',
  experiments: [insertOrFetch, sequencedUseStateUpdate],
};
