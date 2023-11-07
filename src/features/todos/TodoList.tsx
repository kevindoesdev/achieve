import TodoListItem from './TodoListItem';
import type { Id, Todo } from '../../types';

interface Props {
  items: Todo[];
  onEdit: (id: Id) => void;
}

export default ({ items, onEdit }: Props) => {
  return (
    <>
      {items.map(item => (
        <TodoListItem key={item.id} item={item} onEdit={onEdit} />
      ))}
    </>
  );
};
