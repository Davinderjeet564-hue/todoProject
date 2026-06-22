import { useState, useEffect } from "react";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.map((todo: any) => ({
          id: todo.id || crypto.randomUUID(),
          title: todo.title || "",
          description: todo.description || "",
          completed: !!todo.completed,
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description: string) => {
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, description, completed: false },
    ]);
  };

  const updateTodo = (id: string, updatedTodo: Todo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
