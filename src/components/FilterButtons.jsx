function FilterButtons({ filter, onFilterChange, tasks }) {
  const activeCount = tasks.filter((task) => !task.completed).length;

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="task-filters">
      <button
        className={`filter-button ${filter === "all" ? "active" : ""}`}
        onClick={() => onFilterChange("all")}
      >
        All
        <span>{tasks.length}</span>
      </button>

      <button
        className={`filter-button ${filter === "active" ? "active" : ""}`}
        onClick={() => onFilterChange("active")}
      >
        Active
        <span>{activeCount}</span>
      </button>

      <button
        className={`filter-button ${filter === "completed" ? "active" : ""}`}
        onClick={() => onFilterChange("completed")}
      >
        Completed
        <span>{completedCount}</span>
      </button>
    </div>
  );
}

export default FilterButtons;
