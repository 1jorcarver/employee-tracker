const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'companyDb',
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id' + connection.threadId + '\n');
    beginEmpPrompt();
});

beginEmpPrompt = () => {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do today?",
        choices: [
            "View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Exit"
        ]
    }).then(answer => {
        console.log(answer.action);
        switch (answer.action) {
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmpRole();
                break;
            case "Exit":
                connection.end();
                break;
        }
    })
};

viewDepartments = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        beginEmpPrompt();
    });
}

viewRoles = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        beginEmpPrompt();
    });
}

viewEmployees = () => {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        beginEmpPrompt();
    });
}

addDepartment = () => {
    inquirer.prompt({
        name: "newDepartment",
        type: "input",
        message: "Please add a department name:"
    }).then(answer => {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDepartment], function (err) {
            if (err) throw err;
            console.log(`You successfully added a new department: ${answer.newDepartment}!`);
            beginEmpPrompt();
        })
    });
}

addRole = () => {
    inquirer.prompt([{
        name: "newRole",
        type: "input",
        message: "Please enter a new role:"
    }, {
        name: "salary",
        type: "input",
        message: "Please enter the salary:",
        validate: valdiateSalary
    }, {
        name: "departmentId",
        type: "input",
        message: "Please enter a Department ID:",
        validate: validateId
    }]).then(answer => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newRole, answer.salary, answer.departmentId], function (err) {
            if (err) throw err;
            console.log(`You successfully added a new role: ${answer.newRole}.`)
            beginEmpPrompt();
        })
    })
}

addEmployee = () => {
    inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "Please enter the Employee's first name:"
    }, {
        name: "lastName",
        type: "input",
        message: "Please enter the Employee's last name:"
    }, {
        name: "roleId",
        type: "input",
        message: "Please enter the Employee's ID:",
        validate: validateId
    }, {
        name: "managerId",
        type: "input",
        message: "Please enter the Manager's ID:",
        validate: validateId
    }]).then(answer => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function (err) {
            if (err) throw err;
            console.log(`You successfully added new Employee ${answer.firstName} ${answer.lastName}.`);
            beginEmpPrompt();
        })
    });
}

updateEmpRole = () => {
    inquirer.prompt([{
        name: 'lastName',
        type: "input",
        message: "Please enter the last name of the employee whose role you're changing:"
    }, {
        name: "newRole",
        type: "input",
        message: "Please enter their new role ID:",
        validate: validateId
    }]).then(answer => {
        connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: answer.newRole }, { last_name: answer.lastName }], function (err) {
            if (err) throw err;
            console.log(`Employee's new role is ${answer.newRole}.`);
            beginEmpPrompt();
        })
    });
}

valdiateSalary = (salary) => {
    if (isNaN(salary)) {
        return "Entry is invalid. Please resubmit with a valid number."
    }
    return true;
}

validateId = (id) => {
    if (isNaN(id)) {
        return "Entry is invalid. Please resubmit with a valid number."
    }
    return true;
}