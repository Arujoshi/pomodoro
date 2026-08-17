import { useEffect, useState } from "react";

const modes = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

function PomodoroTimer({
  activeTaskId,
  tasks,
  onClearActiveTask,
  onPomodoroComplete,
}) {
  const [mode, setMode] = useState("focus");

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("focusflow_timer");

    if (savedTime) {
      const parsedTimer = JSON.parse(savedTime);

      if (parsedTimer.isRunning && parsedTimer.endTime) {
        const remaining = Math.ceil((parsedTimer.endTime - Date.now()) / 1000);

        return Math.max(0, remaining);
      }

      return parsedTimer.timeLeft;
    }

    return modes.focus;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const savedTime = localStorage.getItem("focusflow_timer");

    if (savedTime) {
      const parsedTimer = JSON.parse(savedTime);

      if (parsedTimer.isRunning && parsedTimer.endTime) {
        return parsedTimer.endTime > Date.now();
      }
    }

    return false;
  });

  const [endTime, setEndTime] = useState(() => {
    const savedTime = localStorage.getItem("focusflow_timer");

    if (savedTime) {
      const parsedTimer = JSON.parse(savedTime);

      return parsedTimer.endTime || null;
    }

    return null;
  });

  const [completedSessions, setCompletedSessions] = useState(() => {
    const savedSessions = localStorage.getItem("focusflow_completed_sessions");

    return savedSessions ? Number(savedSessions) : 0;
  });

  /*
   * Save completed sessions
   */
  useEffect(() => {
    localStorage.setItem(
      "focusflow_completed_sessions",
      completedSessions.toString(),
    );
  }, [completedSessions]);

  /*
   * Save timer state
   */
  useEffect(() => {
    localStorage.setItem(
      "focusflow_timer",
      JSON.stringify({
        mode,
        timeLeft,
        isRunning,
        endTime,
      }),
    );
  }, [mode, timeLeft, isRunning, endTime]);

  /*
   * Countdown
   */
  useEffect(() => {
    if (!isRunning || !endTime) {
      return;
    }

    const interval = setInterval(() => {
      const remaining = Math.ceil((endTime - Date.now()) / 1000);

      setTimeLeft(Math.max(0, remaining));
    }, 250);

    return () => clearInterval(interval);
  }, [isRunning, endTime]);

  /*
   * Detect timer completion
   */
  useEffect(() => {
    if (!isRunning || timeLeft > 0) {
      return;
    }

    setIsRunning(false);
    setEndTime(null);

    if (mode === "focus") {
      setCompletedSessions((currentSessions) => currentSessions + 1);

      onPomodoroComplete(activeTaskId);
    }
  }, [timeLeft, isRunning, mode, activeTaskId, onPomodoroComplete]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (timeLeft <= 0) {
      return;
    }

    const newEndTime = Date.now() + timeLeft * 1000;

    setEndTime(newEndTime);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setEndTime(null);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setEndTime(null);
    setTimeLeft(modes[mode]);
  };

  const changeMode = (newMode) => {
    setIsRunning(false);
    setEndTime(null);
    setMode(newMode);
    setTimeLeft(modes[newMode]);
  };

  /*
   * Calculate timer progress
   */
  const totalTime = modes[mode];

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  return (
    <div className="pomodoro-content">
      {/* Header */}
      <div className="pomodoro-heading">
        <div>
          <span className="pomodoro-eyebrow">FOCUS SESSION</span>

          <h2 className="pomodoro-title">🍅 Pomodoro</h2>
        </div>

        <div className="session-count">
          <span>Today</span>
          <strong>{completedSessions}</strong>
        </div>
      </div>

      {/* Mode buttons */}
      <div className="timer-modes">
        <button
          className={`mode-button ${mode === "focus" ? "active" : ""}`}
          onClick={() => changeMode("focus")}
        >
          Focus
        </button>

        <button
          className={`mode-button ${mode === "shortBreak" ? "active" : ""}`}
          onClick={() => changeMode("shortBreak")}
        >
          Short Break
        </button>

        <button
          className={`mode-button ${mode === "longBreak" ? "active" : ""}`}
          onClick={() => changeMode("longBreak")}
        >
          Long Break
        </button>
      </div>

      {/* Timer */}
      <div
        className={`timer-circle ${isRunning ? "timer-running" : ""}`}
        style={{
          "--timer-progress": `${progress * 3.6}deg`,
        }}
      >
        <div className="timer-circle-inner">
          <span className="timer-mode-label">
            {mode === "focus"
              ? "FOCUS"
              : mode === "shortBreak"
                ? "SHORT BREAK"
                : "LONG BREAK"}
          </span>

          <div className="timer-display">{formatTime(timeLeft)}</div>

          <span className="timer-status">
            {isRunning ? "Stay focused..." : "Ready when you are"}
          </span>
        </div>
      </div>

      {/* Active task */}
      {activeTask ? (
        <div className="focus-task">
          <div className="focus-task-icon">🎯</div>

          <div className="focus-task-info">
            <span>Currently focusing on</span>

            <strong>{activeTask.title}</strong>
          </div>

          <button className="change-task-button" onClick={onClearActiveTask}>
            Change
          </button>
        </div>
      ) : (
        <div className="no-focus-task">
          <span>🎯</span>

          <span>Select a task to focus on</span>
        </div>
      )}

      {/* Controls */}
      <div className="timer-controls">
        {!isRunning ? (
          <button className="timer-start-button" onClick={startTimer}>
            <span>▶</span>
            Start Focus
          </button>
        ) : (
          <button
            className="timer-start-button timer-pause-button"
            onClick={pauseTimer}
          >
            <span>Ⅱ</span>
            Pause
          </button>
        )}

        <button className="timer-reset-button" onClick={resetTimer}>
          ↻
        </button>
      </div>

      {/* Session dots */}
      <div className="session-progress">
        <div className="session-dots">
          {[0, 1, 2, 3].map((session) => (
            <span
              key={session}
              className={
                session < completedSessions % 4
                  ? "session-dot completed"
                  : "session-dot"
              }
            >
              🍅
            </span>
          ))}
        </div>

        <span className="session-label">
          {completedSessions % 4} / 4 focus sessions
        </span>
      </div>
    </div>
  );
}

export default PomodoroTimer;
