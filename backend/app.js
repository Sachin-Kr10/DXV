const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.json({status :"API running"})
})
app.use("/api", require("./routes/user/category.routes"));


app.use((req,res)=>{
    res.status(404).json({message:"Route not found"})
})


module.exports = app;