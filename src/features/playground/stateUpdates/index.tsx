import { experiment as InsertOrFetchComponent } from './InsertOrFetchComponent';
import { experiment as InsertOrFetchExplicit } from './InsertOrFetchExplicit';
import { experiment as SequencedUseStateUpdate } from './SequencedUseStateUpdate';

export const bench = {
  title: 'State Updates',
  experiments: [
    InsertOrFetchComponent,
    InsertOrFetchExplicit,
    SequencedUseStateUpdate,
  ],
};
