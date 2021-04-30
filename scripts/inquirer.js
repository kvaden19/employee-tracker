//require all the query functions
const inquirer = require('inquirer');

// function which prompts the user for what action they should take
const start = (connection) => {
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
                // viewDepartments();
                console.log('Here are all the depts!\n');
                start(connection);
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
  
module.exports = start;