var mysql = require("mysql");
var ctable = require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  inquirer.prompt([
      {
      message: "What would you like to do today?",
      type: "list",
      choices: ["View Products Sales by Department","Create New Department"],
      name: "option"
      }
      ]).then(function(res){
          if(res.option === "View Products Sales by Department"){
            connection.query("SELECT departments.*, SALES.DEPARTMENT_SALES FROM DEPARTMENTS INNER JOIN SALES ON departments.DEPARTMENT_NAME = SALES.DEPARTMENT_NAME ORDER BY DEPARTMENT_ID;", function(err, res) {
              if (err) throw err;
              // Log all results of the SELECT statement
              console.table(res);
              connection.end();
            });
          }
          else{
            inquirer.prompt([
              {
                  name: "deptName",
                  type: "input",
                  message: "Enter the name of the department:"
              },
              {
                  name: "deptOverhead",
                  type: "input",
                  message: "Enter the overhead costs of maintaining the new department:"
              }
          ]).then(function(res){
              connection.query("INSERT INTO departments(DEPARTMENT_NAME, OVERHEAD_COSTS) VALUES(?,?)",[res.deptName, res.deptOverhead], function(err, res2){
                  console.log("New department added");
              });
              connection.query("INSERT INTO sales(DEPARTMENT_NAME) VALUES(?)",[res.deptName], function(err, res2){
                //console.log("New department added");
            });
          });
          connection.end();
          
          }
      });
});
