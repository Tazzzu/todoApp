import { requestManager } from "../../utils/RequestManager";

class TaskRepository {
  addRandomTask = async () => {
    const result = await requestManager.request(
      "https://www.boredapi.com/api/activity",
      "GET"
    );
    const data = await result.json();

    let tasksFromLS = localStorage.getItem("tasks");

    if (!tasksFromLS) {
      tasksFromLS = [];
    } else {
      tasksFromLS = JSON.parse(tasksFromLS);
    }

    localStorage.setItem(
      "tasks",
      JSON.stringify([{ key: data.key }, ...tasksFromLS])
    );

    return data;
  };

  getTasks = async () => {
    let tasksFromLS = localStorage.getItem("tasks");

    if (!tasksFromLS) {
      return [];
    }

    tasksFromLS = JSON.parse(tasksFromLS);

    const promises = tasksFromLS.map(async (taskFromLS) => {
      const result = await requestManager.request(
        `https://www.boredapi.com/api/activity?key=${taskFromLS.key}`,
        "GET"
      );
      const data = await result.json();
      data.isDone = taskFromLS.isDone;
      data.isProgress = taskFromLS.isProgress;
      return data;
    });

    return await Promise.all(promises);
  };

  doneTask = (id) => {
    let tasksFromLS = localStorage.getItem("tasks");
    if (!tasksFromLS) {
      return false;
    }

    tasksFromLS = JSON.parse(tasksFromLS);
    tasksFromLS.forEach((taskFromLS) => {
      if (id === taskFromLS.key) {
        taskFromLS.isDone = true;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasksFromLS));
    return true;
  };

  deleteTask = (id) => {
    let tasksFromLS = localStorage.getItem("tasks");
    if (!tasksFromLS) {
      return false;
    }

    tasksFromLS = JSON.parse(tasksFromLS);
    const newTasks = tasksFromLS.filter((taskFromLS) => taskFromLS.key !== id);

    localStorage.setItem("tasks", JSON.stringify(newTasks));
    return true;
  };

  taskChangeIsProgress = (id) => {
    let tasksFromLS = localStorage.getItem("tasks");
    if (!tasksFromLS) {
      return false;
    }

    tasksFromLS = JSON.parse(tasksFromLS);
    tasksFromLS.forEach((taskFromLS) => {
      if (id === taskFromLS.key) {
        taskFromLS.isProgress = true;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasksFromLS));
    return true;
  };

  deleteAllTasks = () => {
    localStorage.removeItem("tasks");

    return true;
  };
}

export const taskRepository = new TaskRepository();
