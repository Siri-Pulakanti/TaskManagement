import "./App.css";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import useTasks from "./hooks/useTasks";

function App() {
  const { tasks } = useTasks();
  return (
    <div className="App">
      <TaskForm />
      {tasks.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </div>
  );
}

export default App;
