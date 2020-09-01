# Point of Sale
A POS (Point of Sale) application for restaurant workers who want to receive orders, take seats, pay bills, customize menus, see a wait list and sales report.

## Live Demo
[Link to Live Site](https://pos.jsonkim.com)

## Features
1. Users can view the floor plan of the restaurant
2. Users can view the table status of each table (paid, open, billed)
3. Users can view a current check for a table
4. Users can mark a current check for a table as paid
5. Users can create, update, remove, edit guests on a wait list
6. Users can see menu items avaliable to order
7. Users can place an order to a table and create a check simultaneously
8. Users can view a sales report
9. Users can update/remove new menu items to the menu
10. Users can change the table status of a table
11. Users can view which orders for each table have been sent or not

## Technologies Used
* React.js
* React Router
* Material UI
* Node.js
* Express
* PostgreSQL
* Multer
* HTML5
* CSS3
* AWS EC2

## Getting Started
1. Clone the repository and navigate to the directory
``` cd point-of-sale ```
3. Install all dependencies ``` npm install ```
4. Import existing databse ``` npm run db:import ```
5. Compile project ``` npm run dev ```
6. Access application by entering [https://localhost:3000](https://localhost:3000) in the browser.

## Lessons Learned
* Building a full-stack application in a group-environment
* Creating complex SQL queries to connect checks, orders and orderItems tables
* Utilizing React Router for application routing
* Utilizing Material UI for responsive web layout

## Preview

<img src="server/public/images/pos-screenshot.gif">
