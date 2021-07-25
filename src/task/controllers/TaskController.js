import { taskService } from "../services/TaskService";
import { emitter } from "../../utils/EventEmitter";

export class TaskController {
  constructor(taskService, localStorageService) {
    this.taskService = taskService;
    this.localStorageService = localStorageService;
  }

  init = () => {
    emitter.addListener("addNewTask", this.addRandomTask);
    emitter.addListener("getTasks", this.getTasks);
    emitter.addListener("taskWillDone", this.markTaskAsDone);
    emitter.addListener("taskWillDelete", this.deleteTask);
    emitter.addListener("taskWillChangeIsProgress", this.taskChangeIsProgress);
    emitter.addListener("deleteAllTasks", this.deleteAllTasks);
  };

  addRandomTask = async () => {
    const newTask = await this.taskService.addRandomTask();
    emitter.emit("tasksWasUpdate", [newTask]);
  };

  getTasks = async () => {
    const tasks = await this.taskService.getTasks();

    emitter.emit("tasksWasUpdate", tasks);
  };

  markTaskAsDone = async (id) => {
    const isDone = await this.taskService.doneTask(id);
    if (isDone) {
      emitter.emit("taskWasDone", id);
    }
  };

  deleteTask = async (id) => {
    const isDelete = await this.taskService.deleteTask(id);
    if (isDelete) {
      emitter.emit("taskWasDelete", id);
    }
  };

  taskChangeIsProgress = async (id) => {
    const isChange = await this.taskService.taskChangeIsProgress(id);
    if (isChange) {
      emitter.emit("taskWasChangeIsProgress", id);
    }
  };

  deleteAllTasks = async () => {
    const isDelete = await this.taskService.deleteAllTasks();
    if (isDelete) {
      emitter.emit("allTasksWasDelete");
    }
  };
}

export const taskController = new TaskController(taskService);
