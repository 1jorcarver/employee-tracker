const mysql = require('mysql2');
const inquirer = require('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ziva#2011',
    database: 'companyDb',
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    beginEmpPrompt();
});

beginEmpPrompt = () => {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do today?",
        choices: [
            "Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role", "Exit"
        ]
    }).then(answer => {
        console.log(answer.action);
        switch(answer.action){
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break; 
            case "Add Employee":
                addEmployee();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
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

addDepartment = () => {
    inquirer.prompt({
        name: "newDepartment",
        type: "input",
        message: "Please add a department name:"
    }).then(answer => {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDepartment], function(err){
            if (err) throw err;
            console.log(`You successfully added a new department: ${answer.newDepartment}!`);
            beginEmpPrompt();
        })
    });
}

viewDepartments = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        beginEmpPrompt();
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
        message: "Please enter the role's salary:",
        validate: valdiateSalary
    }, {
        name: "deparmentId",
        type: "input",
        message: "Please enter a department ID:",
        validate: validateId
    }]).then(answer => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newRole, answer.salary, answer.departmentId], function(err) {
            if (err) throw err;
            console.log(`You successfully added a new role: ${answer.newRole}.`)
            beginEmpPrompt();
        })
    })
}

viewRoles = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        beginEmpPrompt();
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