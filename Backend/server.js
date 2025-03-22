const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/autherRoutes");
const cors = require("cors");
const  productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const  AdminRoutes =require("./routes/AdminRoutes")
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/Adminsignup",AdminRoutes)



connectDB();
const PORT=process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
