const express = require("express");
const Category = require("../models/category");

const router = express.Router();

router.get("/", async(req,res,next)=>{
    try{
        console.log("sunny");
        const categories = await Category.find({isActive : true})
        // .select("name slug image")
        // .sort({createdAt : 1});

        res.json(categories);
    }
    catch(err){
        next(err);
    }
})

module.exports = router;