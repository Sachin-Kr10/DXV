require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db")

connectDB();



const PORT = process.env.PORT;

app.listen(PORT,()=>{
console.log("http://localhost:3000")
})




