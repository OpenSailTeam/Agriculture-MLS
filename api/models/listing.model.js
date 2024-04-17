import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({

    title:{
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
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
      },
    },{timestamps: true}
);

listingSchema.index({ location: "2dsphere" });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
