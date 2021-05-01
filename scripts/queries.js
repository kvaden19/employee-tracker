const inquirer = require('inquirer');
const ctable = require('console.table');

// function which prompts the user for what action they want to take
const showMenu = (connection) => {
    inquirer
      .prompt({
        name: 'selection',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 
        'Update Employee', 'EXIT']
    })
    .then((answer) => {
        // based on their answer, call the appropriate function
        switch(answer.selection) {
            case 'View Departments':
                viewDepartments(connection);
                break;
            case 'View Roles':
                viewRoles(connection);
                break;
            case 'View Employees':
                viewEmployees(connection);
                break;
            case 'Add Department':
                addDepartment(connection);
                break;
            case 'Add Role':
                addRole(connection);
                break;
            case 'Add Employee':
                addEmployee(connection);
                break;
            case 'Update Employee':
                updateEmployee(connection);
                break;                  
            default:
                connection.end();
                break;
        }
    });
};

const viewDepartments = (connection) => {
    console.log('Viewing all departments...\n');
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        showMenu(connection);
    });
};

const viewRoles = (connection) => {
    console.log('Viewing all roles...\n');
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        showMenu(connection);
    });
};

const viewEmployees = (connection) => {
    console.log('Viewing all employees...\n');
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        showMenu(connection);
    });
};

const addDepartment = (connection) => {
    inquirer
    .prompt([
        {
        name: 'deptName',
        type: 'input',
        message: 'What is the name of the new department?'
        }
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
        connection.query(
        'INSERT INTO department SET ?',
        {
            name: answer.deptName
        },
        (err) => {
            if (err) throw err;
            console.log(answer.deptName + ' was created successfully!\n');
            showMenu(connection);
            }
        );
    });
};

const addRole = (connection) => {
    inquirer
    .prompt([
        {
        name: 'title',
        type: 'input',
        message: 'What is the title of the new role?'
        },
        {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?'
        },
        {
        name: 'deptID',
        type: 'input',
        message: 'What is the department ID for this role?'
        }
    ])
    .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
        'INSERT INTO role SET ?',
        {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.deptID
        },
        (err) => {
            if (err) throw err;
            console.log(answer.title + ' was created successfully!\n');
            showMenu(connection);
            }
        );
    });
};

const addEmployee = (connection) => {
    inquirer
    .prompt([
        {
        name: 'firstName',
        type: 'input',
        message: "What is the new employee's first name?"
        },
        {
        name: 'lastName',
        type: 'input',
        message: "What is the new employee's last name?"
        },
        {
        name: 'roleID',
        type: 'input',
        message: 'What is the role ID for this employee?'
        },
        {
        name: 'managerID',
        type: 'input',
        message: 'What is the employee ID for the manager of this employee?'
        }
    ])
    .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleID,
            manager_id: answer.managerID
        },
        (err) => {
            if (err) throw err;
            console.log(answer.firstName + ' was created successfully!\n');
            showMenu(connection);
            }
        );
    });
};

const updateEmployee = (connection) => {
    connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    // Once you have the employees, prompt the user for which they'd like to update
    inquirer
        .prompt([
            {
            name: 'employee',
            type: 'rawlist',
            choices() {
                const choiceArray = [];
                res.forEach(({ last_name }) => {
                    choiceArray.push(last_name);
                });
                return choiceArray;
                },
            message: 'Which employee would you like to update?',
            },
            {
            name: 'newRole',
            type: 'input',
            message: "What is the employee ID for this employee's new role?"
            },
        ])
        .then((answer) => {
            // Get the line of the chosen employee from the table
            let chosenEmployee;
            res.forEach((employee) => {
                if (employee.last_name === answer.employee) {
                    chosenEmployee = employee;
                }
            });
            // Make the employee table update
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                  {
                    role_id: answer.newRole
                  },
                  {
                    id: chosenEmployee.id
                  },
                ],
                (error) => {
                  if (error) throw err;
                  console.log(answer.employee + ' updated successfully!\n');
                  showMenu(connection);
                }
            );
        });
    });
}
  
module.exports = showMenu;