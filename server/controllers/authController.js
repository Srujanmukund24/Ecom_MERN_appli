const User=require("../models/User");
const Retailer=require("../models/Retailer");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");

const userRegisterController=async (req,res)=>{
    try{
        
        const {name,email,phone,password}=req.body;
        console.log(req.body,"trying to  register");

        if(!name || !email || !phone  || !password){
            res.status(400).send("All the field are required");
        }
        
        //check if already exists.
        const presentUser=await User.findOne({email})
        if(presentUser){
            return res.status(409).send("Email already exists.Login Please!")
        }

        //encrypt password
        const encryptPass=await bcrypt.hash(password,10)

        //Creating User
        const user=await User.create({
            name,
            email:email.toLowerCase(),
            phone,
            password:encryptPass
        })
        
        //jwt token
        const token=jwt.sign(
            {
            user_id:user._id,
            email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn:"365d",
            }
        );

        //attach token to user
        res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        console.log("Error in user register", err);
        res.status(500).send("Internal Server Error");
    }
};

const userLoginController=async (req,res)=>{
      try{
          const {email,password}=req.body;
          console.log(req.body,"trying to login");;

          // validation
          if(!email || !password){
            res.status(400).send("All fields are required");
          }

          const user=await User.findOne({email});
          if(!user){
            res.status(400).send("Email not exists.");
          }
          if (await bcrypt.compare(password,user.password)){
                
            //generete  token using userid ans email ad attach it ti user
            const token=jwt.sign({user_id:user._id,email},
                  process.env.TOKEN_KEY,
                  {
                    expiresIn:"365d",
                  }
            )
            return res.status(200).json({ message: "User Logged in Successfully", token });
        } else {
            return res.status(400).send("Invalid credentials for User login");
        }
    } catch (err) {
        console.log("Error in user login", err);
        return res.status(500).send("Server error at user login");
    }
};
const logoutController = async (req, res) => {
    try {
        
        // will have to handle this in the client side and remove the token front he loacl storage...
        // Send a success message
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error in logoutController:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const retailerRegisterController = async (req, res) => {
    try {
        const { retailername, email, phone, password } = req.body;
        console.log(req.body, "trying to register retailer");

        if (!retailername || !email || !phone || !password) {
            return res.status(400).send("All fields are required");
        }

        // Check if retailer email already exists
        const presentRetailer = await Retailer.findOne({ email });
        if (presentRetailer) {
            return res.status(409).send("Email already exists. Please login.");
        }

        // Encrypt password
        const encryptPass = await bcrypt.hash(password, 10);

        // Creating Retailer
        const retailer = await Retailer.create({
            retailername,
            email: email.toLowerCase(),
            phone,
            password: encryptPass
        });

        // JWT token
        const token = jwt.sign(
            {
                retailer_id: retailer._id,
                email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "365d",
            }
        );

        // Attach token to retailer
        res.status(201).json({ message: "Retailer registered successfully", token });
    } catch (err) {
        console.log("Error in retailer register", err);
        res.status(500).send("Internal Server Error");
    }
};

const retailerLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body, "trying to login");

        // Validation
        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        const retailer = await Retailer.findOne({ email });
        if (!retailer) {
            return res.status(400).send("Email not found.");
        }

        if (await bcrypt.compare(password, retailer.password)) {
            // Generate token using retailer's ID and email and attach it to the retailer
            const token = jwt.sign({ retailer_id: retailer._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "365d",
                }
            );
            return res.status(200).json({ message: "Retailer Logged in Successfully", token });
        } else {
            return res.status(400).send("Invalid credentials for Retailer login");
        }
    } catch (err) {
        console.log("Error in retailer login", err);
        return res.status(500).send("Server error at retailer login");
    }
};

module.exports ={ userRegisterController, userLoginController,retailerRegisterController,retailerLoginController,logoutController}