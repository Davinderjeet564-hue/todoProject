import React from "react"

function Button({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}): React.JSX.Element {
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <button className="bg-white rounded-full w-40 h-10 mt-6 text-black hover:bg-gray-200 cursor-pointer transition-all" onClick={handleClick}>Add Todo</button>
  )
}

export default Button   