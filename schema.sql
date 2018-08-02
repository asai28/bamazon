create database bamazon;
use bamazon;

create table products(
item_id integer auto_increment primary key,
product_name varchar(30),
department_name varchar(30),
price float(8,2),
stock_quantity integer
);

ALTER TABLE products modify product_name varchar(60);

DELETE FROM PRODUCTS WHERE ITEM_ID=1 OR ITEM_ID=2;
SELECT * FROM PRODUCTS;

insert into products values(1,"L.O.L. Surprise! Confetti Pop-Series 3 Collectible Dolls","Toys and Games",12.88,59);
insert into products values(2,"Mattel Games UNO Card Game","Toys and Games",4.99,129);
insert into products values(3,"Play-Doh Modeling Compound 10-Pack Case of Colors","Toys and Games",7.99,9);
insert into products values(4,"Fire TV Stick with Alexa Voice Remote | Streaming Media Player","Electronics",39.99,1);
insert into products values(5,"Echo Dot (2nd Generation) - Smart speaker with Alexa - Black","Electronics",42.99,4);
insert into products values(6,"Fujifilm INSTAX Mini Instant Film Twin Pack (White)","Electronics",12.6,99);
insert into products values(7,"Nintendo Entertainment System: NES Classic Edition","Video Games",85.20,1);
insert into products values(8,"Instant Loss Cookbook: Cook Your Way to a Healthy Weight with 125 Recipes for Your Instant Pot, Pressure Cooker, and More","Books",13.38,1);
insert into products values(9,"Womens and Mens Kids Water Shoes Barefoot Quick-Dry Aqua Socks for Beach Swim Surf Yoga Exercise","Clothes, Shoes and Jewelry",9.99,20);
insert into products values(10,"Wyze Cam 1080p HD Indoor Wireless Smart Home Camera with Night Vision, 2-Way Audio, Works with Alexa","Camera and Photos",25.80,19);

SELECT * FROM PRODUCTS;

CREATE TABLE departments(
DEPARTMENT_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
DEPARTMENT_NAME VARCHAR(50),
OVERHEAD_COSTS FLOAT(10,2)
);

INSERT INTO DEPARTMENTS VALUES(1, "Toys and Games", 10000);
INSERT INTO DEPARTMENTS VALUES(2, "Electronics", 80000);
INSERT INTO DEPARTMENTS VALUES(3, "Video Games", 5000);
INSERT INTO DEPARTMENTS VALUES(4, "Books", 2000);
INSERT INTO DEPARTMENTS VALUES(5, "Clothes, Shoes and Jewelry", 1000);
INSERT INTO DEPARTMENTS VALUES(6, "Camera and Photos", 20000);

UPDATE PRODUCTS SET STOCK_QUANTITY = STOCK_QUANTITY - 5 WHERE ITEM_ID = 2;

ALTER TABLE PRODUCTS ADD PRODUCT_SALES FLOAT(11,2);
ALTER TABLE PRODUCTS MODIFY PRODUCT_SALES FLOAT(11,2) NOT NULL DEFAULT 0.00;

select * FROM departments;
ALTER TABLE departments MODIFY PRODUCT_SALES FLOAT(11,2) NOT NULL default 0.00;
ALTER TABLE departments MODIFY TOTAL_PROFIT FLOAT(11,2) NOT NULL default 0.00;

DELETE FROM DEPARTMENTS WHERE DEPARTMENT_ID > 6;

