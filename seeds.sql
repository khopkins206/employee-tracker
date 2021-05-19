USE employeetracker_db;

INSERT INTO department (name) VALUES
("HR"),
("Sales"),
("Marketing");

INSERT INTO role (title, salary, department_id) VALUES
("Senior HR", 70000, 1),
("HR Specialist", 45000, 1),
("Sales Manager", 120000, 2),
("Inside Sales", 35000, 2),
("Marketing Manager", 80000, 3)
("CMO", 200000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("F", "L", 1, NULL)
("Berne","Varden",1,1)
("Glenden","Chazelle",3,2)
("Thibaud","Giacobini",3,3)
("Veronika","Horribine",2,4)
("Harriott","Southorn",2,5)
("Michel","Bartoszewicz",1,6)

