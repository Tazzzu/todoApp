import "./style.scss";
import { TaskController } from "./task/controllers/TaskController";
import { taskService } from "./task/services/TaskService";
import { Task } from "./task/models/TaskModel";
import { taskView } from "./task/view/TaskView";
import { Timer } from "./timer/models/TimerModel";
import { timerView } from "./timer/view/TimerView";
import { TimerController } from "./timer/controllers/timerController";

const initApp = () => {
  const taskController = new TaskController(taskService);
  taskController.init();
  const timerController = new TimerController();
  timerController.init();

  const task = new Task(taskView);
  task.init();
  const timer = new Timer({}, timerView);
  timer.init();
};

initApp();
