import React, { useState } from "react";
import { formatDate, getDueDateStatus } from "../utils/Date";
import ConfirmDialog from "./ConfirmDialog";
import "./TaskCard.css";

const highlightText = (text, query) => {
  if (!text || !query) {
    return text;
  } else {
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = String(text).split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark className="highlight" key={i}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  }
};
function TaskCard({ task, onDelete, onEdit, searchQuery }) {
  const dueDateStatus = getDueDateStatus(task.dueDate);
  const query = searchQuery || "";
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
        <h4 className="task-title">{highlightText(task.title, query)}</h4>
        <span
          className={`task-priority priority-${task.priority.toLowerCase()}`}
        >
          {highlightText(task.priority, query)}
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
        <p className="task-description">
          {highlightText(task.description, query)}
        </p>
      )}
      <div className="task-meta">
        <span className="task-category">
          {highlightText(task.category, query)}
        </span>
        <span className={`task-due-date ${dueDateStatus}`}>
          {highlightText(formatDate(task.dueDate), query)}
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
