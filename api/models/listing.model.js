import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
        unique : true,
    },
    price:{
        type:Number,
        required:true,
    },
    discountedPrice:{
        type:Number,
        required:false,
    },
    area:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    imageurls:{
        type:Array,
        required:true,
    },
    userRef:{
        type: String,
        required: true,
    },
    latitude:{
        type:String,
        required:true,
    },
    longitude:{
        type:String,
        required:true,
    },
    },{timestamps: true}
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
