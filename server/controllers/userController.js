const User=require("../models/User");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");

const getCurrentUser = async (req, res) => {
    try {
        // Extract current user information from the request object
        const currentUser = req.currUser;

        // Assuming you have a User model and you want to fetch the user's details from the database
        const user = await User.findById(currentUser.user_id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the user information in the response
        res.status(200).json({ user });
    } catch (err) {
        console.log("Error in getCurrentUser:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports ={ getCurrentUser}