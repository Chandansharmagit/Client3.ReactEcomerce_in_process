require('dotenv').config();

const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const User = require("./databaseconnections/models/User_register");
const Order = require("./databaseconnections/models/checkout");
const database = require("./databaseconnections/database"); // Ensure this file correctly sets up your database connection
const nodemailer = require("nodemailer");
const { Server } = require("socket.io");
const { createServer } = require("http");
const auth = require("./databaseconnections/auth/auth");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware setup

app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specified methods
    allowedHeaders: "Content-Type", // Allow specifided headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const uploadDirectory = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configure multer for handling file uploads
const storagee = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadss = multer({ storage: storagee });

// Middleware to serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/", (req, res) => {
  res.send("welcome to backend");
});



app.post("/register", uploadss.single("image"), async (req, res) => {
  try {
    const { name, email, password, phone, address, state, zipcode, city } =
      req.body;
    const image = req.file ? req.file.filename : null;
    const imageurl = "/uploads/" + image;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      state,
      zipcode,
      city,
      image: imageurl,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming you're passing userId as query parameter

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/userorderproducts", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID not provided" });
    }

    // Assuming you have a User and OrderProduct model defined
    const orderProducts = await Order.find({ userId: userId });
    if (!orderProducts) {
      return res
        .status(404)
        .json({ error: "No order products found for this user" });
    }

    res.status(200).json(orderProducts);
  } catch (error) {
    console.error("Error fetching order products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//upatring the status

//sending the email to ther user if our team confirm customer orders

const status_transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "utamsharma57@gmail.com",
    pass: "dbsq lvct gjep lowe",
  },
});

