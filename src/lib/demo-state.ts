import { buyerCase, type Task } from "@/data/case";
import { properties } from "@/data/properties";

export function restoredTasks(value: unknown): Task[] {
  if (!Array.isArray(value)) return buyerCase.tasks;
  return buyerCase.tasks.map(task => {
    const saved = value.find(item => item && item.id === task.id);
    return saved && ["todo", "in_progress", "done"].includes(saved.status) ? { ...task, status: saved.status } : task;
  });
}
export function restoredPropertyIds(value: unknown): string[] | undefined {
  return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === "string" && properties.some(p => p.id === id)))] : undefined;
}
export function nextTask(tasks: Task[]) {
  return tasks.filter(t => t.status !== "done").sort((a,b) => a.due.localeCompare(b.due))[0];
}