import style from "./styles.css";

const ProjectBtn = document.querySelector(".sideForm");
const ul = document.querySelector("ul");
const header = document.querySelector("header");
const main = document.querySelector("main");

class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}

class Task {
  constructor(description, priority, dueDate) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

ProjectBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  newProject();
});

function newProject() {
  const li = document.createElement("li");
  const button = document.createElement("button");
  let projectName = document.querySelector(".projectName").value;

  if (!projectName) return;

  button.innerHTML = projectName;

  ul.appendChild(li);
  li.appendChild(button);
  const project = new Project(projectName);

  button.addEventListener("click", () => {
    main.innerHTML = "";

    displayTasks(project);
    createTaskForm(project);
    
    document.querySelector(".projectName").value = "";
  });
}

function createTaskForm(project) {
  const taskForm = document.createElement("form");
  taskForm.classList.add("taskForm")
  const taskDescription = document.createElement("input");

  // Create select element
  const prioritySelect = document.createElement("select");
  prioritySelect.classList.add("priority");

  // Create option elements for different priority levels
  const options = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.label;
    prioritySelect.appendChild(option);
  });
  // Append it to main after the tasks

  taskForm.appendChild(taskDescription);
  taskForm.appendChild(prioritySelect);
  main.appendChild(taskForm);

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = new Task(taskDescription.value, prioritySelect.value)
    project.addTask(task);
    displayTasks(project);
    createTaskForm(project);
     
  })
}

function displayTasks(project) {
  main.innerHTML = "";
  header.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.innerHTML = `${project.title} Tasks`;
  header.appendChild(h1);
  const tasksLeft = document.createElement("h1");
  tasksLeft.innerHTML = `${project.tasks.length} Tasks Remaining`;
  project.tasks.forEach((task) => {
    const div = document.createElement("div");
    div.innerHTML = `${task.description} ${task.priority}`;
    main.appendChild(div);
  });
}

