# Doable: A Todo Application

Doable is a simple and intuitive Todo application built entirely with vanilla CSS and JavaScript. It aims to provide users with a hassle-free experience for managing their tasks, enhanced with form validation to ensure data integrity. Leveraging modern web development practices, Doable utilizes npm for package management and webpack for bundling modules, making it easy to maintain and extend.

## Features and Design Choices

### 1. **Simplicity and Usability**

- Doable prioritizes simplicity and usability, offering an intuitive interface for users to manage their tasks effortlessly.
- The minimalist design ensures that users can focus on their tasks without distractions, promoting productivity.

### 2. **Project and Task Management**

- Doable allows users to create multiple projects, each containing a list of tasks.
- Users can easily add, edit, and delete tasks within each project, providing flexibility in task management.

### 3. **Data Persistence**

- The application leverages the browser's local storage to persist user data, ensuring that tasks and projects are saved even after the browser is closed.
- Serialized data is stored efficiently in JSON format, allowing for seamless retrieval and manipulation.

## Technical Details

### 1. **Webpack and npm Integration**

- Doable utilizes webpack as the module bundler and npm as the package manager.
- webpack facilitates efficient bundling of JavaScript, CSS, and other assets, optimizing performance and loading times.
- npm simplifies dependency management, allowing for easy installation and updating of project dependencies.

### 2. **Class-Based Architecture**

- The application architecture follows a class-based approach, enhancing code organization and maintainability.
- Classes are used to represent projects and tasks, encapsulating related data and functionality within each object.

### 3. **Dynamic HTML Generation**

- The main HTML structure is generated dynamically using JavaScript, providing flexibility and ease of maintenance.
- DOM manipulation techniques are employed to create, update, and remove HTML elements based on user interactions.

### 4. **Form Validation with JavaScript**

- JavaScript is utilized to implement form validation, ensuring that user input meets specified criteria before submission.
- Custom validation logic is applied to validate task descriptions, priorities, and due dates, enhancing the overall user experience.
- Error messages are displayed in real-time, providing immediate feedback to users and guiding them to correct any invalid inputs.

## Technologies Used

### 1. Vanilla CSS

Doable utilizes vanilla CSS for styling the user interface. By avoiding reliance on external CSS frameworks, the application achieves lightweight and customizable styling tailored to its specific requirements. The website layout is made with css grid including a sidebar a header and a main part where the JavaScript is dynamically generated.

### 2. Vanilla JavaScript

JavaScript is the backbone of Doable, providing the logic and interactivity necessary for task management and user interaction. With a focus on vanilla JavaScript, the application ensures maximum compatibility and performance across different browsers and environments. I separated the classes from the logic in different files using imports and exports leveraging modular design to make the project easier to manage.

### 3. Local Storage API

The Local Storage API is employed to persist user data within the browser. By storing tasks and projects locally, Doable ensures that users can access their task lists even after closing the browser or navigating away from the application.
