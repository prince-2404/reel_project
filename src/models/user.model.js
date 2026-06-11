const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    
    fullName:{
        type: String,
        required: true

    },
    email:{
        type: String,
        requried: true,
        unique: true
    },
    password:{
        type: String,
        requried: true
    }
},
{
    timestamps: true
})


const userModel = mongoose.model('user', userSchema)

module.exports = userModel