import React, { useState, useEffect } from "react";
import TodoCard from "./components/TodoCard";
import TodoModal from "./components/TodoModal";
import Header from "./components/Header";
import TodoDetail from "./components/TodoDetail";
import useTodos, { type Todo } from "./components/useTodos";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewingTodo, setViewingTodo] = useState<Todo | null>(null);
  const [inputCompleted, setInputCompleted] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const openAddModal = () => {
    setIsModalOpen(true);
    setEditingId(null);
    setInputTitle("");
    setInputDescription("");
    setInputCompleted(false);
  };

  const openEditModal = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (!todoToEdit) return;
    setIsModalOpen(true);
    setEditingId(id);
    setInputTitle(todoToEdit.title);
    setInputDescription(todoToEdit.description);
    setInputCompleted(todoToEdit.completed);
  };

  const closeModal = () => {
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleDelete = (idToDelete: string) => {
    deleteTodo(idToDelete);
  };

  const handleSaveTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTitle.trim() === "") return;
    if (editingId !== null) {
      updateTodo(editingId, {
        id: editingId,
        title: inputTitle,
        description: inputDescription,
        completed: inputCompleted,
      });
    } else {
      addTodo(inputTitle, inputDescription);
    }
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

  // ── Shared theme tokens ─────────────────────────────────────────────────────
  const bg = isDarkMode ? "bg-gray-950" : "bg-slate-50";
  const surface = isDarkMode ? "bg-gray-900" : "bg-white";
  const text = isDarkMode ? "text-gray-100" : "text-gray-900";
  const subText = isDarkMode ? "text-gray-400" : "text-gray-500";
  const border = isDarkMode ? "border-gray-700" : "border-gray-200";
  const inputBg = isDarkMode
    ? "bg-gray-800 text-gray-100 placeholder-gray-500"
    : "bg-gray-100 text-gray-900 placeholder-gray-400";
  const searchWrap = isDarkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-300";

  // ── View: Todo Detail ───────────────────────────────────────────────────────
  if (viewingTodo) {
    return (
      <TodoDetail
        bg={bg}
        text={text}
        viewingTodo={viewingTodo}
        setViewingTodo={setViewingTodo}
        surface={surface}
        border={border}
        inputBg={inputBg}
        subText={subText}
      />
    );
  }

  // ── View: Main List ─────────────────────────────────────────────────────────
  return (
    <div
      className={`flex flex-col min-h-screen ${bg} ${text} transition-colors duration-300`}
    >
      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        surface={surface}
        border={border}
        text={text}
        subText={subText}
        searchWrap={searchWrap}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Add Todo Button */}
      <div className="flex justify-center pt-8 pb-2">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
          onClick={openAddModal}
        >
          + Add Todo
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TodoModal
          closeModal={closeModal}
          handleSaveTodo={handleSaveTodo}
          inputTitle={inputTitle}
          inputDescription={inputDescription}
          setInputTitle={setInputTitle}
          setInputDescription={setInputDescription}
          editingId={editingId}
          inputCompleted={inputCompleted}
          setInputCompleted={setInputCompleted}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Todo Cards */}
      <main className="flex flex-col items-center flex-grow overflow-y-auto px-4 pb-10">
        {(isSearching ? filteredTodos : todos).length === 0 ? (
          <div className={`mt-20 text-center ${subText}`}>
            <p className="text-5xl mb-4">📋</p>
            <p className="text-lg font-medium">
              {isSearching
                ? "No todos match your search."
                : "No todos yet. Add one!"}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-6xl">
            {(isSearching ? filteredTodos : todos).map((todo) => (
              <TodoCard
                key={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                onDelete={() => handleDelete(todo.id)}
                onEdit={() => openEditModal(todo.id)}
                onView={() => setViewingTodo(todo)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
