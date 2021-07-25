import { taskRepository } from "../repository/TaskRepository";

class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  getTasks = () => {
    return this.taskRepository.getTasks();
  };

  addRandomTask = () => {
    return this.taskRepository.addRandomTask();
  };

  doneTask = (id) => {
    return this.taskRepository.doneTask(id);
  };

  deleteTask = (id) => {
    return this.taskRepository.deleteTask(id);
  };

  taskChangeIsProgress = (id) => {
    return this.taskRepository.taskChangeIsProgress(id);
  };

  deleteAllTasks = () => {
    return this.taskRepository.deleteAllTasks();
  };
}

export const taskService = new TaskService(taskRepository);
