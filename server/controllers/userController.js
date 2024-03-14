const User=require("../models/User");
const Product=require("../models/Product");
const Cart=require("../models/Cart");
const Order=require("../models/Order");

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

const getAllProductsController = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Return the products in the response
        res.status(200).json(products);
    } catch (err) {
        console.error("Error in get all products controller:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const searchByCategoryController = async (req, res) => {
    try {
        // Extract the search term from the query parameter 'category'
        const category = req.query.category;

        // Use the Product model to find products that belong to the specified category
        const products = await Product.find({ category });
        

        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const searchByNameController = async (req, res) => {
    try {
        const searchTerm = req.query.q;

        // Use the Product model to find products that match the search term in their name
        const products = await Product.find({ prodName: { $regex: searchTerm, $options: 'i' } });

        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const searchByPriceController = async (req, res) => {
    try {
        const minPrice = parseFloat(req.query.minPrice) || 0;
        const maxPrice = parseFloat(req.query.maxPrice) || Infinity;

        // Construct the filter object based on the provided parameters
        const filter = {
            price: { $gte: minPrice, $lte: maxPrice } // Price range filter
        };
    
        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const addToCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.currUser.user_id; // Assuming user_id is the correct property

       //validate data
        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // If the cart doesn't exist for the user, create a new one
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else {
            // If the cart exists, check if the product already exists in the cart
            const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

            if (existingItemIndex !== -1) {
                // update qantity
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // add new
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error("Error in add to cart controller:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getCurrentCartController = async (req, res) => {
    try {
        const userId = req.currUser.user_id;

        // Find the cart for the current user
        const currentCart = await Cart.findOne({ userId }).populate('items.productId');
        if (!currentCart) {
            // If the cart doesn't exist for the user, return an empty cart
            return res.status(200).json({ message: "Cart is empty", items: [] });
        }

        //  Mongoose document to a plain JavaScript object
        const plainCart = currentCart.toObject();
        res.status(200).json(plainCart);
    } catch (err) {
        console.error("Error in get current cart controller:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const addOrderController = async (req, res) => {
    try {
        const userId = req.currUser.user_id; 
        const { address } = req.body;
        
        //  current cart for the user
        const currentCart = await Cart.findOne({ userId });

        if (!currentCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const items = await currentCart.items;

        // Calculate total cost based on items in the cart
        let totalCost = 0;
        for (const item of items) {
            const prod=await Product.findById(item.productId);
            totalCost += prod.price * item.quantity;
        }
        totalCost=Number(totalCost);
        // Create a new order instance
        const order = new Order({
            userId,
            items,
            totalCost,
            address,
            // orderDate to current date
            // status is defaulted to 'pending' 
        });

        await order.save();

        // Send a success response
        res.status(201).json({ message: "Order added successfully", order });
    } catch (err) {
        console.error("Error in addOrderController:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const getOrderHistoryController = async (req, res) => {
    try {
        const userId = req.currUser.user_id;

        // Find orders for the user ID
        const orders = await Order.find({ userId });

        // Send the orders as a JSON response
        res.json(orders);
    } catch (err) {
        console.error("Error in getOrderHistoryController:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports ={ getCurrentUser,getAllProductsController,addToCartController,getCurrentCartController,addOrderController,searchByCategoryController,searchByNameController,searchByPriceController,getOrderHistoryController}