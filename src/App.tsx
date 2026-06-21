import React, { useState, useEffect } from "react";
import TodoCard from "./components/TodoCard";

interface Todo {
  title: string;
  description: string;
}

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const openAddModal = () => {
    setIsModalOpen(true);
    setEditingIndex(null);
    setInputTitle("");
    setInputDescription("");
  };

  const openEditModal = (index: number) => {
    setIsModalOpen(true);
    setEditingIndex(index);
    setInputTitle(todos[index].title);
    setInputDescription(todos[index].description);
  };

  const closeModal = () => {
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleDelete = (indexToDelete: number) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  const handleSaveTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTitle.trim() === "") return;
    if (editingIndex !== null) {
      const updatedTodos = todos.map((todo, idx) =>
        idx === editingIndex ? { title: inputTitle, description: inputDescription } : todo
      );
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, { title: inputTitle, description: inputDescription }]);
    }
    closeModal();
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string) || "";
    const description = (formData.get("description") as string) || "";

    if (title.trim() === "") return;

    setTodos([...todos, { title, description }]);
    closeModal();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-black mt-2 text-center">
          Todo List
        </h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-fit mt-2 hover:bg-blue-600 transition-all cursor-pointer"
          onClick={openAddModal}
        >
          Add Todo
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
            <form
              onSubmit={handleSaveTodo}
              className="bg-white p-8 rounded-lg shadow-lg w-1/2 relative"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-500 text-2xl hover:text-gray-600 transition-all cursor-pointer"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>

              <h2 className="text-2xl font-bold mb-4">{editingIndex !== null ? "Edit Todo" : "Add Todo"}</h2>
              <input
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                name="title"
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2 text-black"
                placeholder="Enter your todo"
                required
              />
              <textarea
                name="description"
                id="description"
                value={inputDescription}
                onChange={(e) => setInputDescription(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2 text-black"
                placeholder="description"
              ></textarea>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all cursor-pointer"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
                >
                  {editingIndex !== null ? "Save Changes" : "Add Todo"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {todos.map((todo, index) => (
            <TodoCard
              key={index}
              title={todo.title}
              description={todo.description}
              onDelete={() => handleDelete(index)}
              onEdit={() => openEditModal(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;