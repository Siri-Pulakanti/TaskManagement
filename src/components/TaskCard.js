import React, { useState } from "react";
import { formatDate, getDueDateStatus } from "../utils/Date";
import ConfirmDialog from "./ConfirmDialog";
import "./TaskCard.css";

function TaskCard({ task, onDelete, onEdit }) {
  const dueDateStatus = getDueDateStatus(task.dueDate);
  const [showPopup, setShowPopup] = useState(false);
  const handleConfirm = () => {
    onDelete(task.id);
    setShowPopup(false);
  };
  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className={`task-card priority-${task.priority.toLowerCase()}`}>
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>
        <span
          className={`task-priority priority-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>
        <button className="task-edit-button" onClick={() => onEdit(task)}>
          ✏️
        </button>
        <button
          className="task-delete-button"
          onClick={() => setShowPopup(true)}
        >
          🗑️
        </button>
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

      {showPopup && (
        <ConfirmDialog
          title="Delete Task"
          description={`Are you sure you want to Delete  ${task.title}?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default TaskCard;
