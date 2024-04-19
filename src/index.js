import style from "./styles.css";
import { format } from "date-fns";
import image from "./modify.svg";

const ProjectBtn = document.querySelector(".sideForm");
const ul = document.querySelector("ul");
const header = document.querySelector("header");
const main = document.querySelector("main");
const dialog = document.querySelector("dialog");
const editForm = document.querySelector(".editForm");
const prioritySelect = document.querySelector("#priority");
const description = document.querySelector("#description");
const date = document.querySelector("#taskDate");
let projects = [];
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
  toJSON() {
    return {
      title: this.title,
      tasks: this.tasks,
    };
  }
  static fromJSON(json) {
    const project = new Project(json.title);
    project.tasks = json.tasks.map(
      (task) => new Task(task.description, task.priority, task.dueDate)
    );
    return project;
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
  toJSON() {
    return {
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
    };
  }

  // Deserialize the JSON object into a Task object
  static fromJSON(json) {
    return new Task(json.description, json.priority, json.dueDate);
  }
}

ProjectBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  let projectName = document.querySelector(".projectName").value;
  if (!projectName) return;
  const project = new Project(projectName);
  projects.push(project);
  populatePage(projects);
  saveToLocalStorage();
  document.querySelector(".projectName").value = "";
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
  document.querySelector(".projectName").value = "";
  projects.push(project);
  saveToLocalStorage();

  button.addEventListener("click", () => {
    main.innerHTML = "";

    displayTasks(project);
    createTaskForm(project);
  });
}

function createTaskForm(project) {
  const taskForm = document.createElement("form");
  taskForm.classList.add("taskForm");
  const taskDescription = document.createElement("input");
  taskDescription.setAttribute("type", "text");
  taskDescription.placeholder = "New Task";
  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.setAttribute("placeholder", "Select due date");
  const errorSpan = document.createElement("span");
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
    if (taskDescription.value === "" || taskDescription.value == null) {
      errorSpan.innerHTML = "Task Required!";
      main.appendChild(errorSpan);
      taskDescription.classList.add("error");
      return;
    }
    if (taskDescription.value.length > 10) {
      errorSpan.innerHTML = "Too long!";
      main.appendChild(errorSpan);
      taskDescription.classList.add("error");
      return;
    }
    if (!dueDateInput.value) {
      dueDateInput.classList.add("error");
      errorSpan.classList.add("dateError");
      errorSpan.innerHTML = "Invalid Date";
      main.appendChild(errorSpan);
      return;
    }
    // Format the date using date-fns
    const formattedDueDate = format(dueDate, "MM-dd-yyyy");
    console.log(taskDescription.value.length);

    const task = new Task(
      taskDescription.value,
      prioritySelect.value,
      formattedDueDate
    );
    project.addTask(task);
    displayTasks(project);
    createTaskForm(project);
    saveToLocalStorage();

    // Save data to localStorage after removing a task
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
    // taskContainer
    const div = document.createElement("div");
    // taskBot includes priority delete and edit button

    const taskBot = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const priority = document.createElement("p");
    taskBot.appendChild(priority);
    taskBot.appendChild(editBtn);
    taskBot.appendChild(deleteBtn);
    taskBot.classList.add("bot");

    // taskTop Includes title and date

    const taskTop = document.createElement("div");
    const taskTitle = document.createElement("h4");
    const dateP = document.createElement("p");
    taskTop.classList.add("top");
    taskTop.appendChild(taskTitle);
    taskTop.appendChild(dateP);
    taskTitle.innerHTML = `${task.description}`;
    editBtn.classList.add("edit");

    editBtn.addEventListener("click", () => {
      dialog.showModal();
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const dateEdit = new Date(date.value);
        if (!dateEdit) return;
        // Format the date using date-fns
        const formattedDate = format(dateEdit, "MM-dd-yyyy");
        task.editTask(description.value, prioritySelect.value, formattedDate);
        displayTasks(project);
        createTaskForm(project);
        dialog.close();
        editForm.reset();
        saveToLocalStorage();
      });
    });
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = "X";
    deleteBtn.addEventListener("click", () => {
      project.removeTask(task);
      displayTasks(project);
      createTaskForm(project);
      saveToLocalStorage();
    });
    priority.innerHTML = ` ${task.priority}`;
    if (task.priority == "High") {
      priority.classList.add("high");
    } else if (task.priority == "Medium") {
      priority.classList.add("medium");
    } else {
      priority.classList.add("low");
    }
    dateP.classList.add("date");
    dateP.innerHTML = `${task.dueDate}`;

    div.classList.add("taskDiv");
    div.appendChild(taskTop);
    div.appendChild(taskBot);

    main.appendChild(div);
  });
}

const code = new Project("Code");

// Add tasks to the default project
const task1 = new Task("JavaScript", "High", "11-03-2024");
const task2 = new Task("Python", "Medium", "11-03-2024");
const task3 = new Task("C", "Low", "11-03-2024");

code.addTask(task1);
code.addTask(task2);
code.addTask(task3);

const gym = new Project("Gym");

const gymTask1 = new Task("Cardio", "High", "11-04-2024");
const gymTask2 = new Task("Bench Press", "Medium", "11-03-2024");
const gymTask3 = new Task("Lifting", "Low", "11-03-2024");

gym.addTask(gymTask1);
gym.addTask(gymTask2);
gym.addTask(gymTask3);

function populatePage(projects) {
  ul.innerHTML = "";
  projects.forEach((project, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.classList.add("deleteProjectBtn");
    deleteProjectBtn.innerHTML = "X";

    button.innerHTML = project.title;

    ul.appendChild(li);
    li.appendChild(button);
    li.appendChild(deleteProjectBtn);

    button.addEventListener("click", () => {
      main.innerHTML = "";

      displayTasks(project);
      createTaskForm(project);
      // Save data to localStorage after removing a task
      document.querySelector(".projectName").value = "";
    });
    // Display the default project and its tasks
    deleteProjectBtn.addEventListener("click", () => {
      projects.splice(index, 1);
      main.innerHTML = "";
      header.innerHTML = "";
      populatePage(projects);

      saveToLocalStorage();
    });
    displayTasks(project);
    createTaskForm(project);
  });
}

// Call the function to populate the page when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  retrieveStoredProject();
});

function saveToLocalStorage() {
  const projectsJSON = JSON.stringify(
    projects.map((project) => {
      return {
        title: project.title,
        tasks: project.tasks.map((task) => task.toJSON()), // Serialize tasks
      };
    })
  );
  localStorage.setItem("projects", projectsJSON);
}

function retrieveStoredProject() {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    const projectsData = JSON.parse(storedProjects);
    projects = projectsData.map((projectData) => {
      const project = new Project(projectData.title);
      project.tasks = projectData.tasks.map((taskData) =>
        Task.fromJSON(taskData)
      ); // Deserialize tasks
      return project;
    });
  } else {
    projects = [];
  }

  populatePage(projects);
}
