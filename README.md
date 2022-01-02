# My Wardrobe App

In this repository you will find My Wardrobe App, built using HTML, CSS, React, Node/Express, and MySQL.

## Setup

### Dependencies

Run `npm install` in project directory to install dependencies related to Express.

`cd client` and run `npm install` to install dependencies related to React.

### Database Prep

Create a `.env` file in the project folder of this repository containing the MySQL authentication information for MySQL user:

```
DB_HOST=localhost
DB_USER=YOUR_USERNAME
DB_NAME=my_wardrobe
DB_PASS=YOUR_PASSWORD

```

(replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your actual username and password)

In the MySQL CLI, create a database `create database my_wardrobe;`.

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create 4 tables called `categories`, `items`, `colors`, and `seasons` in your database.
- `categories` contains 14 rows
- `colors` contains 12 rows
- `seasons` contains 4 rows

You can fill the `items` table with your clothes (I added in the proyect folder an images folder that contains the URL's of the images I already used)

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in port 3000.

## Database

![alt text](./images/Untitled.png)

## Support

Feel free to contact if you want to collaborate :)

## Credits

This is a student project that was created at CodeOp, a full stack development bootcamp in Barcelona.
