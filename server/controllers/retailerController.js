const Retailer=require("../models/Retailer");
const Product = require('../models/Product');
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");

const getCurrentRetailer = async (req, res) => {
    try {
        // current retailer information 
        const currentRetailer = req.currRetailer;

        const retailer = await Retailer.findById(currentRetailer.retailer_id);

        // Check if the retailer exists
        if (!retailer) {
            return res.status(404).json({ message: "Retailer not found" });
        }

        // Send the retailer information in the response
        res.status(200).json({ retailer });
    } catch (err) {
        console.log("Error in getCurrentRetailer:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const addProductController = async (req, res) => {
    try {
        //  product details from the request body
        const { productName, price, category, description, quantity, availability, photo } = req.body;

        // retailer ID from the token payload
        const retailerId = req.currRetailer.retailer_id;

        // Check for duplicate product by name for the retailer
        const existingProduct = await Product.findOne({ productName, retailerId });

        if (existingProduct) {
            return res.status(400).json({ message: "Product with the same name already exists for this retailer update if require" });
        }

        // Create a new product instance
        const product = new Product({
            productName,
            price,
            category,
            description,
            quantity,
            availability,
            retailerId,
            photo
        });

        // Save the product to the database
        await product.save();

        // Send a success response
        res.status(201).json({ message: "Product added successfully", product });
    } catch (err) {
        console.error("Error in addProductController:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = addProductController;


module.exports={getCurrentRetailer,addProductController};