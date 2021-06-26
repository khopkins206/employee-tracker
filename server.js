const inquirer = require(`inquirer`);
const connection = require(`./connection`);
require(`console.table`);

const init = () => {
  inquirer
    .prompt({
      name: "main",
      type: "list",
      message: "What do you need to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((choice) => {
      switch (choice.main) {
        case "Add Department":
          addDept();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "View All Departments":
          connection.query("SELECT * FROM department", (error, data) => {
            console.table(data);
            init();
          });
          break;
        case "View All Roles":
          connection.query(
            "SELECT role.id, title, salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id",
            (error, data) => {
              console.log(error);
              console.table(data);
              init();
            }
          );
          break;
        case "View All Employees":
          connection.query("SELECT * FROM employee", (error, data) => {
            console.table(data);
            init();
          });
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          console.log("Please Try Again: ${choice.main}");
          break;
      }
    })
    .catch((err) => console.err(err));
};

const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Department Name?",
      },
    ])
    .then((department) => {
      connection.query("INSERT INTO department SET ?", department, (error) => {
        init();
      });
    });
};

const addRole = () => {
  connection.query(
    "SELECT name, id AS value FROM department",
    (error, departmentNames) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is this role's title?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is this role's salary?",
          },
          {
            type: "list",
            name: "department_id",
            message: "What is the department ID?",
            choices: departmentNames,
          },
        ])
        .then((role) => {
          connection.query("INSERT INTO role SET ?", role, () => {
            init();
          });
        });
    }
  );
};

const addEmp = () => {
  connection.query(
    `SELECT id AS value, title AS name FROM role`,
    (err, roles) => {
      // connection.query(
      //   "SELECT id AS value, first_name AS name AS value FROM employee WHERE manager_id is NULL",
      //   (error, managers) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roles,
          },
          // {
          //   type: "list",
          //   name: "manager_id",
          //   message: "Who is their manager?",
          //   choices: [
          //     {
          //       id: null,
          //       name: "None",
          //     },
          //   ].concat(managers),
          // },
        ])
        .then((employee) => {
          connection.query("INSERT INTO employee SET ?", employee, (error) => {
            init();
          });
        });
    }
  );
};
// );
// };

const updateRole = () => {
  connection.query(
    "SELECT id AS value, CONCAT(first_name, ` ` , last_name) AS name FROM employee",
    (error, employees) => {
      connection.query(
        "SELECT id AS value, title AS name FROM role",
        (error, roles) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "id",
                message: "Update which employee?",
                choices: employees,
              },
              {
                type: "list",
                name: "role_id",
                message: "Update which role?",
                choices: roles,
              },
            ])
            .then((answers) => {
              connection.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answers.role_id, answers.id],
                (error) => {
                  init();
                }
              );
            });
        }
      );
    }
  );
};

init();
