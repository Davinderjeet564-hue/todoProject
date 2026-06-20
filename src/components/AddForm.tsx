import React from "react";

function AddForm(): React.JSX.Element {
  const handleClick = () => {
    console.log("hello world");
  };

  return (
    <div className="position-fixed inset-0 bg-[#303030] flex flex-col items-center justify-center p-6 mt-6 rounded-lg w-lg">
      <form onSubmit={handleClick} className="flex flex-col items-center justify-center gap-2 p-6">
        <input
          className="bg-white rounded-full w-sm h-10 mt-6 text-black hover:bg-gray-200 cursor-pointer transition-all p-4"
          type="text"
          placeholder="Todo-title"
        />
        <textarea name="description" id="description" placeholder="description" className="bg-white rounded-full w-sm h-20 mt-6 text-black hover:bg-gray-200 cursor-pointer transition-all p-4">
        </textarea>
      </form>
    </div>
  );
}

export default AddForm;
