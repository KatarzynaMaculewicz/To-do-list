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

  const markTasksAsDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
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
        <li class="section__listItem ${hideDoneTasks && task.done ? "section__listItem--hiden" : ""}">
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
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const bindButtonsEvents = () => {
    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );
    const markTasksAsDoneButton = document.querySelector(".js-markAsDoneTasks");

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }

    if (markTasksAsDoneButton) {
      markTasksAsDoneButton.addEventListener("click", markTasksAsDone);
    }
  };

  const renderButtons = () => {
    let htmlButtons = "";

    {
      !tasks.length
        ? (htmlButtons = "")
        : (htmlButtons += `
          <button class="section__toggleTasksButton js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
          </button>
          <button class="section__toggleTasksButton js-markAsDoneTasks"
          ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszyskie
          </button>
      `);
    }

    document.querySelector(".js-toggleTasksButtons").innerHTML = htmlButtons;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindEvents();
    bindButtonsEvents();
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
