# CLI App for Course Offerings Management
This Command Line Interface (CLI) application allows you to manage course offerings and registrations for employees. It provides various features such as adding course offerings, registering employees for courses, allotting seats, and canceling registrations.

## Getting Started
To use this CLI app, follow these steps:

1. Clone the repository and install the dependencies.

```
$ git clone https://github.com/your-username/your-repo.git
$ cd your-repo
$ npm install
```

Run the unit tests to ensure everything is working correctly.

```
$ npm test

```

Start using the CLI app by running the main script.

```
$ node geektrust.js <PATH_TO_COMMANDS_TXT_FILE>
```

## CLI Usage
The CLI app supports the following commands:

### Adding a Course Offering
To add a new course offering, use the following command:

```
$ ADD-COURSE-OFFERING <courseName> <instructorName> <date> <minEmployees> <maxEmployees>
```

Example:

```
$ ADD-COURSE-OFFERING data-science dr-jacob-shwoltz 29072023 2 4
```

### Registering Employees for a Course
To register an employee for a course offering, use the following command:

```
$ REGISTER <employeeEmail> <courseID>
```

Example:

```
$ REGISTER james-holt@gmail.com OFFERING-DATA-SCIENCE-DR-JACOB-SHWOLTZ
```

### Allotting a Course to an Employee
To allot a course to an employee after registration, use the following command:

```
$ ALLOT <courseID>
```

Example:

```
$ ALLOT OFFERING-DATA-SCIENCE-DR-JACOB-SHWOLTZ
```

### Canceling a Registration
To cancel a registration for a course, use the following command:

```
$ CANCEL <registrationID>
```

Example:

```
$ CANCEL REG-COURSE-JAMES-HOLT-DATA-SCIENCE
```

## Contact
For any questions or issues, feel free to contact us at salman.saleemkma@email.com.