app.put("/userproducts/:id", async (req, res) => {
  const { id } = req.params; // Extract order ID from request parameters
  const { status } = req.body; // Extract status from request body
  const { email } = req.body;

  try {
    // Find the order by ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status: status } }, // Update the status field
      { new: true } // Return the updated document
    );

    // If no order found with the given ID, return 404 Not Found
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Save the updated order document
    await updatedOrder.save();

    //sending the email to the user if our team will confirm the user order

    const emailhtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
        }
        .header, .footer {
            background: orange;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }
        .main {
            background: #fff;
            padding: 20px;
            margin: 20px 0;
        }
            .New{
            color:"white";
            font-weight: bold;
            }
        .product {
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }
        .product img {
            max-width: 100px;
            display: block;
            margin-bottom: 10px;
        }
        .product-details {
            display: flex;
            justify-content: space-between;
        }
        .product-details div {
            margin-right: 10px;
        }
        .button {
            display: inline-block;
            background: orange;
            color: #fff;
            font-weight: bold;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            margin-top: 20px;
            transition: 0.4s ease-in-out;
        }
        .button:hover{
            transform: scale(1.1);
        }
        .email{
        color: rgb(0, 0, 0);
        font-weight: bold;
        }
        span{
            font-weight: bold;
            text-decoration: underline;
            font-size: 26px;
            color: orange;
        }
        @media (max-width: 768px) {
            .container {
                width: 90%;
            }
            .product-details {
                flex-direction: column;
            }
            .product img {
                max-width: 80px;
            }
        }

        @media (max-width: 480px) {
            .container {
                width: 100%;
            }
            .product img {
                max-width: 60px;
            }
            .product-details div {
                margin-right: 0;
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${status}</h1>
        </div>
        <div class="main">
            <p class="email">Dear ${email},</p>
            <p>Thank you for your order! You have ordered the following products from our store:</p>
           
            <p>We have reviewed your order,Now your order is in <span> ${status} status</span> and our team will confirm and process it shortly.</p>
            <a href="http://localhost:3000/" class="button">View Your Order</a>
        </div>
        <div class="footer">
            <p,class='New'>Thank you for shopping with us!</p,class=>
            <p class='New'>Best regards,</p>
            <p class='New'>New Luxeliving and Smart Furniture</p>
        </div>
    </div>
</body>
</html>
    `;

    const mailoptions_status = {
      from: "utamsharma57@gmail.com",
      to: email,
      subject: `Order ${status} Successfully`,
      html: emailhtml,
    };

    status_transporter.sendMail(mailoptions_status, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent sucess :", info.response);
      }
    });

    // Respond with the updated order
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//deleting the products
app.delete("/userproducts/:eventId", async (req, res) => {
  try {
    const player = await Order.findByIdAndDelete(req.params.eventId);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/userprofile_id", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID not provided" });
    }

    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: "User Profile not found" });
    }

    res.status(200).json([userProfile]); // Return an array of profiles
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//adding the products to database if the user id matched to previou logined user

//sending the email to the user if they order products from our store in the int he database in the backend
const transporter_email = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "utamsharma57@gmail.com",
    pass: "dbsq lvct gjep lowe",
  },
});

app.post("/placeOrder", async (req, res) => {
  const { userId, cartItems, totalPrice, useremail } = req.body;

  // Basic validation
  if (
    !userId ||
    !cartItems ||
    !Array.isArray(cartItems) ||
    cartItems.length === 0 ||
    !totalPrice ||
    !useremail
  ) {
    return res.status(400).json({
      error:
        "Invalid request. Missing userId, cartItems, totalPrice, or useremail.",
    });
  }

  try {
    // Create a new order
    const items = cartItems.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
      price: item.price,
      img: item.img, // Assuming item.img is provided from the frontend
    }));

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
    });

    // Save the order to MongoDB
    const savedOrder = await newOrder.save();

    // Construct the HTML content for the email
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
          
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
            margin-top: 20px;
        }
        .header, .footer {
            background: orange;
            color: #fff;
            padding: 10px 0;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .main {
            padding: 20px;
            background: rgb(239, 238, 235);
        }
        .product {
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
            display: flex;
        }
        .product img {
            max-width: 100px;
            border-radius: 8px;
            margin-right: 10px;
        }
        .product-details {
            flex: 1;
        }
        .button {
            display: inline-block;
            background: orange;
            color: #fff;
            font-weight: bold;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            margin-top: 20px;
            border-radius: 4px;
            transition: 0.4s ease-in-out;
            display: block;
            text-align: center;
            margin: 20px auto;
            max-width: 200px;
        }
        .button:hover {
            background: #ff9900;
        }
        .email {
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        span {
            font-weight: bold;
            text-decoration: underline;
            font-size: 18px;
            color: orange;
        }
        .newspan{
            color: #ffffff;
            text-decoration: none;
        }
        @media (max-width: 768px) {
            .container {
                width: 90%;
            }
            .product {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            .product img {
                margin-bottom: 10px;
            }
        }
        @media (max-width: 480px) {
            .container {
                width: 100%;
            }
            .product img {
                max-width: 80px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Confirmation</h1>
        </div>
        <div class="main">
            <p class="email">Dear ${useremail},</p>
            <p>Thank you for your order! You have ordered the following products from our store:</p>
            ${cartItems
              .map(
                (item) => `
                <div class="product">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="product-details">
                        <div><strong>Product:</strong> ${item.name}</div>
                        <div><strong>Quantity:</strong> ${item.quantity}</div>
                        <div><strong>Price:</strong> $${item.price.toFixed(
                          2
                        )}</div>
                    </div>
                </div>
            `
              )
              .join("")}
            <p>We have reviewed your order, and it is now in <span>pending status</span> Our team will review it and confirm the order shortly thank you....</p>
            <a href="http://localhost:3000/" class="button">View Your Order</a>
        </div>
        <div class="footer">
            <p class="New">Thank you for shopping with us!</p>
            <p class="New">Best regards,</p>
            <p class="New">New Luxeliving and Smart Furniture</p><span class="newspan">Design and Developed by @chandan sharma</span>
        </div>
    </div>
</body>
</html>

    `;

    // Sending the email to the user if they order product from our store
    const mailOptions = {
      from: "utamsharma57@gmail.com",
      to: useremail,
      subject: "Order Placed Successfully",
      html: htmlContent,
    };

    transporter_email.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

//sending the massage to ther user if they order new products from our store

// Middleware for authorization

// API endpoint for logout
app.post("/api/logout", async (req, res) => {
  // Clear session data

  try {
    // logout from all devices
    req.user.tokens = [];

    res.clearCookie("jwt");
    console.log("logout successful...");
    await req.user.save();
    res.render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("password email");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "thenaemischadnanshamacaslsldthenme",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get user details

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(uploadDirectory));

const SECRET_KEY =
  process.env.SECRET_KEY || "thenaemischadnanshamacaslsldthenme";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "utamsharma57@gmail.com",
    pass: "dbsq lvct gjep lowe",
  },
});

app.post("/forgot_email", async (req, res) => {
  try {
    const { email } = req.body;

    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(400).json({ error: "Email does not exist" });
      }

      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });
      const resetPasswordURL = `http://localhost:3000/Createpassword/${user._id}/${token}`;

      const mailOptions = {
        from: "utamsharma575757@gmail.com",
        to: email,
        subject: "Password Reset",
        text:
          `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste it into your browser to complete the process:\n\n` +
          resetPasswordURL +
          "\n\n" +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send("Failed to send email");
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send("Email sent successfully (if email exists)");
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to send email" });
  }
});

