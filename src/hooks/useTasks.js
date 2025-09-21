import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { sampleTasks, TASKS_STORAGE_KEY } from "../data/constants";

const loadTasksFromStorage = () => {
  try {
    const data = localStorage.getItem(TASKS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    } else {
      return [...sampleTasks];
    }
  } catch (e) {
    return [...sampleTasks];
  }
};
export default function useTasks() {
  const [tasks, setTasks] = useState(loadTasksFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  const addTask = useCallback((task) => {
    setTasks((prev) => [
      { ...task, id: uuid(), completed: false, createdAt: Date.now() },
      ...prev,
    ]);
    console.log("addTask called", [
      { ...task, id: uuid(), completed: false, createdAt: Date.now() },
      ...tasks,
    ]);
  });
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id != id));
  });
  const editTask = useCallback((updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  });
  return { tasks, addTask, deleteTask, editTask };
}
