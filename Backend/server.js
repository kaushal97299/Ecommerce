const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/autherRoutes");
const cors = require("cors");
const  productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const  AdminRoutes =require("./routes/AdminRoutes")
const app = express();


app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/Adminsignup",AdminRoutes)



connectDB();

app.listen(4000, () => console.log(`🚀 Server running on port ${4000}`));
