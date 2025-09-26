import { v4 as uuid } from "uuid";

const TASKS_STORAGE_KEY = "tasks";

const categories = [
  { id: "work", name: "Work", color: "#7c3aed" },
  { id: "personal", name: "Personal", color: "#059669" },
  { id: "shopping", name: "Shopping", color: "#dc2626" },
  { id: "family", name: "Family", color: "#2563eb" },
];

const sampleTasks = [
  {
    id: uuid(),
    title: "Finish interview challenge",
    description: "Implement core features and demo",
    priority: "High",
    dueDate: "2025-09-20",
    category: "work",
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: uuid(),
    title: "Grocery: milk & eggs",
    description: "",
    priority: "Low",
    dueDate: "2025-09-19",
    category: "shopping",
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: uuid(),
    title: "Call mom",
    description: "Weekly check in",
    priority: "Medium",
    dueDate: "2025-09-21",
    category: "personal",
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: uuid(),
    title: "Read design docs",
    description: "Read PRD for next sprint",
    priority: "Medium",
    dueDate: "2025-09-25",
    category: "work",
    completed: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
  {
    id: uuid(),
    title: "Buy birthday gift",
    description: "For Siri",
    priority: "High",
    dueDate: "2025-09-20",
    category: "personal",
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 30,
  },
];

export { categories, sampleTasks, TASKS_STORAGE_KEY };
