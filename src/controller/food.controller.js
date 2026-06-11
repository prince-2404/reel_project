const foodModel = require("../models/food.model")
const { v4: uuid} = require("uuid")
const storageService = require("../services/storage.service")

async function createFood(req , res){

    // console.log(req.foodpartner);
    // console.log(req.body);
    // console.log(req.file);

    const fileUploadResult = await storageService.uploadFile(req.file.buffer , uuid())
    
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodpartner: req.foodpartner._id
    })

    res.status(201).json({
        message:"food created sucessfully",
        food: foodItem
    })
    

}

async function getFoodItem(req , res){

    const foodItem = await foodModel.find({})

    res.status(200).json({
        message:"food item fected sucessfully",
        foodItem
    })
}

module.exports = {createFood , getFoodItem}