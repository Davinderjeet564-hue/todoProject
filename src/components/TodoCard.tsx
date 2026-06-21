import React from 'react'

function TodoCard({title, description}: {title: string, description: string}): React.JSX.Element {
  return (
  <div className="flex flex-col bg-gray-200 rounded-xl w-[400px] h-[200px] overflow-hidden p-6 mt-6">
    <h1 className="text-black font-bold text-xl underline">{title}</h1>
    <p className="text-black mt-2 indent-2 text-lg">{description}</p>
  </div>
  );
}

export default TodoCard;