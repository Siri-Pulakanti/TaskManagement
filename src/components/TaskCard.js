import React from "react";
import { formatDate, getDueDateStatus } from "../utils/Date";
import "./TaskCard.css";

function TaskCard({ task }) {
  const dueDateStatus = getDueDateStatus(task.dueDate);
  return (
    <div className={`task-card priority-${task.priority.toLowerCase()}`}>
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>
        <span
          className={`task-priority priority-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-meta">
        <span className="task-category">{task.category}</span>
        <span className={`task-due-date ${dueDateStatus}`}>
          {formatDate(task.dueDate)}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;
