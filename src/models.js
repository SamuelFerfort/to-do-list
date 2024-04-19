export class Project {
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
  
  export class Task {
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