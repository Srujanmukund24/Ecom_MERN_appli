const express = require("express");
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db");
const cors = require("cors");

//Models:
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Retailer = require("./models/Retailer");
const Cart = require("./models/Cart");

//for the Database Connection.
dotenv.config();
connectDB();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());



// Applicatino is listening on the particular port.
app.listen(port, () => {
    console.log(
      `Node Server Running on Port ${process.env.PORT}`
    );
});