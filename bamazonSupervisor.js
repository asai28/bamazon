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
            connection.query("SELECT DEPARTMENTS.DEPARTMENT_ID, DEPARTMENTS.DEPARTMENT_NAME, DEPARTMENTS.OVERHEAD_COSTS, (PRODUCTS.PRODUCT_SALES) AS DEPARTMENT_SALES, (PRODUCTS.PRODUCT_SALES) - DEPARTMENTS.OVERHEAD_COSTS AS TOTAL_PROFIT FROM DEPARTMENTS, PRODUCTS WHERE DEPARTMENTS.DEPARTMENT_NAME = PRODUCTS.DEPARTMENT_NAME GROUP BY PRODUCTS.DEPARTMENT_NAME ORDER BY DEPARTMENT_ID", function(err, res) {
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
          ]).then(function(res2){
              var query = connection.query("INSERT INTO DEPARTMENTS(DEPARTMENT_NAME, OVERHEAD_COSTS) values(?, ?)", [res2.deptName, parseFloat(res2.deptOverhead)], function(res3){
                  console.log("New Department added!");
                  connection.end();
              });
              console.log(query.sql);
          });
          }
      });
});
