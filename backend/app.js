require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({origin: process.env.CLINT_URL,credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/nav", require("./routes/user/nav.routes"));
app.use("/api/products", require("./routes/user/product.routes"));

app.get("/",(req,res)=>{
    res.json({status :"API running"})
})

app.use((req,res)=>{
    res.status(404).json({message:"Route not found"})
})


module.exports = app;