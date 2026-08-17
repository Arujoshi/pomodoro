import { useState } from "react";

function TodoItem({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onStartFocus,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (!editedTitle.trim()) {
      return;
    }

    onEditTask(task.id, editedTitle.trim());
    setIsEditing(false);
  };

  const priorityLabels = {
    high: {
      icon: "🔴",
      label: "Urgent",
    },
    medium: {
      icon: "🟡",
      label: "Important",
    },
    low: {
      icon: "🟢",
      label: "Later",
    },
  };

  const priority = priorityLabels[task.priority];

  return (
    <div
      className={`task-item ${
        task.completed ? "task-completed" : ""
      }`}
    >

      {/* Checkbox */}
      <button
        className={`task-checkbox ${
          task.completed ? "checked" : ""
        }`}
        onClick={() => onToggleTask(task.id)}
        aria-label={
          task.completed
            ? "Mark task as active"
            : "Mark task as completed"
        }
      >
        {task.completed ? "✓" : ""}
      </button>


      {/* Task Content */}
      <div className="task-content">

        {isEditing ? (
          <div className="task-edit">

            <input
              className="task-edit-input"
              type="text"
              value={editedTitle}
              onChange={(event) =>
                setEditedTitle(event.target.value)
              }
              autoFocus
            />

            <div className="task-edit-actions">

              <button
                className="save-button"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="cancel-button"
                onClick={() => {
                  setEditedTitle(task.title);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>

            </div>

          </div>
        ) : (
          <>
            <div
              className={`task-title ${
                task.completed ? "completed" : ""
              }`}
            >
              {task.title}
            </div>

            <div className="task-meta">

              <span
                className={`priority-badge priority-${task.priority}`}
              >
                {priority.icon} {priority.label}
              </span>

              <span className="pomodoro-count">
                🍅 {task.pomodorosCompleted || 0}
              </span>

            </div>
          </>
        )}

      </div>


      {/* Actions */}
      {!isEditing && (
        <div className="task-actions">

          <button
            className="focus-button"
            onClick={() => onStartFocus(task.id)}
            title="Focus on this task"
          >
            🍅
            <span>Focus</span>
          </button>

          <button
            className="icon-button"
            onClick={() => setIsEditing(true)}
            title="Edit task"
          >
            ✏️
          </button>

          <button
            className="icon-button delete-icon"
            onClick={() => onDeleteTask(task.id)}
            title="Delete task"
          >
            🗑️
          </button>

        </div>
      )}

    </div>
  );
}

export default TodoItem;