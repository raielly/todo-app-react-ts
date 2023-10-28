import { TodoTypes } from "../types/todo";
import { FaList, FaListCheck } from "react-icons/fa6";

interface TodoProps {
  todos: TodoTypes[];
  status: string;
  toggleComplete: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoProps> = ({
  todos,
  status,
  toggleComplete,
  removeTodo,
}) => {
  return (
    <>
      {todos.length === 0 ? (
        <li className='text-center'>
          <FaList size={42} className='mx-auto mb-4' />
          <p>There's nothing to do yet.</p>
        </li>
      ) : (
        <>
          {todos
            .filter((todo) => {
              if (status === "all") {
                // Display all todos
                return true;
              } else if (status === "pending") {
                // Display pending todos
                return !todo.completed;
              } else {
                // Display completed todos
                return todo.completed;
              }
            })
            .map((todo) => (
              <li
                key={todo.id}
                className='gap-5 flex justify-between items-center hover:bg-base-200 cursor-pointer'
              >
                <div
                  onClick={() => toggleComplete(todo.id)}
                  className='flex px-2 py-4  flex-1 gap-3 '
                >
                  <input
                    type='checkbox'
                    className='checkbox '
                    checked={todo.completed}
                    readOnly
                  />
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.task}
                  </span>
                </div>
                <button
                  className='btn btn-circle btn-error btn-sm btn-outline mr-3'
                  onClick={() => removeTodo(todo.id)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </li>
            ))}
          {status === "pending" &&
            todos.filter((todo) => !todo.completed).length === 0 && (
              <li className='text-center'>
                <FaList size={42} className='mx-auto mb-4' />
                <p>No pending tasks at the moment.</p>
              </li>
            )}
          {status === "completed" &&
            todos.filter((todo) => todo.completed).length === 0 && (
              <li className='text-center'>
                <FaListCheck size={42} className='mx-auto mb-4' />
                <p> No completed tasks at the moment.</p>
              </li>
            )}
        </>
      )}
    </>
  );
};

export default TodoItem;
