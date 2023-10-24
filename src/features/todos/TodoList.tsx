import { View } from 'react-native'
import type { Id, Todo } from '../../types'
import TodoListItem from './TodoListItem'

interface Props {
  items: Array<Todo>
  onItemPress?: (id: Id) => void
}

export default ({ items, onItemPress }: Props) => {
  const aaa = items.map(item => item)
  return (
    <>
      {items.map((item) => (
        <TodoListItem key={item.id} item={item} onItemPress={onItemPress} />
      ))}
    </>
  )
}