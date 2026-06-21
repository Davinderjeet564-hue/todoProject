import React from "react";

const TodoModal = ({
  closeModal,
  handleSaveTodo,
  inputTitle,
  inputDescription,
  setInputTitle,
  setInputDescription,
  editingIndex,
}: {
  closeModal: () => void;
  handleSaveTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  inputTitle: string;
  inputDescription: string;
  setInputTitle: (value: string) => void;
  setInputDescription: (value: string) => void;
  editingIndex: number | null;
}) => {
  return (
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

        <h2 className="text-2xl font-bold mb-4">
          {editingIndex !== null ? "Edit Todo" : "Add Todo"}
        </h2>
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
  );
};

export default TodoModal;
