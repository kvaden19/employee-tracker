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
                viewRoles();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'Add Department':
                AddDepartment();
                break;
            case 'Add Role':
                AddRole();
                break;
            case 'Add Employee':
                AddEmployee();
                break;
            case 'Update Employee':
                UpdateEmployee();
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

// viewRoles();

// viewEmployees();

// AddDepartment();

// AddRole();

// AddEmployee();

// UpdateEmployee();
  
module.exports = showMenu;