import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { sampleTasks } from "../data/constants";

export default function useTasks() {
  const [tasks, setTasks] = useState([...sampleTasks]);
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
  return { tasks, addTask };
}
