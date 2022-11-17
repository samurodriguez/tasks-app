"use strict";

const form = document.querySelector("form");
const cleanTasksBtn = document.querySelector(".cleanTasks");
const ul = document.querySelector("ul");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const createTaskLi = (taskToCreate) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const descriptionParagraph = document.createElement("p");
  const createdAtParagraph = document.createElement("p");
  const doneInput = document.createElement("input");

  descriptionParagraph.textContent = taskToCreate.description;
  createdAtParagraph.textContent = new Date(taskToCreate.createdAt)
    .toLocaleString()
    .replace(",", "");
  doneInput.type = "checkbox";
  doneInput.addEventListener("change", (event) => {
    // event.target.parentElement.firstChild.classList.toggle("done");
    descriptionParagraph.classList.toggle("done");

    const taskIndex = tasks.findIndex((task) => {
      return task.createdAt === taskToCreate.createdAt;
    });

    tasks[taskIndex].done = event.target.checked;

    console.log(tasks);
  });

  if (taskToCreate.priority === "important") {
    descriptionParagraph.classList.add("important");
  }

  if (taskToCreate.done) {
    descriptionParagraph.classList.add("done");
    doneInput.checked = true;
  }

  div.append(descriptionParagraph, createdAtParagraph);
  li.append(doneInput, div);
  ul.append(li);
};

const createTaskList = (tasks) => {
  ul.innerHTML = "";

  for (const task of tasks) {
    createTaskLi(task);
  }
};

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

  createTaskLi(newTask);

  event.target.reset();
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
