import { emitter } from "../../utils/EventEmitter";
import { createNode, insertNode } from "../../utils/nodeUtils";
import { millisToMinutesAndSeconds } from "../../utils/dateUtils";
import { addHandlers } from "../../utils/handlerUtils";

class TimerView {
  init = () => {
    this.renderTimerContainer();

    emitter.addListener("changeTimerValue", this.renderTimerValue);
    emitter.addListener("changeTimerOptions", this.renderTimerOptions);
    emitter.addListener("timerWasTogle", this.togleStartTimerButton);
    emitter.addListener("timerTitleWasChange", this.changeTimerTitle);
  };

  renderTimerContainer = () => {
    const timerContainerNodeElement = document.getElementById("timerContainer");
    timerContainerNodeElement.innerHTML = "";

    const timerTemplate = this.returnTimerContainerByHtml();

    const taimer = createNode(timerTemplate);
    insertNode(taimer, timerContainerNodeElement);

    const startTimerButton = document.getElementById("startTimer");
    addHandlers(startTimerButton, "click", () => {
      emitter.emit("togleTimer", true);
    });

    const stopTimerButton = document.getElementById("stopTimer");
    addHandlers(stopTimerButton, "click", () => {
      emitter.emit("togleTimer", false);
    });
  };

  returnTimerContainerByHtml = () => {
    const taskContainer = `
      <div class="timer">
        <h2 class="timerTitle" id="timerTitle">Work</h2>
        <div id="timerValueContainer"></div>
        <div id="timerOptions"></div>
        <div id="timerActionsButtons">
          <div class="row mt-3">
            <div class="col">
              <button id="startTimer" class="btn btn-warning w-100">Start</button>
            </div>
        
            <div class="col">
              <button id="stopTimer" class="btn btn-danger w-100">Stop</button>
            </div>
          </div>
        </div>
      </div>`;

    return taskContainer;
  };

  renderTimerValue = (timerValue) => {
    const timerValueContainerNodeElement = document.getElementById(
      "timerValueContainer"
    );
    timerValueContainerNodeElement.innerHTML = "";

    const timerValueTemplate = this.returnTimerValueByHtml(
      millisToMinutesAndSeconds(timerValue)
    );
    const taimerValue = createNode(timerValueTemplate);
    insertNode(taimerValue, timerValueContainerNodeElement);
  };

  returnTimerValueByHtml = (timerValue) => {
    const template = `<div class="timerValue">${timerValue}</div>`;
    return template;
  };

  renderTimerOptions = (options) => {
    const timerContainerNodeElement = document.getElementById("timerOptions");
    timerContainerNodeElement.innerHTML = "";

    const timerTemplate = this.returnTimerOptionsByHtml(options);

    const taimer = createNode(timerTemplate);
    insertNode(taimer, timerContainerNodeElement);

    const workTime = document.getElementById("workTime");
    addHandlers(workTime, "change", (e) => {
      emitter.emit("workTimeWillChange", e.target.value);
    });

    const shortBreak = document.getElementById("shortBreak");
    addHandlers(shortBreak, "change", (e) => {
      emitter.emit("shortBreakWillChange", e.target.value);
    });

    const longBreak = document.getElementById("longBreak");
    addHandlers(longBreak, "change", (e) => {
      emitter.emit("longBreakWillChange", e.target.value);
    });

    const longBreakInterval = document.getElementById("longBreakInterval");
    addHandlers(longBreakInterval, "change", (e) => {
      emitter.emit("longBreakIntervalWillChange", e.target.value);
    });
  };

  returnTimerOptionsByHtml = (options) => {
    const { workTime, shortBreak, longBreak, longBreakInterval } = options;
    const template = `
      <div class="row">
        <div class="col-12 col-sm-6">
          <div>
            <label for="workTime" class="form-label">Work Time</label>
            <input class="form-control" id="workTime" placeholder="25" value=${workTime}>
          </div>
          <div class="mt-2">
            <label for="shortBreak" class="form-label">Short break</label>
            <input class="form-control" id="shortBreak" placeholder="25" value=${shortBreak}>
          </div>
        </div>

        <div class="col-12 col-sm-6">
          <div>
            <label for="longBreak" class="form-label">Long break</label>
            <input class="form-control" id="longBreak" placeholder="25" value=${longBreak}>
          </div>
          <div class="mt-2">
            <label for="longBreakInterval" class="form-label">Long break interval</label>
            <input class="form-control" id="longBreakInterval" placeholder="25" value=${longBreakInterval}>
          </div>
        </div>
      </div>
    `;

    return template;
  };

  togleStartTimerButton = (isStart) => {
    const startTimerButton = document.getElementById("startTimer");
    if (isStart) {
      startTimerButton.setAttribute("disabled", true);
      return;
    }

    startTimerButton.removeAttribute("disabled");
  };

  changeTimerTitle = (title) => {
    const timerTitle = document.getElementById("timerTitle");
    timerTitle.innerHTML = title;
  };
}

export const timerView = new TimerView();
