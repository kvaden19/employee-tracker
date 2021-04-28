USE management_DB;

INSERT INTO department (name) VALUES ('Products');
INSERT INTO department (name) VALUES ('EDI');
INSERT INTO department (name) VALUES ('Billing');
INSERT INTO department (name) VALUES ('Customer Operations');

INSERT INTO role (title, salary, department_id) VALUES ('Product Analyst', 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('EDI Analyst', 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Billing Analyst', 65000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Director', 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kelly', 'Vaden', 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Matt', 'McCall', 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Shuba', 3, 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Dennis', 'Schmidt', 4);