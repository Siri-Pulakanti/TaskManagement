import { createContext, useContext } from "react";
import useTasks from "../hooks/useTasks";

const TaskContext = createContext();
export function TaskProvider({ children }) {
  const taskData = useTasks();
  return (
    <TaskContext.Provider value={taskData}>{children}</TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
