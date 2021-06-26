DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;


CREATE TABLE `department`(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE `role`(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
   CONSTRAINT department_id_fk FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE `employee`(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE SET NULL,
  manager_id INT,
      CONSTRAINT manager_id_fk FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL
)
