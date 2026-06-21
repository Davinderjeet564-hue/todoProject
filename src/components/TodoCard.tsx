import React from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

interface TodoCardProps {
  title: string;
  description: string;
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
}

function TodoCard({
  title,
  description,
  onDelete,
  onEdit,
  onView,
}: TodoCardProps): React.JSX.Element {
  return (
    <div
      className="flex flex-col bg-gray-200 rounded-xl w-[400px] h-[200px] overflow-hidden p-6 mt-6 hover:cursor-pointer transition-all"
      onClick={onView}
    >
      <div className="flex justify-end gap-4">
        <button
          className="cursor-pointer hover:text-red-500 text-2xl"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <MdDelete />
        </button>
        <button
          className="cursor-pointer hover:text-blue-500 text-2xl"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <CiEdit />
        </button>
      </div>
      <h1 className="text-black font-bold text-xl underline">{title}</h1>
      <p className="text-black mt-2 indent-2 text-lg">{description}</p>
    </div>
  );
}

export default TodoCard;
