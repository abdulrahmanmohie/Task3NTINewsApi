const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Reporter'
    },
    avatar:{
        type:Buffer
    }
},
{
    timestamps:true
})

const News = mongoose.model('News',newsSchema)
module.exports = News