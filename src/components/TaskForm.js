import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { categories } from "../data/constants";
import "./TaskForm.css";

function TaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "work",
    dueDate: "",
  });
  const [error, setError] = useState("");
  const { addTask } = useTaskContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.dueDate) {
      setError("Due date is required");
      return;
    }
    setError("");
    console.log(formData);
    addTask(formData);
  };

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            name="title"
            onChange={(e) =>
              setFormData((s) => ({ ...s, title: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description</label>
          <textarea
            type="text"
            placeholder="Task Description"
            value={formData.description}
            rows={4}
            maxLength={500}
            name="description"
            onChange={(e) =>
              setFormData((s) => ({ ...s, description: e.target.value }))
            }
          />
          <p className="character-count">{formData.description.length}/500</p>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData((s) => ({ ...s, priority: e.target.value }))
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="category"
            onChange={(e) =>
              setFormData((s) => ({ ...s, category: e.target.value }))
            }
          >
            Task Category
          </label>
          <select name="category">
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="due date"
            onChange={(e) =>
              setFormData((s) => ({ ...s, dueDate: e.target.value }))
            }
            required
          >
            Due Date
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData((s) => ({ ...s, dueDate: e.target.value }))
            }
          />
        </div>
        {error && <div className="error-msg">{error}</div>}
        <div>
          <button type="submit" className="submit-button">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;

// Add new tasks with title, description, priority (High/Medium/Low), due date, and category
