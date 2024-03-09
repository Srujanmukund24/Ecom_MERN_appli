const Retailer=require("../models/Retailer");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");

const getCurrentRetailer = async (req, res) => {
    try {
        // Extract current retailer information from the request object
        const currentRetailer = req.currRetailer;

        // Assuming you have a Retailer model and you want to fetch the retailer's details from the database
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

module.exports={getCurrentRetailer};