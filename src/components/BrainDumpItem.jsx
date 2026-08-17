function BrainDumpItem({
  brainDump,
  onDelete,
  onConvertToTask,
}) {
  const categoryInfo = {
    urgent: {
      icon: "🔴",
      label: "Urgent",
    },

    important: {
      icon: "🟡",
      label: "Important",
    },

    later: {
      icon: "🔵",
      label: "Later",
    },

    random: {
      icon: "⚪",
      label: "Random",
    },
  };

  const category =
    categoryInfo[brainDump.category];

  return (
    <div
      className={`brain-dump-item brain-${brainDump.category}`}
    >

      {/* Category indicator */}
      <div className="brain-item-icon">
        {category.icon}
      </div>


      {/* Thought */}
      <div className="brain-item-content">

        <div className="brain-item-text">
          {brainDump.text}
        </div>

        <div className="brain-item-meta">
          {category.label}
        </div>

      </div>


      {/* Actions */}
      <div className="brain-item-actions">

        <button
          className="convert-button"
          onClick={() =>
            onConvertToTask(brainDump)
          }
          title="Convert this thought into a task"
        >
          ✓
          <span>Task</span>
        </button>

        <button
          className="brain-delete-button"
          onClick={() =>
            onDelete(brainDump.id)
          }
          title="Delete thought"
        >
          🗑️
        </button>

      </div>

    </div>
  );
}

export default BrainDumpItem;