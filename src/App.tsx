import React, { useState, useEffect } from "react";
import TodoCard from "./components/TodoCard";
import TodoModal from "./components/TodoModal";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";

interface Todo {
  title: string;
  description: string;
  completed: boolean;
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
  const [inputCompleted, setInputCompleted] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
    setEditingIndex(null);
    setInputTitle("");
    setInputDescription("");
    setInputCompleted(false);
  };

  const openEditModal = (index: number) => {
    setIsModalOpen(true);
    setEditingIndex(index);
    setInputTitle(todos[index].title);
    setInputDescription(todos[index].description);
    setInputCompleted(todos[index].completed);
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
          ? { title: inputTitle, description: inputDescription, completed: inputCompleted }
          : todo,
      );
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, { title: inputTitle, description: inputDescription, completed: false }]);
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
  const inputBg = isDarkMode ? "bg-gray-800 text-gray-100 placeholder-gray-500" : "bg-gray-100 text-gray-900 placeholder-gray-400";
  const searchWrap = isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";

  // ── View: Todo Detail ───────────────────────────────────────────────────────
  if (viewingTodo) {
    return (
      <div className={`flex flex-col min-h-screen p-8 justify-center items-center ${bg} ${text} transition-colors duration-300`}>
        <div className={`p-8 rounded-2xl shadow-2xl w-full max-w-lg border ${surface} ${border}`}>
          <h1 className={`text-3xl font-bold mb-4 underline decoration-2 decoration-indigo-400 ${text}`}>
            {viewingTodo.title}
          </h1>
          <p className={`text-base p-3 rounded-lg border ${border} ${inputBg} indent-4 mb-4`}>
            {viewingTodo.description || <span className={subText}>No description provided.</span>}
          </p>
          {viewingTodo.completed ? (
            <span className="inline-block text-sm font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
              ✓ Completed
            </span>
          ) : (
            <span className="inline-block text-sm font-semibold text-rose-400 bg-rose-400/10 px-3 py-1 rounded-full">
              ✗ Not Completed
            </span>
          )}
          <button
            className="mt-6 block w-full bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
            onClick={() => setViewingTodo(null)}
          >
            ← Back to List
          </button>
        </div>
      </div>
    );
  }

  // ── View: Main List ─────────────────────────────────────────────────────────
  return (
    <div className={`flex flex-col min-h-screen ${bg} ${text} transition-colors duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 ${surface} border-b ${border} px-6 py-4 shadow-sm backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          {/* App Title */}
          <h1 className={`text-2xl font-extrabold tracking-tight ${text} shrink-0`}>
            <span className="text-indigo-500">✓</span> Todo List
          </h1>

          {/* Search + Toggle */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            {/* Search Field */}
            <div className={`flex items-center gap-2 border ${searchWrap} rounded-xl px-3 py-2 w-64 transition-colors duration-300`}>
              <FaSearch className={`shrink-0 text-sm ${subText}`} />
              <input
                type="search"
                placeholder="Search todos…"
                className={`bg-transparent outline-none text-sm w-full ${text}`}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm border transition-all duration-200 active:scale-95 cursor-pointer
                ${isDarkMode
                  ? "bg-indigo-500 hover:bg-indigo-600 text-white border-indigo-500"
                  : "bg-gray-900 hover:bg-gray-800 text-white border-gray-900"
                }`}
            >
              {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </header>

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
          editingIndex={editingIndex}
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
            <p className="text-lg font-medium">{isSearching ? "No todos match your search." : "No todos yet. Add one!"}</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-6xl">
            {(isSearching ? filteredTodos : todos).map((todo, index) => (
              <TodoCard
                key={index}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                onDelete={() => handleDelete(index)}
                onEdit={() => openEditModal(index)}
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