app.post("/createpassword/:id/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const { id, token } = req.params;
    const decode = jwt.verify(token, SECRET_KEY);

    if (decode.id !== id) {
      return res.status(400).json({ error: "Token does not match user id" });
    }

    const hashing = await bcrypt.hash(password, 10);
    const updateUser = await User.findByIdAndUpdate(
      id,
      { password: hashing },
      { new: true }
    );

    if (updateUser) {
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(400).json({ error: "Failed to update password" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    const errorMessage =
      error.name === "JsonWebTokenError"
        ? "Invalid or expired token"
        : "Failed to update password";
    return res.status(400).json({ message: errorMessage });
  }
});

//getting the userproducts from the database

app.get("/userproducts", async (req, res) => {
  try {
    const userproducts = await Order.find({});
    res.json(userproducts);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/placeOrder", (req, res) => {
  const order = req.body;
  Order.push(order); // Save order (replace with DB logic)
  res.status(200).json({ message: "Order placed successfully", order });
});

// Route to initiate eSewa payment
app.get("/initiate-payment", async (req, res) => {
  const { amount, productId } = req.query;
  const esewaConfig = {
    url: `https://epay.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=${amount}&transaction_uuid=${""}`, // eSewa payment URL (use production URL for live)
    successUrl: "http://localhost:5000/esewa-payment-success",
    failureUrl: "http://localhost:5000/esewa-payment-failure",
    merchantCode: "YOUR_MERCHANT_CODE",
  };

  const paymentUrl = `${esewaConfig.url}?amt=${amount}&pdc=0&psc=0&txAmt=0&tAmt=${amount}&pid=${productId}&scd=${esewaConfig.merchantCode}&su=${esewaConfig.successUrl}&fu=${esewaConfig.failureUrl}`;

  res.json({ paymentUrl });
});

// Route to handle eSewa payment success callback
app.get("/esewa-payment-success", async (req, res) => {
  const { amt, oid, refId } = req.query;

  const esewaVerificationUrl = `https://uat.esewa.com.np/epay/transrec?amt=${amt}&rid=${refId}&pid=${oid}&scd=YOUR_MERCHANT_CODE`;

  try {
    const response = await axios.post(esewaVerificationUrl);
    if (response.data.includes("Success")) {
      // Payment verification successful
      res.redirect("http://localhost:3000/payment-success"); // Redirect to success page in frontend
    } else {
      // Payment verification failed
      res.redirect("http://localhost:3000/payment-failure"); // Redirect to failure page in frontend
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.redirect("http://localhost:3000/payment-failure"); // Redirect to failure page in frontend
  }
});

// Route to handle eSewa payment failure callback
app.get("/esewa-payment-failure", (req, res) => {
  res.redirect("http://localhost:3000/payment-failure"); // Redirect to failure page in frontend
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("message", (data) => {
    console.log(data);

    io.emit("recieve-message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//sending the email to the user if they confirmed thier order and sucess placed

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
