import { emitter } from "../../utils/EventEmitter";

export class TimerController {
  init = () => {
    emitter.addListener("workTimeWillChange", this.changeWorkTime);
    emitter.addListener("shortBreakWillChange", this.changeShortBreak);
    emitter.addListener("longBreakWillChange", this.changeLongBreak);
    emitter.addListener(
      "longBreakIntervalWillChange",
      this.changeLongBreakInterval
    );
  };

  changeWorkTime = (value) => {
    emitter.emit("workTimeWasChanged", value);
  };

  changeShortBreak = (value) => {
    emitter.emit("shortBreakWasChanged", value);
  };

  changeLongBreak = (value) => {
    emitter.emit("longBreakWasChanged", value);
  };

  changeLongBreakInterval = (value) => {
    emitter.emit("longBreakIntervalWasChanged", value);
  };
}

export const timerController = new TimerController();
