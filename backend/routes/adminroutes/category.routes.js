const express = require("express");
const Category = require("../../models/category");

const router = express.Router();

router.post("/categories", async(req,res,next)=>{
    try{
        const {name , image }= req.body;
        const category = await Category.create({
            name,
            slug: name.toLowerCase().replace(/\s+/g,"-"),
            image,
        });
        res.status(201).json(category);
    }
    catch(err){
        next(err);
    }
});

router.patch("categories/:id/toggle", async (req,res,next)=>{
    try{
        const cat = await Categories.findById(req.params.id);
        cat.isActive = !cat.isActive;
        await cat.save();
        res.json({success : true});
    }
    catch(err){
        next(err);
    }
})

module.exports = router;