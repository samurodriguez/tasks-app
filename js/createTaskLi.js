const ul = document.querySelector(".taskList");

const createTaskLi = (taskToCreate, tasks) => {
  const li = document.createElement("li");
  const descriptionParagraph = document.createElement("p");
  const createdAtParagraph = document.createElement("p");
  const doneInput = document.createElement("input");

  descriptionParagraph.textContent = taskToCreate.description;
  createdAtParagraph.textContent = new Date(
    taskToCreate.createdAt
  ).toLocaleString();
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

  li.append(descriptionParagraph, createdAtParagraph, doneInput);
  ul.append(li);
};

export default createTaskLi;
