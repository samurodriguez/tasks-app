import createTaskLi from "./createTaskLi";

const ul = document.querySelector(".taskList");

const createTaskList = (tasks) => {
  ul.innerHTML = "";

  for (const task of tasks) {
    createTaskLi(task);
  }
};

export default createTaskList;
