import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import BrainDump from "./components/BrainDump";
import BrainDumpItem from "./components/BrainDumpItem";
import BrainDumpFilters from "./components/BrainDumpFilters";
import PomodoroTimer from "./components/PomodoroTimer";
import FocusReview from "./components/FocusReview";
import DailyStats from "./components/DailyStats";
import "./App.css";

function App() {
  const [showFocusReview, setShowFocusReview] = useState(() => {
    const savedReview = localStorage.getItem("focusflow_focus_review");

    return savedReview === "true";
  });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("focusflow_tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [brainDumps, setBrainDumps] = useState(() => {
    const savedBrainDumps = localStorage.getItem("focusflow_brain_dumps");

    return savedBrainDumps ? JSON.parse(savedBrainDumps) : [];
  });

  const [pomodoroSessions, setPomodoroSessions] = useState(() => {
    const savedSessions = localStorage.getItem("focusflow_sessions");

    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  const [filter, setFilter] = useState("all");
  const [brainDumpFilter, setBrainDumpFilter] = useState("all");

  const [activeTaskId, setActiveTaskId] = useState(() => {
    const savedTaskId = localStorage.getItem("focusflow_active_task");

    return savedTaskId ? Number(savedTaskId) : null;
  });

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  useEffect(() => {
    localStorage.setItem("focusflow_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("focusflow_brain_dumps", JSON.stringify(brainDumps));
  }, [brainDumps]);

  useEffect(() => {
    localStorage.setItem(
      "focusflow_sessions",
      JSON.stringify(pomodoroSessions),
    );
  }, [pomodoroSessions]);

  useEffect(() => {
    localStorage.setItem("focusflow_focus_review", showFocusReview.toString());
  }, [showFocusReview]);

  const closeFocusReview = () => {
    setShowFocusReview(false);

    localStorage.removeItem("focusflow_focus_review");
  };

  const handleFocusComplete = (taskId) => {
    completePomodoro(taskId);
    setShowFocusReview(true);
  };

  const startTaskFocus = (taskId) => {
    setActiveTaskId(taskId);

    localStorage.setItem("focusflow_active_task", taskId.toString());
  };

  const clearActiveTask = () => {
    setActiveTaskId(null);
    localStorage.removeItem("focusflow_active_task");
  };

  const completePomodoro = (taskId) => {
    if (!taskId) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              pomodorosCompleted: task.pomodorosCompleted + 1,
            }
          : task,
      ),
    );

    const newSession = {
      id: Date.now(),
      taskId,
      duration: 25,
      completedAt: new Date().toISOString(),
    };

    setPomodoroSessions((currentSessions) => [...currentSessions, newSession]);
  };

  const addBrainDump = (text, category) => {
    const newBrainDump = {
      id: Date.now(),
      text,
      category,
      createdAt: new Date().toISOString(),
    };

    setBrainDumps((currentBrainDumps) => [...currentBrainDumps, newBrainDump]);
  };

  const deleteBrainDump = (brainDumpId) => {
    setBrainDumps((currentBrainDumps) =>
      currentBrainDumps.filter((brainDump) => brainDump.id !== brainDumpId),
    );
  };

  const addTask = (taskTitle, priority) => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
      completedAt: null,
      priority: priority,
      pomodorosCompleted: 0,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const completingTask = !task.completed;

        return {
          ...task,
          completed: completingTask,
          completedAt: completingTask ? new Date().toISOString() : null,
        };
      }),
    );
  };

  const editTask = (taskId, newTitle) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const convertBrainDumpToTask = (brainDump) => {
    const priorityMap = {
      urgent: "high",
      important: "medium",
      later: "low",
      random: "low",
    };

    const newTask = {
      id: Date.now(),
      title: brainDump.text,
      completed: false,
      priority: priorityMap[brainDump.category],
      pomodorosCompleted: 0,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);

    setBrainDumps((currentBrainDumps) =>
      currentBrainDumps.filter((item) => item.id !== brainDump.id),
    );
  };

  const filteredBrainDumps = brainDumps.filter((brainDump) => {
    if (brainDumpFilter === "all") {
      return true;
    }

    return brainDump.category === brainDumpFilter;
  });

  const today = new Date().toDateString();

  const completedTasksToday = tasks.filter((task) => {
    if (!task.completedAt) {
      return false;
    }

    return new Date(task.completedAt).toDateString() === today;
  });

  const sessionsToday = pomodoroSessions.filter(
    (session) => new Date(session.completedAt).toDateString() === today,
  );

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const focusMinutesToday = sessionsToday.reduce(
    (total, session) => total + session.duration,
    0,
  );

  const urgentBrainDumps = brainDumps.filter(
    (brainDump) => brainDump.category === "urgent",
  );

  return (
    <div className="app">
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="logo">
            <div className="logo-icon">🍃</div>

            <div>
              <h1>FocusFlow</h1>
              <p>Calm mind. Deep focus.</p>
            </div>
          </div>
        </header>

        <main>
          {/* Top Dashboard */}
          <div className="dashboard-grid">
            {/* Daily Statistics */}
            <div className="card stats-card">
              <DailyStats
                completionPercentage={completionPercentage}
                completedTasks={completedTasks}
                totalTasks={totalTasks}
                pomodorosToday={sessionsToday.length}
                focusMinutesToday={focusMinutesToday}
                urgentBrainDumpCount={urgentBrainDumps.length}
              />
            </div>

            {/* Pomodoro */}
            <div className="card pomodoro-card">
              <PomodoroTimer
                activeTaskId={activeTaskId}
                tasks={tasks}
                onClearActiveTask={clearActiveTask}
                onPomodoroComplete={handleFocusComplete}
              />
            </div>
          </div>

          {/* Todo Section */}
          <section className="card task-section">
            <div className="card-header">
              <div>
                <h2 className="card-title">📋 Today's Tasks</h2>

                <p className="card-subtitle">Focus on what matters most.</p>
              </div>
            </div>

            <TodoForm onAddTask={addTask} />

            <FilterButtons
              filter={filter}
              onFilterChange={setFilter}
              tasks={tasks}
            />

            <TodoList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              onStartFocus={startTaskFocus}
            />
          </section>

          {/* Brain Dump Section */}
          <section className="card brain-dump-card">
            
            <BrainDump onAddBrainDump={addBrainDump} />

            <BrainDumpFilters
              filter={brainDumpFilter}
              onFilterChange={setBrainDumpFilter}
              brainDumps={brainDumps}
            />

            <div className="brain-dump-list">
              {filteredBrainDumps.map((brainDump) => (
                <BrainDumpItem
                  key={brainDump.id}
                  brainDump={brainDump}
                  onDelete={deleteBrainDump}
                  onConvertToTask={convertBrainDumpToTask}
                />
              ))}
            </div>
          </section>

          {/* Focus Review */}
          {showFocusReview && (
            <FocusReview
              task={activeTask}
              brainDumps={brainDumps}
              onConvertToTask={convertBrainDumpToTask}
              onDeleteBrainDump={deleteBrainDump}
              onClose={closeFocusReview}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
