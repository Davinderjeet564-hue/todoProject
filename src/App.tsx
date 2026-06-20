import { useState } from "react";
import AddForm from "./components/AddForm";
import Button from "./components/button"

function App() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
    <div className="flex flex-col h-screen bg-black items-center p-6">
      <h1 className="text-5xl font-bold text-white mt-6">To-Do List</h1>
      <Button open={open} setOpen={setOpen}/>
      
      {open && <AddForm />}

      {/*{open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            style={{ background: "white", padding: 20, borderRadius: 8, minWidth: 320 }}
            onSubmit={(e) => {
              e.preventDefault();
              // handle submit here
              setOpen(false);
            }}
          >
            <h3>Contact</h3>

            <label>
              Name
              <input name="name" required />
            </label>

            <br />

            <label>
              Email
              <input type="email" name="email" required />
            </label>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button type="submit">Send</button>
              <button type="button" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}*/}

    </div>
    </>
  )
}

export default App