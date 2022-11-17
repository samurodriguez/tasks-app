"use strict";

import createTaskLi from "./createTaskLi.js";
import createTaskList from "./createTaskList";

const form = document.querySelector("form");
const cleanTasksBtn = document.querySelector(".cleanTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

createTaskList(tasks);

cleanTasksBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => {
    return task.done === false;
  });

  createTaskList(tasks);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { description, priority } = Object.fromEntries(
    new FormData(event.target)
  );

  const newTask = {
    description: description,
    priority: priority,
    createdAt: Date.now(),
    done: false,
  };

  tasks.push(newTask);

  createTaskLi(newTask, tasks);

  event.target.reset();
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
