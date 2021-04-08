const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;


const { timeStamp } = require('console');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        required:true,
        maxlength:2000
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32
    },
    category:{
        type:ObjectId, //it will go to the category model and we will extract the object id from it
        ref:"Category", //refering to the category model
        required:true
    },
    quantity:{
        type:Number,
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        //if we want to add shipping stuff like is it shippable or not
        required:false,
        type:Boolean
    },
},
{timestamps:true}
);
module.exports=mongoose.model("Product",productSchema)