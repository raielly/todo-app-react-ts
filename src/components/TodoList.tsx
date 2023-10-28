import { TodoTypes } from '../types/todo'
import TodoItem from './TodoItem'

interface TodoProps {
  todos: TodoTypes[],
  status: string,
  toggleComplete: (id: string) => void,
  removeTodo: (id: string) => void
}

const TodoList: React.FC<TodoProps> = ({todos, status, toggleComplete, removeTodo}) => {

  return (
    <ul className='divide-y divide-dashed divide-gray-700'>
      <TodoItem
       todos={todos} 
       status={status}
       toggleComplete={toggleComplete}
       removeTodo={removeTodo}
      />
    
  </ul>
  )
}

export default TodoList