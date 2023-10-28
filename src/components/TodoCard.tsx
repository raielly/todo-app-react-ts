import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import { TodoTypes } from "../types/todo";


const LOCAL_STORAGE_KEY = "todo-list";

const TodoCard: React.FC = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(() => {
    // get todo items when component mounts
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed || [];
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
    }
    return [];
  });
  const [todo, setTodo] = useState<TodoTypes>({
    id: uuidv4(),
    task: "",
    completed: false,
    status: "pending",
  });
  const [status, setStatus] = useState<string>("all");

  useEffect(() => {
    // fires when todos array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // return if input field is empty
      if (todo.task.trim() === "") return alert("Please add a todo item");

      // update todo state
      setTodo({
        ...todo,
        id: uuidv4(),
        task: "",
      });

      // insert new state
      setTodos([todo, ...todos]);
    }
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          status: todo.status === "pending" ? "completed" : "pending",
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = (id: string) => {
    if (window.confirm("Remove todo?")) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  const removeAllTodo = () => {
    if (window.confirm("Do you really want to clear all todos?")) {
      setTodos([]);
      setStatus("all");
    }
  };

  return (
    <div className='card max-w-[500px] bg-base-100 shadow-xl mx-auto'>
      <div className='card-body'>
        <input
          type='text'
          placeholder='Enter to add todo item'
          className='input input-bordered w-full'
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
          onKeyDown={(e) => addTodo(e)}
        />
        <div className='mt-4 space-x-2'>
          <button
            className={`${
              status !== "all" ? "btn-ghost" : "btn-info"
            } btn btn-sm normal-case`}
            onClick={() => setStatus("all")}
          >
            All
          </button>
          <button
            className={`${
              status !== "pending" ? "btn-ghost" : "btn-warning"
            } btn btn-sm normal-case`}
            onClick={() => setStatus("pending")}
          >
            Pending
          </button>
          <button
            className={`${
              status !== "completed" ? "btn-ghost" : "btn-success"
            } btn btn-sm normal-case`}
            onClick={() => setStatus("completed")}
          >
            Completed
          </button>
          <button
            className='btn btn-primary btn-sm normal-case float-right'
            onClick={removeAllTodo}
          >
            Clear All
          </button>
        </div>
        <hr className='border-gray-700 my-3' />
        <TodoList 
          todos={todos} 
          status={status}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      </div>
    </div>
  );
};

export default TodoCard;
