import { useState } from "react";

function TodoForm({ onAddTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!taskTitle.trim()) {
      return;
    }

    onAddTask(taskTitle.trim(), priority);

    setTaskTitle("");
    setPriority("medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="What do you want to accomplish?"
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />

      <select
        className="priority-select"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="high">🔴 Urgent</option>
        <option value="medium">🟡 Important</option>
        <option value="low">🟢 Later</option>
      </select>

      <button className="primary-button" type="submit">
        + Add Task
      </button>
    </form>
  );
}

export default TodoForm;
