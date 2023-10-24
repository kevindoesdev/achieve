import TodoListItem from './TodoListItem';
import type { Id, Todo } from '../../types';

interface Props {
  items: Todo[];
  onItemPress?: (id: Id) => void;
}

export default ({ items, onItemPress }: Props) => {
  return (
    <>
      {items.map(item => (
        <TodoListItem key={item.id} item={item} onItemPress={onItemPress} />
      ))}
    </>
  );
};
