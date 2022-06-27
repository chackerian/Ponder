const express = require("express");
const mysql = require("mysql");
const cors = require("cors")
var bodyParser = require('body-parser');

const app = express();

app.use(cors({origin: "*",}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var connection = mysql.createConnection({
  host     : 'database-1.cnb4ec4flkpi.us-east-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'treevagen',
  database : 'database-1'
});

connection.connect();

console.log(connection)