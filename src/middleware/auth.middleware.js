const foodpartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")



async function authFoodPartnerMiddleware(req , res, next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Please loging first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const foodpartner = await foodpartnerModel.findById(decoded.id);

        if(!foodpartner){
            return res.status(401).json({
                message:"food partner not found"
            })
        }
        req.foodpartner= foodpartner

        next()
        
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token"
        })
        
    }




}

async function authUserMiddleware(req, res, next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Please login first"
        })
    }

   try {
     const decoded = jwt.verify(token , process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    if(!user){
        return res.status(401).json({
            message:"User not found"
        })

    }

    req.user = user

    next()

    
   } catch (error) {

     res.status(401).json({message:"Invalid token"})

   }

}




module.exports = {authFoodPartnerMiddleware, authUserMiddleware}