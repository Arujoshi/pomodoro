function DailyStats({
  completionPercentage,
  completedTasks,
  totalTasks,
  pomodorosToday,
  focusMinutesToday,
  urgentBrainDumpCount,
}) {
  return (
    <div>
      <div className="card-header">
        <div>
          <h2 className="card-title">🌙 Today's Progress</h2>

          <p className="card-subtitle">A little progress is still progress.</p>
        </div>
      </div>

      <div className="progress-section">
        <div
          className="progress-ring"
          style={{
            "--progress": `${completionPercentage}%`,
          }}
        >
          <div className="progress-ring-inner">
            <div>
              <div className="progress-number">{completionPercentage}%</div>

              <div className="progress-label">complete</div>
            </div>
          </div>
        </div>

        <div className="stats-list">
          <div className="stat-row">
            <span>Tasks completed</span>

            <strong>
              {completedTasks} / {totalTasks}
            </strong>
          </div>

          <div className="stat-row">
            <span>Focus sessions</span>

            <strong>🍅 {pomodorosToday}</strong>
          </div>

          <div className="stat-row">
            <span>Focus time</span>

            <strong>⏱ {focusMinutesToday} min</strong>
          </div>

          <div className="stat-row">
            <span>Urgent thoughts</span>

            <strong>🔴 {urgentBrainDumpCount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyStats;
