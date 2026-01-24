const express = require("express");
const Category = require("../../models/Category");

const router = express.Router();

router.get("/categories/main", async (req,res,next)=>{
    try{
        const categories = await Category.find({
            level:1,
            isActive:true
        },
        {
            name : 1,
            slug:1
        }).sort({name:1});

        res.json(categories);
    }
    catch(err){
        next(err);
    }
})

router.get("/categories", async (req,res,next)=>{
    try{
        const filter ={level :2,isActive :true};
        if(req.query.main){
            filter.parent = req.query.main;
        }
        const categories = await Category.find(
            filter,{
                name :1,
                slug:1,
                parent:1
            }
        ).sort({name:1});

        res.json(categories);
    }
    catch(err){
        next(err);
    }
})

router.get("/categories/sub", async (req,res,next)=>{
    try{
        if(!req.query.category){
            return res.json([]);
        }
        const subCategories = await Category.find({
            level : 3,
            parent : req.query.category,
            isActive :true,
        },{
            name :1,
            slug:1,parent:1
        }).sort({name:1});
        res.json(subCategories);
    }
    catch(err){
        next(err);
    }
})

module.exports = router;