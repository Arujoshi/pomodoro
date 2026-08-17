import { useState } from "react";

function BrainDump({ onAddBrainDump }) {
  const [thought, setThought] = useState("");
  const [category, setCategory] = useState("important");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!thought.trim()) {
      return;
    }

    onAddBrainDump(thought.trim(), category);

    setThought("");
    setCategory("important");
  };

  return (
    <div className="brain-dump-content">

      <div className="brain-dump-intro">
        <div className="brain-icon">
          🧠
        </div>

        <div>
          <h2 className="card-title">
            Brain Dump
          </h2>

          <p className="card-subtitle">
            Capture the thought. Don't chase it.
          </p>
        </div>
      </div>


      <form
        className="brain-dump-form"
        onSubmit={handleSubmit}
      >
        <input
          className="brain-dump-input"
          type="text"
          placeholder="Something just came to mind..."
          value={thought}
          onChange={(event) =>
            setThought(event.target.value)
          }
        />

        <select
          className="brain-dump-select"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          <option value="urgent">
            🔴 Urgent
          </option>

          <option value="important">
            🟡 Important
          </option>

          <option value="later">
            🔵 Later
          </option>

          <option value="random">
            ⚪ Random
          </option>
        </select>

        <button
          className="brain-capture-button"
          type="submit"
        >
          Capture
        </button>
      </form>

      <div className="brain-dump-hint">
        💡 Capture it now. Decide what to do with it later.
      </div>

    </div>
  );
}

export default BrainDump;