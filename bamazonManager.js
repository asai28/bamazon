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
    choices: ["View Products for Sale","View Low Inventory", "Add to Inventory" , "Add New Product"],
    name: "option"
    }
    ]).then(function(res){
        var switchCase = res.option;
        switch(switchCase){
            case "View Products for Sale":
            connection.query("SELECT * FROM Products", function(
                err,
                res
              ) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
                connection.end();
              });
              break;
    
            case "View Low Inventory":
            connection.query("SELECT item_id, product_name FROM Products where stock_quantity < 5", function(
                err,
                res
              ) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
                connection.end();
              });
              break;
    
            case "Add to Inventory":
            connection.query("SELECT product_name FROM Products", function(
                err,
                res
              ) {
                if (err) throw err;
                // Log all results of the SELECT statement
                var available_products = [];
                for(var i = 0; i < res.length; ++i){
                    available_products.push(res[i].product_name);
                }
                inquirer.prompt([
                    {
                        message: "Choose a product to add:",
                        name: "addProduct",
                        type: "list",
                        choices: available_products
                    },
                    {
                        message: "How many products to add to the inventory?",
                        name: "addStock",
                        type: "input",
                        validate: function validateFirstName(name){
                            return !isNaN(parseInt(name));
                        }
                    }
                ]).then(function(res2){
                    connection.query("UPDATE PRODUCTS SET STOCK_QUANTITY = STOCK_QUANTITY + ? WHERE PRODUCT_NAME = ?", [parseInt(res2.addStock), res2.addProduct], function(err, res3){
                        console.log("New items added!");
                        connection.end();
                    })
                });
              });
            break;
            case "Add New Product":
            var productDepts = [];
            connection.query("SELECT DISTINCT DEPARTMENT_NAME FROM PRODUCTS", function(err,res3){
                for(var i = 0; i < res3.length; ++i){
                    productDepts.push(res3[i].DEPARTMENT_NAME);
                }
                inquirer.prompt([
                    {
                        name: "productName",
                        type: "input",
                        message: "Enter the name of the product:"
                    },
                    {
                        name: "productDept",
                        type: "list",
                        message: "Choose the name of the product department:",
                        choices: productDepts
                    },
                    {
                        name: "productPrice",
                        type: "input",
                        message: "Enter the price of the product:"
                    },
                    {
                        name: "productStock",
                        type: "input",
                        message: "Enter number of new products:"
                    }
                ]).then(function(res4){
                    var query = connection.query("INSERT INTO PRODUCTS(PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES(?,?,?,?)",[res4.productName, res4.productDept, parseFloat(res4.productPrice), parseInt(res4.productStock)], function(err, res2){
                        if(err) return console.log(err);
                        console.log("New product added to inventory");
                        connection.end();
                    })
                });
             });
            
        }
    });
  });
