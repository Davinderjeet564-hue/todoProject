import { type Todo } from "./useTodos";

interface TodoDetailProps {
  bg: string;
  text: string;
  viewingTodo: Todo;
  setViewingTodo: (value: Todo | null) => void;
  surface: string;
  border: string;
  inputBg: string;
  subText: string;
}

function TodoDetail({
  bg,
  text,
  viewingTodo,
  setViewingTodo,
  surface,
  border,
  inputBg,
  subText,
}: TodoDetailProps) {
  return (
    <div
      className={`flex flex-col min-h-screen p-8 justify-center items-center ${bg} ${text} transition-colors duration-300`}
    >
      <div
        className={`p-8 rounded-2xl shadow-2xl w-full max-w-lg border ${surface} ${border}`}
      >
        <h1
          className={`text-3xl font-bold mb-4 underline decoration-2 decoration-indigo-400 ${text}`}
        >
          {viewingTodo.title}
        </h1>
        <p
          className={`text-base p-3 rounded-lg border ${border} ${inputBg} indent-4 mb-4`}
        >
          {viewingTodo.description || (
            <span className={subText}>No description provided.</span>
          )}
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

export default TodoDetail;
