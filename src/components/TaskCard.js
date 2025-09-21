import React from "react";

function TaskCard({ task }) {
  return (
    <div>
      <h4>{task.title}</h4>
      {task.description && <p>{task.description}</p>}
      <p>{task.priority}</p>
      <p>{task.category}</p>
      <p>{task.dueDate}</p>
    </div>
  );
}

export default TaskCard;
