import React, { useState, useEffect } from "react";
import TodoCard from "./components/TodoCard";
import TodoModal from "./components/TodoModal";
import { FaSearch } from "react-icons/fa";

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
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [viewingTodo, setViewingTodo] = useState<Todo | null>(null);


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
        idx === editingIndex
          ? { title: inputTitle, description: inputDescription }
          : todo,
      );
      setTodos(updatedTodos);
    } else {
      setTodos([
        ...todos,
        { title: inputTitle, description: inputDescription },
      ]);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(value.trim() !== "");
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (viewingTodo) {
    return (
      <div className="flex flex-col h-screen p-8 justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-1/2">
          <h1 className="text-4xl font-bold mb-4">{viewingTodo.title}</h1>
          <p className="text-lg text-gray-700">{viewingTodo.description}</p>
          <button 
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setViewingTodo(null)}
          >
            Back to List
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex justify-between items-center px-8 py-4 w-full border-b border-gray-200">
          <div className="flex justify-center w-1/3">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
                onClick={openAddModal}
              >
                Add Todo
              </button>
            </div>
            <h1 className="text-4xl font-bold text-black text-center w-1/3">
              Todo List
            </h1>
            <div className="flex justify-center w-1/3">
              <div className="flex items-end bg-gray-200 rounded-lg p-2">
                <input
                  type="search"
                  placeholder="search todo"
                  className="bg-transparent rounded-lg p-2 w-fit text-black outline-none"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch className="text-black text-xl cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center flex-grow overflow-y-auto">
            {isModalOpen && 
              <TodoModal
                closeModal={closeModal}
                handleSaveTodo={handleSaveTodo}
                inputTitle={inputTitle}
                inputDescription={inputDescription}
                setInputTitle={setInputTitle}
                setInputDescription={setInputDescription}
                editingIndex={editingIndex}
              />}

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {isSearching
                ? filteredTodos.map((todo, index) => (
                    <TodoCard
                      key={index}
                      title={todo.title}
                      description={todo.description}
                      onDelete={() => handleDelete(index)}
                      onEdit={() => openEditModal(index)}
                      onView={() => setViewingTodo(todo)}
                    />
                  ))
                : todos.map((todo, index) => (
                    <TodoCard
                      key={index}
                      title={todo.title}
                      description={todo.description}
                      onDelete={() => handleDelete(index)}
                      onEdit={() => openEditModal(index)}
                      onView={() => setViewingTodo(todo)}
                    />
                  ))}
            </div>
          </div>
        </div>
      );
    };
  };

export default App;
