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
        message: "Please add a department name."
    }).then(answer => {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDepartment], function(err){
            if (err) throw err;
            console.log(`New department added: ${answer.newDepartment}!`);
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