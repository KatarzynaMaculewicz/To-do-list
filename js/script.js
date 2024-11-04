{
  let tasks = [];

  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="section__listItem">
            <button class="section__button js-done">
              ${task.done ? "✔" : ""}
            </button>
            <span class=${task.done ? "section__listItem--done" : ""}>
              ${task.content}
            </span>
            <button class="section__button section__buttonRemove js-remove">
              🗑
            </button>
        </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
    bindEvents();
  };

  const renderButtons = () => {};

  const render = () => {
    renderTasks();
    renderButtons();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskContent = newTaskInput.value.trim();

    if (newTaskContent === "") {
      newTaskInput.focus();
      return;
    }

    addNewTask(newTaskContent);
    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
