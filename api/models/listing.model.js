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
        required:false,
        unique:false,
    },
    price:{
        type:Number,
        required:true,
    },
    contacts:{
        type:Array,
        required:true,
    },
    enterprises:{
        type:Array,
        required:false,
    },
    closestTown:{
        type:String,
        required:false,
    },
    updates:{
        type:Array,
        required:true,
    },
    listingStatus:{
        type:String,
        required:true,
    },
    mlsNumber:{
        type:String,
        required:false,
    },
    expiryDate:{
        type:String,
        required:false,
    },
    videoLink:{
        type:String,
        required:false,
    },
    brokerage:{
        type:String,
        required:true,
    },
    serviceType:{
        type:String,
        required:true,
    },
    discountedPrice:{
        type:Number,
        required:false,
    },
    titleAcres:{
        type:Number,
        required:false,
    },
    cultivatedAcres:{
        type:Number,
        required:false,
    },
    soilFinalRating:{
        type:Number,
        required:false,
    },
    avgAVPerQtr:{
        type:Number,
        required:false,
    },
    improvements:{
        type:Number,
        required:false,
    },
    imageUrls:{
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
