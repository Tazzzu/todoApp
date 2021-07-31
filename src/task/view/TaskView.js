import { emitter } from "../../utils/EventEmitter";
import { createNode, insertNode } from "../../utils/nodeUtils";
import { addHandlers } from "../../utils/handlerUtils";

class TaskView {
  init = () => {
    this.renderTaskContainer();

    emitter.addListener("taskWillRender", this.updateTaskView);
  };

  renderTaskContainer = () => {
    const taskContainerNodeElement = document.getElementById("taskContainer");
    taskContainerNodeElement.innerHTML = "";

    const taskContainerTemplate = this.returnTasksContainerByHtml();

    const taskContainer = createNode(taskContainerTemplate);
    insertNode(taskContainer, taskContainerNodeElement);

    const addTaskButton = document.getElementById("addRandomTask");
    addHandlers(addTaskButton, "click", async () => {
      emitter.emit("addNewTask");
    });

    const deleteAllTasks = document.getElementById("deleteAllTask");
    addHandlers(deleteAllTasks, "click", async () => {
      emitter.emit("deleteAllTasks");
    });
  };

  returnTasksContainerByHtml = () => {
    const taskContainer = `<div class="tasks">
    <h2 class="taskTitle">TO DO</h2>

    <div id="tasks"></div>

    <div class="actions">
      <button id="addRandomTask" class="btn btn-warning">Add Task</button>
      <button id="deleteAllTask" class="btn btn-danger">Delete all</button>
    </div>
  </div>`;

    return taskContainer;
  };

  updateTaskView = (tasks) => {
    const tasksTemplate = this.returnTaskItemByHtml(tasks);

    const tasksNodeElement = document.getElementById("tasks");
    tasksNodeElement.innerHTML = "";

    tasksTemplate.forEach((task) => {
      const nodeTask = createNode(task);
      insertNode(nodeTask, tasksNodeElement);
    });

    tasks.forEach((task) => {
      const doneIcon = document.getElementById(`doneIcon-${task.key}`);
      addHandlers(doneIcon, "click", () => {
        emitter.emit("taskWillDone", task.key);
      });

      const deleteIcon = document.getElementById(`deleteIcon-${task.key}`);
      addHandlers(deleteIcon, "click", () => {
        emitter.emit("taskWillDelete", task.key);
      });

      const switcher = document.getElementById(`taskSwitcher-${task.key}`);
      switcher.checked = task.isProgress;
      addHandlers(switcher, "click", () => {
        emitter.emit("taskWillChangeIsProgress", task.key);
      });
    });
  };

  returnTaskItemByHtml = (tasks) => {
    const template = tasks.map(
      (task) => `<div class="taskItem " id="${task.key}">
        <div class="form-check form-switch d-flex justify-content-between">
          <div>
            <input class="form-check-input switch" type="checkbox" id="taskSwitcher-${
              task.key
            }">
            <label class="form-check-label ${
              task.isDone ? "taskDone" : ""
            }" for="taskSwitcher-${task.key}">${task.activity}</label>
          </div>
          <div class="tasksActionsIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle me-2 doneIcon" viewBox="0 0 16 16" id="doneIcon-${
              task.key
            }">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash deleteIcon" viewBox="0 0 16 16" id="deleteIcon-${
              task.key
            }">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </div>
        </div>
      </div>`
    );

    return template;
  };
}

export const taskView = new TaskView();
