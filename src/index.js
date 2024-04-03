import style from "./styles.css";
import { format } from "date-fns";
import image from "./modify.svg";

const ProjectBtn = document.querySelector(".sideForm");
const ul = document.querySelector("ul");
const header = document.querySelector("header");
const main = document.querySelector("main");
const dialog = document.querySelector("dialog");
const editForm = document.querySelector(".editForm");
const priority = document.querySelector("#priority");
const description = document.querySelector("#description");
const date = document.querySelector("#taskDate");

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
  editTask(newDescription, newPriority, newDueDate) {
    this.description = newDescription;
    this.priority = newPriority;
    this.dueDate = newDueDate;
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

  // Change to the new project when adding it
  displayTasks(project);
  createTaskForm(project);
  button.addEventListener("click", () => {
    main.innerHTML = "";

    displayTasks(project);
    createTaskForm(project);

    document.querySelector(".projectName").value = "";
  });
}

function createTaskForm(project) {
  const taskForm = document.createElement("form");
  taskForm.classList.add("taskForm");
  const taskDescription = document.createElement("input");

  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.setAttribute("placeholder", "Select due date");

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.innerHTML = "+";

  // Create select element
  const prioritySelect = document.createElement("select");
  prioritySelect.classList.add("priority");

  // Create option elements for different priority levels
  const options = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
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
  taskForm.appendChild(dueDateInput);
  taskForm.appendChild(submitBtn);

  main.appendChild(taskForm);

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Parse the string date into a JavaScript Date object
    const dueDate = new Date(dueDateInput.value);
    if (!dueDate) return;
    // Format the date using date-fns
    const formattedDueDate = format(dueDate, "MM dd, yyyy");

    const task = new Task(
      taskDescription.value,
      prioritySelect.value,
      formattedDueDate
    );
    project.addTask(task);
    displayTasks(project);
    createTaskForm(project);
  });
}

function displayTasks(project) {
  main.innerHTML = "";
  header.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.innerHTML = `${project.title} Tasks`;
  header.appendChild(h1);
  const tasksLeft = document.createElement("h1");
  tasksLeft.innerHTML = `${project.tasks.length} Tasks Remaining`;
  main.appendChild(tasksLeft);
  project.tasks.forEach((task) => {
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");

    editBtn.addEventListener("click", () => {
      dialog.showModal();
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const dateEdit = new Date(date.value);
        if (!dateEdit) return;
        // Format the date using date-fns
        const formattedDate = format(dateEdit, "MM dd, yyyy");
        task.editTask(description.value, priority.value, formattedDate);
        displayTasks(project);
        createTaskForm(project);
        dialog.close();
      });
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = "X";
    deleteBtn.addEventListener("click", () => {
      project.removeTask(task);
      displayTasks(project);
    });
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = ` ${task.priority}`;
    if (task.priority == "High") {
      p.classList.add("high");
    } else if (task.priority == "Medium") {
      p.classList.add("medium");
    } else {
      p.classList.add("low");
    }
    const dateP = document.createElement("p");
    dateP.classList.add("date");
    dateP.innerHTML = `${task.dueDate}`;

    div.classList.add("taskDiv");
    div.innerHTML = `${task.description}`;
    div.appendChild(p);
    div.appendChild(dateP);
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);

    main.appendChild(div);
  });
}

function populatePage() {
  // Create a default project
  const defaultProject = new Project("Default Project");

  const testDate = new Date();
  // Format the date using date-fns
  const formatDate = format(testDate, "MM dd, yyyy");

  // Add tasks to the default project
  const task1 = new Task("Task 1", "High", formatDate);
  const task2 = new Task("Task 2", "Medium", formatDate);
  const task3 = new Task("Task 3", "Low", formatDate);

  defaultProject.addTask(task1);
  defaultProject.addTask(task2);
  defaultProject.addTask(task3);

  // Display the default project and its tasks
  displayTasks(defaultProject);
  createTaskForm(defaultProject);
}

// Call the function to populate the page when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  populatePage();
});
