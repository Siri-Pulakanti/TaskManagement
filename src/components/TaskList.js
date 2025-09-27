import { useTaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import "./TaskList.css";

function TaskList({ onEdit, searchQuery }) {
  const { tasks, deleteTask } = useTaskContext();
  const query = (searchQuery || "").toLowerCase();
  const filteredTasks = query
    ? tasks.filter((task) => {
        return (
          (task.title && task.title.toLowerCase().includes(query)) ||
          (task.description &&
            task.description.toLowerCase().includes(query)) ||
          (task.category && task.category.toLowerCase().includes(query)) ||
          (task.priority && task.priority.toLowerCase().includes(query)) ||
          (task.dueDate && task.dueDate.toLowerCase().includes(query))
        );
      })
    : tasks;
  if (filteredTasks?.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Matching Tasks</h3>
        <p>Try a different search term</p>
      </div>
    );
  }
  return (
    <div className="task-list">
      {filteredTasks?.map((task) => {
        return (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={onEdit}
            searchQuery={searchQuery}
          />
        );
      })}
    </div>
  );
}

export default TaskList;
