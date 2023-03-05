# Online shop web application

A responsive web application built for people to browse product and order online.

This project was built using these technologies: 
* HTML5 
* CSS3 
* JavaScript 
* React JS
* Bootstrap 
* Firebase


## Project preview
![alt text](https://github.com/hejthere/picture/blob/main/preview_gif.gif?raw=true)

## Features

| Functions                | Details | URL |
|--------------------------|---------|-----|
| Sign Up for an account   | 1. User can create account by inputting their email and password.  <br /> 2. User can see warning message if required columns are empty or passwords inputted are incorrect | /signup    |
| Log in with email        | User can log in using registered email | /login   |
| log Out       | User can log out of an account | /    |
| Sort and Search products | 1.User can search products by inputting keyword and sort products by their prices   <br /> 2. Related message will be shown if there is no product matched the keywords. User can reset the result to see the entire product list    | /    |
| Add product to cart      |User can add specific products into the shopping cart and total price will be shown for their information | /    |
| Edit product quantity    |User can edit the number of products in the cart and view the updated price instantly      | /    |
| Check out                | User can fill in their information and confirm the order. Order would be sent to the database for further processing        | /checkout    |
| Review shopping history  | After purchase, user can view the summary of previous purchase records under their account with purchase date and details      | /buyhistory    |


## Getting Started
Clone down this repository. You will need node.js and git installed globally on your machine.

### Installation and Setup Instructions
Installation: `npm install`

In the project directory, you can run: `npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser. The page will reload if you make edits.
