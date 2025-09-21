import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

function App() {
  const [editTaskData, setEditTaskData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleEditRequest = (task) => {
    setEditTaskData(task);
  };
  const handleSaveEdit = () => {
    setEditTaskData(null);
  };
  const handleCancelEdit = () => {
    setEditTaskData(null);
  };
  return (
    <TaskProvider>
      <div className="App">
        <div className="app-header-row">
          <h1>Task Management</h1>
          <input
            className="search-bar"
            value={searchQuery}
            placeholder="Search Tasks"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="task-container">
          <TaskForm
            editTaskData={editTaskData}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
          <TaskList onEdit={handleEditRequest} searchQuery={searchQuery} />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
