const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({origin:"http://localhost:5173",credentials: true}))

app.use("/api/categories",require("./routes/category.routes"));

app.use("/api/admin", require("./routes/adminroutes/category.routes"))

const PORT = process.env.PORT;

app.listen(PORT,()=>{
console.log("http://localhost:3000")
})




