import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <h1>Task Management</h1>
        <div className="task-container">
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
