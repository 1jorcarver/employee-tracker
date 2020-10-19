USE companyDb;

INSERT INTO department (name)
VALUES ("Cabinet"), ("Athletics"), ("Admissions"), ("Student Services");

INSERT INTO role (title, salary, department_id)
VALUES ("President", 100000, 1), ("Athletics Director", 50000, 2), ("Admissions Director", 55000, 3), ("Student Services Director", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Kinney", 1, NULL), ("Blair", "Reid", 2, 1), ("Cara", "Cool", 3, 2), ("Kim", "Henry", 4, 3);