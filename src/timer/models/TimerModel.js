import { emitter } from "../../utils/EventEmitter";
import { minutesToMillis } from "../../utils/dateUtils";

export class Timer {
  constructor(options, timerView) {
    this.state = {
      timerValue: minutesToMillis(options.workTime || 25),
      workTime: options.workTime || 25,
      shortBreak: options.shortBreak || 5,
      longBreak: options.longBreak || 4,
      longBreakInterval: options.longBreakInterval || 15,
    };
    this.currentTimerValue = 0;
    this.timerView = timerView;
    this.timerCount = 0;
    this.timerIsStart = false;
    this.timerId = null;
    this.shortTimerId = null;
    this.longTimerId = null;
  }

  init = () => {
    emitter.addListener("workTimeWasChanged", this.changeWorkTimeValue);
    emitter.addListener("shortBreakWasChanged", this.changeShortBreakValue);
    emitter.addListener("longBreakWasChanged", this.changeLongBreakValue);
    emitter.addListener(
      "longBreakIntervalWasChanged",
      this.changeLongBreakInterval
    );
    emitter.addListener("togleTimer", this.togleTimer);

    this.timerView.init();

    emitter.emit("changeTimerValue", this.state.timerValue);
    emitter.emit("changeTimerOptions", this.state);
  };

  changeWorkTimeValue = (workTimeValue) => {
    this.state.workTime = workTimeValue;

    if (!this.timerIsStart) {
      this.state.timerValue = minutesToMillis(workTimeValue);
      emitter.emit("changeTimerValue", this.state.timerValue);
    }

    emitter.emit("changeTimerOptions", this.state);
  };

  changeShortBreakValue = (shortBreakValue) => {
    this.state.shortBreak = shortBreakValue;

    emitter.emit("changeTimerOptions", this.state);
  };

  changeLongBreakValue = (longBreakValue) => {
    this.state.longBreak = longBreakValue;

    emitter.emit("changeTimerOptions", this.state);
  };

  changeLongBreakInterval = (longBreakIntervalValue) => {
    this.state.longBreakInterval = longBreakIntervalValue;

    emitter.emit("changeTimerOptions", this.state);
  };

  handleStartShortTimer = () => {
    this.currentTimerValue = 0;
    emitter.emit("timerTitleWasChange", "Short break");

    this.shortTimerId = setInterval(() => {
      this.currentTimerValue = this.currentTimerValue + 1000;

      if (minutesToMillis(this.state.shortBreak) < this.currentTimerValue) {
        clearInterval(this.shortTimerId);
        this.shortTimerId = null;

        this.handleStartTimer();
        return;
      }

      if (this.currentTimerValue) {
        emitter.emit(
          "changeTimerValue",
          minutesToMillis(this.state.shortBreak) - this.currentTimerValue
        );
      }
    }, 1000);
  };

  handleStartLongBreak = () => {
    this.currentTimerValue = 0;
    this.timerCount = 0;
    emitter.emit("timerTitleWasChange", "Long break");

    this.longTimerId = setInterval(() => {
      this.currentTimerValue = this.currentTimerValue + 1000;

      if (minutesToMillis(this.state.longBreak) < this.currentTimerValue) {
        clearInterval(this.longTimerId);
        this.longTimerId = null;

        this.handleStartTimer();
        return;
      }

      if (this.currentTimerValue) {
        emitter.emit(
          "changeTimerValue",
          minutesToMillis(this.state.longBreak) - this.currentTimerValue
        );
      }
    }, 1000);
  };

  handleStartTimer = () => {
    this.currentTimerValue = 0;

    emitter.emit("timerTitleWasChange", "Work");

    this.timerId = setInterval(() => {
      this.currentTimerValue = this.currentTimerValue + 1000;

      if (this.state.timerValue < this.currentTimerValue) {
        clearInterval(this.timerId);
        this.timerId = null;
        this.timerCount = this.timerCount + 1;

        if (this.timerCount >= this.state.longBreak) {
          clearInterval(this.timerId);
          this.timerId = null;

          this.handleStartLongBreak();
          return;
        }

        this.handleStartShortTimer();
        return;
      }

      if (this.currentTimerValue) {
        emitter.emit(
          "changeTimerValue",
          this.state.timerValue - this.currentTimerValue
        );
      }
    }, 1000);
  };

  handleStopTimer = () => {
    clearInterval(this.timerId);
    clearInterval(this.shortTimerId);
    clearInterval(this.longTimerId);
    this.currentTimerValue = 0;
    this.timerCount = 0;
    this.state.timerValue = minutesToMillis(this.state.workTime);
    emitter.emit("changeTimerValue", this.state.timerValue);
    emitter.emit("timerTitleWasChange", "Work");
  };

  togleTimer = (isStart) => {
    this.timerIsStart = isStart;
    emitter.emit("timerWasTogle", this.timerIsStart);

    if (isStart) {
      this.handleStartTimer();
      return;
    }

    this.handleStopTimer();
  };
}
