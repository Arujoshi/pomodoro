import TodoItem from "./TodoItem";

function TodoList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onStartFocus,
}) {
  return (
    <div>
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🌱</div>

          <p>No tasks here yet.</p>

          <span>Add something you want to accomplish.</span>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onStartFocus={onStartFocus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
