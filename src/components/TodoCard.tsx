import React from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

interface TodoCardProps {
  title: string;
  description: string;
  completed: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
  isDarkMode: boolean;
}

function TodoCard({
  title,
  description,
  completed,
  onDelete,
  onEdit,
  onView,
  isDarkMode,
}: TodoCardProps): React.JSX.Element {
  const card = isDarkMode
    ? "bg-gray-800 border-gray-700 hover:border-indigo-500 hover:shadow-indigo-900/40"
    : "bg-white border-gray-200 hover:border-indigo-400 hover:shadow-indigo-100";
  const titleCls = isDarkMode ? "text-gray-100" : "text-gray-900";
  const descCls = isDarkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div
      className={`flex flex-col border rounded-2xl w-[360px] min-h-[180px] overflow-hidden p-5 cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 ${card}`}
      onClick={onView}
    >
      {/* Action buttons */}
      <div className="flex justify-end gap-3 mb-2">
        <button
          className={`cursor-pointer text-xl transition-colors duration-150 ${isDarkMode ? "text-gray-500 hover:text-rose-400" : "text-gray-400 hover:text-rose-500"}`}
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          title="Delete"
        >
          <MdDelete />
        </button>
        <button
          className={`cursor-pointer text-xl transition-colors duration-150 ${isDarkMode ? "text-gray-500 hover:text-indigo-400" : "text-gray-400 hover:text-indigo-500"}`}
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          title="Edit"
        >
          <CiEdit />
        </button>
      </div>

      {/* Content */}
      <h1 className={`font-bold text-lg leading-snug mb-1 ${titleCls}`}>{title}</h1>
      <p className={`text-sm flex-grow indent-2 leading-relaxed ${descCls}`}>
        {description || <span className="italic">No description.</span>}
      </p>

      {/* Status badge */}
      <div className="mt-3">
        {completed ? (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
            ✓ Completed
          </span>
        ) : (
          <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
            ○ Pending
          </span>
        )}
      </div>
    </div>
  );
}

export default TodoCard;
