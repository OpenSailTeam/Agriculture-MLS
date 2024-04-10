import Listing from "../models/listing.model.js";
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        const newListing = await Listing.create(req.body);
        res.status(201).json(newListing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
   
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing){
            
            return next(errorHandler(404, 'Listing not found!'));
    
        } else if (listing.userRef !== req.user.id) {
                
            return next(errorHandler(401, 'You can only delete your own listings!'));
        
        } else {     
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted...');
    }} catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    
    try {
    const listing = await Listing.findById(req.params.id);
    if (!listing){
        
        return next(errorHandler(404, 'Listing not found!'));

    } else if (listing.userRef !== req.user.id) {
            
        return next(errorHandler(401, 'You can only update your own listings!'));
    
    } else {
        
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedListing);
    }
    } catch (error) {
        next(error);
    }
};


export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing){
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;


        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';


        const listings = await Listing.find(
            {
                $or: [
                    {title: {$regex: searchTerm, $options: 'i'}},
                    {description: {$regex: searchTerm, $options: 'i'}},
                    {location: {$regex: searchTerm, $options: 'i'}},
                ],
            }).sort(
                {[sort]: order}
            ).limit(limit).skip(startIndex);
        
            return res.status(200).json(listings);
        } catch (error) {
            next(error);
         }
};