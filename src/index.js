import "./style.scss";
import { TaskController } from "./task/controllers/TaskController";
import { taskService } from "./task/services/TaskService";
import { Task } from "./task/models/TaskModel";
import { taskView } from "./task/view/TaskView";

const initApp = () => {
  const taskController = new TaskController(taskService);
  taskController.init();

  const task = new Task(taskView);
  task.init();
};

initApp();
