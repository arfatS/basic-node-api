const mongoose = require('mongoose')

const User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    }
})

module.exports = User