// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const navRoutes = require("./routes/user/nav.routes")
const productRoutes =  require("./routes/user/product.routes")
const authRoutes = require('./routes/user/auth.routes');
const errorMiddleware = require("./middlewares/error.middleware");
const adminProductRoutes = require("./routes/admin/product.routes")
const adminCategoryRoutes = require("./routes/admin/category.routes")
const brandAdminRoutes = require("./routes/admin/brand.routes");
const cartRoutes = require("./routes/user/cart.routes")

const app = express();


app.use(cors({origin: process.env.CLINT_URL,credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/nav", navRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);




app.use("/api/admin/brands", brandAdminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);






app.use(errorMiddleware);
app.get("/",(req,res)=>{
    res.json({status :"API running"})
})
app.use((req,res)=>{
    res.status(404).json({message:"Route not found"})
})
module.exports = app;