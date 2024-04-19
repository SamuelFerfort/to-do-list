# Doable
#### Video Demo: https://youtu.be/dv5Sr5_Qr2I

# Introduction
This project is a Todo application built entirely with vanilla CSS and JavaScript, enhanced with form validation. The application leverages npm for package management and webpack for bundling modules. It utilizes classes and local storage for managing Todo items. The inclusion of form validation ensures that users are prompted to enter valid input when adding new tasks, enhancing the overall user experience.

## Functionality and Design Choices
- **Project Class**: The Project class represents a Todo project with a title and an array of tasks. It includes methods to add and remove tasks, as well as toJSON() and fromJSON() methods for serialization and deserialization.
- **Task Class**: The Task class represents a Todo task with a description, priority, and due date. It includes methods to edit the task remove the task and toJSON() and fromJSON() methods for serialization and deserialization.
- **Form Validation**: Form validation is implemented to ensure that users enter valid input when adding new tasks. Error messages are displayed if the input is invalid.
- **Dynamic HTML Generation**: The main part of the HTML structure is generated dynamically using JavaScript. This approach enhances flexibility and allows for easier maintenance.
- **Local Storage**: Data persistence is achieved using the browser's local storage. Projects and tasks are serialized to JSON before being stored and deserialized when retrieved.
- **Webpack**: Webpack is utilized as the module bundler for this project. It enables efficient bundling of JavaScript, CSS, and other assets, optimizing the performance and loading times of the application.
- **Npm**: Npm serves as the package manager for this project, facilitating the installation and management of dependencies. It allows me to easily include external libraries like date-fns to format my date inputs.




