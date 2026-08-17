function BrainDumpFilters({
  filter,
  onFilterChange,
  brainDumps,
}) {
  const getCount = (category) => {
    return brainDumps.filter(
      (brainDump) =>
        brainDump.category === category
    ).length;
  };

  return (
    <div className="brain-dump-filters">

      <button
        className={`brain-filter ${
          filter === "all" ? "active" : ""
        }`}
        onClick={() => onFilterChange("all")}
      >
        <span>All</span>
        <strong>{brainDumps.length}</strong>
      </button>


      <button
        className={`brain-filter urgent ${
          filter === "urgent" ? "active" : ""
        }`}
        onClick={() => onFilterChange("urgent")}
      >
        <span>🔴 Urgent</span>
        <strong>{getCount("urgent")}</strong>
      </button>


      <button
        className={`brain-filter important ${
          filter === "important" ? "active" : ""
        }`}
        onClick={() =>
          onFilterChange("important")
        }
      >
        <span>🟡 Important</span>
        <strong>{getCount("important")}</strong>
      </button>


      <button
        className={`brain-filter later ${
          filter === "later" ? "active" : ""
        }`}
        onClick={() => onFilterChange("later")}
      >
        <span>🔵 Later</span>
        <strong>{getCount("later")}</strong>
      </button>


      <button
        className={`brain-filter random ${
          filter === "random" ? "active" : ""
        }`}
        onClick={() => onFilterChange("random")}
      >
        <span>⚪ Random</span>
        <strong>{getCount("random")}</strong>
      </button>

    </div>
  );
}

export default BrainDumpFilters;