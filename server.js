const mysql = require(`mysql2`)
const inquirer = require(`inquirer`)
const connection = require(`connection.js`)
require(`console.table`)

const init = () => {
  inquirer.prompt({
    name: "action",
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
    ]
  }).then((choice) => {
    switch (choice.action) {
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
        runQuery(`SELECT name AS department FROM employeetracker_db.department;`)
        break;
      case "View All Roles":
        runQuery(`SELECT `)
        break;
      case "View All Employees":
        runQuery(`SELECT `)
        break;
      case "Update Employee Role":
        updateRole();
        break;
      case "Exit":
        connection.end();
        break;
      default:
        console.log("Please Try Again: ${choice.action}");
        break;
    }
  }).catch((err) => console.err(err))
}

const runQuery = (query) => {
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

const addDept =

const addRole =

const addEmp = () => {
      connection.query(`SELECT title FROM employeetracker_DB.role`, (err, res) => {
        if (err) throw err;

        inquirer.prompt([{
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        }, {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        }, {
          type: "input",
          name: "emp_role",
          message: "What is the employee's role?",
        }, {
          type: "input",
          name: "manager_id",
          message: "What is the manager's ID?"
          }]).then((answer) => {
            let firstName = answer.first_name;
            let lastName = answer.last_name;
            let empRole = answer.emp_role;
            let managerID = answer.manager_id;
            
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${firstName}', '${lastName}', '${empRole}', '${managerID}')`; (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
      });
        }
      )
    }

const updateRole =