const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root'
    password: 'Ziva#2011'
    database: 'companyDb'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    afterConnection();
});

afterConnection = () => {
    // Query that SELECT everything from the 'said' table
    connection.query('select a.first_name, a.last_name, b.title, b.salary, c.first_name, c.last_name from employee a join role b on a.role_id = b.id join employee c on a.manager_id = c.id;', function(err, res) {
        // console.log(quer.sql);
        console.log(res);

            // Log the results in the console

            // Code Here

            connection.end();
    });
};