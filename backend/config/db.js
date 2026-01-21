const mongoose  = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGO_URL, {
        autoIndex :false,
        maxPoolSize : 20, 
    })
    .then(()=>{
      console .log("MongoDB connected")
    })
    .catch((error)=> {
      console.log("DB connection Failed", error.message);
      process.exit(1);
    })
}
module.exports = connectDB;