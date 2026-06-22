import React, { useRef, useEffect } from "react";

const TodoModal = ({
  closeModal,
  handleSaveTodo,
  inputTitle,
  inputDescription,
  setInputTitle,
  setInputDescription,
  editingIndex,
  inputCompleted,
  setInputCompleted,
  isDarkMode,
}: {
  closeModal: () => void;
  handleSaveTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  inputTitle: string;
  inputDescription: string;
  setInputTitle: (value: string) => void;
  setInputDescription: (value: string) => void;
  editingIndex: number | null;
  inputCompleted: boolean;
  setInputCompleted: (value: boolean) => void;
  isDarkMode: boolean;
}) => {
  const surface = isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900";
  const border = isDarkMode ? "border-gray-700" : "border-gray-300";
  const inputCls = isDarkMode
    ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-indigo-500"
    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-400";
  const labelCls = isDarkMode ? "text-gray-300" : "text-gray-700";
  const closeHover = isDarkMode ? "hover:text-gray-200 text-gray-500" : "hover:text-gray-700 text-gray-400";


  const modalRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const firstInput = modalRef.current?.querySelector('input') as HTMLInputElement | null;
    firstInput?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
      if (e.key === "Tab" && modalRef.current) {
        e.preventDefault();
        const focusableElements = modalRef.current.querySelectorAll(
          'input, textarea, button, [href], select, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        const currentIndex = Array.from(focusableElements).findIndex(
          el => document.activeElement === el
        );
        const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
        if (nextIndex >= 0 && nextIndex < focusableElements.length) {
          focusableElements[nextIndex].focus();
        } else {
          if (e.shiftKey) {
            focusableElements[focusableElements.length - 1]?.focus();
          } else {
            focusableElements[0]?.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal, handleSaveTodo]);


  useEffect(()=>{
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return ()=>{
      document.body.style.overflow = originalStyle;
    }
  }, [])




  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm px-4">
      <form
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onSubmit={handleSaveTodo}
        className={`${surface} p-8 rounded-2xl shadow-2xl w-full max-w-lg relative border ${border} transition-colors duration-300`}
      >
        {/* Close button */}
        <button
          type="button"
          className={`absolute top-4 right-4 text-2xl font-bold leading-none transition-colors cursor-pointer ${closeHover}`}
          onClick={closeModal}
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {editingIndex !== null ? "✏️ Edit Todo" : "➕ Add Todo"}
        </h2>

        {/* Title */}
        <label className={`block text-sm font-semibold mb-1 ${labelCls}`} htmlFor="todo-title">
          Title <span className="text-rose-400">*</span>
        </label>
        <input
          id="todo-title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          name="title"
          type="text"
          className={`border rounded-xl px-4 py-2.5 w-full mb-4 outline-none transition-colors ${inputCls}`}
          placeholder="What needs to be done?"
          required
        />

        {/* Description */}
        <label className={`block text-sm font-semibold mb-1 ${labelCls}`} htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          className={`border rounded-xl px-4 py-2.5 w-full mb-4 outline-none resize-none transition-colors ${inputCls}`}
          placeholder="Add some details…"
        />

        {/* Completed checkbox */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={inputCompleted}
            onChange={(e) => setInputCompleted(e.target.checked)}
            className="w-4 h-4 accent-indigo-500 cursor-pointer"
          />
          <label htmlFor="completed" className={`text-sm font-medium cursor-pointer ${labelCls}`}>
            Mark as completed
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm border transition-all active:scale-95 cursor-pointer
              ${isDarkMode
                ? "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-500 hover:bg-indigo-600 text-white transition-all active:scale-95 cursor-pointer"
          >
            {editingIndex !== null ? "Save Changes" : "Add Todo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoModal;
