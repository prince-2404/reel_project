const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const foodpartnerModel = require("../models/foodpartner.model");


async function registerUser(req , res){

    const {fullName , email , password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(200).json({
        message: "user register sucessfully",
        user:{
        _id: user._id,
        fullName : user.fullName,
        email: user.email
    }
    })

}

async function loginUser(req , res){

    const {email , password} = req.body

    const user = await userModel.findOne({
        email
    })

    if(!user){
       return res.status(400).json({message: "Invalid email or password"})

    }

    const isPasswordMatch = await bcrypt.compare(password , user.password)

    if(!isPasswordMatch){
        return res.status(400).json({message: "Invalid email or password"})
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

res.cookie("token", token)

    res.status(200).json({
    message:"User login sucessfully",
    user:{
        _id:user._id,
        email: user.email,
        fullName: user.fullName

    }
 })
}

function logoutUser(req , res){
    res.clearCookie("token")

    res.status(200).json({
        message: 'User logout sucessfully'
    })
}

async function registerFoodPartner(req , res){

    const {name , email, password} = req.body;

    const isFoodPartnerAlreadyExist = await foodpartnerModel.findOne({
        email
    })

    if(isFoodPartnerAlreadyExist){
        return res.status(400).json({
            message:"foodpartner already exist"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await foodpartnerModel.create({
        name,
        email,
        password : hashPassword
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message:"foodpartner register sucessfully",
        user:{
            _id : user._id,
            name : user.name,
            email : user.email
        }
    })

}

async function loginFoodPartner(req , res){
    
    const {email , password} = req.body;

    const foodpartner = await foodpartnerModel.findOne({
        email
    })

    if(!foodpartner){
        res.status(400).json({message: "Invalid email or password"})
    }

    const isPasswordMatch = await bcrypt.hash(password , foodpartner.password)

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodpartner._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:"FoodPartner login sucessfully",
        user:{
            id: foodpartner._id,
            name: foodpartner.name,
            email: foodpartner.email
        }
    })
}

function logoutFoodPartner(req , res){
    res.clearCookie("token")
    res.status(200).json({
        message: "FoodPartner logout sucessfully",
    })
}

 




module.exports = {registerUser , loginUser , logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner}


