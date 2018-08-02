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
  connection.query("SELECT * FROM Products", function(
    err,
    res
  ) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    makeOrder();
  });
});

function makeOrder(){
    inquirer.prompt([
        {
            message: "Enter the id of the product you would like to buy:",
            type: "input",
            name: "id"
        },
        {
            message: "How many would you like to buy?",
            type: "input",
            name: "num_products",
            validate: function(name){
                return !isNaN(parseInt(name));
            }
        }
    ]).then(function(res){
        connection.query("SELECT * FROM PRODUCTS WHERE ITEM_ID = ? AND STOCK_QUANTITY >= ?", [res.id, parseInt(res.num_products)], function(err, res2){
            if (err) throw err;
            if(!res2[0]){
                console.log("Insufficient Quantity!");
                connection.end();
            }
            else{
                console.log("Else statement");
                var stock = res2[0].stock_quantity;
                if(stock >= parseInt(res.num_products)){
                    connection.query("UPDATE PRODUCTS SET STOCK_QUANTITY = STOCK_QUANTITY - ? WHERE ITEM_ID = ?", [parseInt(res.num_products),parseInt(res.id)], function(err,res3){
                        if(err) throw err;
                        console.log("The total cost of your purchase is $"+ parseInt(res.num_products)*parseFloat(res2[0].price));
                        connection.query("UPDATE PRODUCTS SET PRODUCT_SALES = PRODUCT_SALES + ? WHERE ITEM_ID = ?", [parseInt(res.num_products)*parseFloat(res2[0].price),res.id],function(err2,res5){
                            if(err2) throw err2;
                            console.log("Product sales updated!");
                            connection.end();
                        })
                    })
            }
            }
            
        });

    });
}

