import { useTaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import "./TaskList.css";

function TaskList({ onEdit }) {
  const { tasks, deleteTask } = useTaskContext();
  if (tasks.length == 0) {
    return (
      <div className="empty-state">
        <h3>No Tasks yet</h3>
        <p>Add your first task to get started</p>
      </div>
    );
  }
  return (
    <div className="task-list">
      {tasks.map((task) => {
        return (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={onEdit}
          />
        );
      })}
    </div>
  );
}

export default TaskList;
