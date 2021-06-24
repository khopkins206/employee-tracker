const mysql = require(`mysql2`);
const inquirer = require(`inquirer`);
const connection = require(`connection.js`);
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
          viewDept();
          break;
        case "View All Roles":
          viewRole();
          break;
        case "View All Employees":
          viewEmp();
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
        name: "department_id",
        message: "What is the Department Name?",
      },
    ])
    .then((answer) => {
      connection.query("INSERT INTO department SET ?", department, () => {
        init();
      });
    });
};

const addRole = () => {
  connection.query(
    "SELECT name AS value FROM department",
    (error, departmentName) => {
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
            message: "What is this role's department?",
            choices: departmentName,
          },
        ])
        .then((role) => {
          connection.query("INSERT INTO role SET ?", department, () => {
            init();
          });
        });
    }
  );
};

const addEmp = () => {
  connection.query(`SELECT * FROM employeetracker_db.role`, (err, res) => {
    if (err) throw err;

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
          // choices: [{ name: , value: res.map.id}]
        },
      ])
      .then((answer) => {
        connection.query(`INSERT INTO employee SET ? `);
        init();
      });

    const updateRole = () => {
      connection.query(
        "SELECT employee.first_name, employee.last_name, role.title, role.salary FROM employee JOIN role on employee.role_id",
        (error, data) => {
          console.log(data);
          init();
        }
      );
    };
  });
};

init();
