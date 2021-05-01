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

// AddRole();

// AddEmployee();

// UpdateEmployee();
  
module.exports = showMenu;