import { emitter } from "../../utils/EventEmitter";

export class Task {
  constructor(taskView) {
    this.tasks = [];
    this.taskView = taskView;
  }

  init = () => {
    emitter.addListener("tasksWasUpdate", this.addTasks);
    emitter.addListener("taskWasDone", this.markTaskWasDone);
    emitter.addListener("taskWasDelete", this.deleteTask);
    emitter.addListener("taskWasChangeIsProgress", this.changeTaskProgress);
    emitter.addListener("allTasksWasDelete", this.deleteAllTasks);

    emitter.emit("getTasks");
    this.taskView.init();
  };

  addTasks = (tasks) => {
    this.tasks.push(...tasks);

    emitter.emit("taskWillRender", this.tasks);
  };

  markTaskWasDone = (id) => {
    this.tasks.forEach((task) => {
      if (task.key === id) {
        task.isDone = true;
      }
    });

    emitter.emit("taskWillRender", this.tasks);
  };

  deleteTask = (id) => {
    const tasks = this.tasks.filter((task) => task.key !== id);
    this.tasks = [...tasks];

    emitter.emit("taskWillRender", this.tasks);
  };

  changeTaskProgress = (id) => {
    this.tasks.forEach((task) => {
      if (task.key === id) {
        task.isProgress = !task.isProgress;
      }
    });

    emitter.emit("taskWillRender", this.tasks);
  };

  deleteAllTasks = () => {
    this.tasks = [];

    emitter.emit("taskWillRender", this.tasks);
  };
}
