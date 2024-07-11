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
        const limit = parseInt(req.query.limit) || 500;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const neLat = parseFloat(req.query.neLat);
        const neLng = parseFloat(req.query.neLng);
        const swLat = parseFloat(req.query.swLat);
        const swLng = parseFloat(req.query.swLng);

        // Extract filters from query string and parse them
        const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

        // Build the geoQuery object if bounds are provided
        let geoQuery = {};
        if (!isNaN(neLat) && !isNaN(neLng) && !isNaN(swLat) && !isNaN(swLng)) {
            geoQuery = {
                location: {
                    $geoWithin: {
                        $geometry: {
                            type: "Polygon",
                            coordinates: [[
                                [swLng, neLat], // Top-left corner
                                [neLng, neLat], // Top-right corner
                                [neLng, swLat], // Bottom-right corner
                                [swLng, swLat], // Bottom-left corner
                                [swLng, neLat]  // Closure of the polygon
                            ]]
                        }
                    }
                }
            };
        }

        let priceQuery = {};
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange;
            priceQuery = {
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            };
        }

        let acresQuery = {};
        if (filters.acresRange) {
            const [minAcres, maxAcres] = filters.acresRange;
            acresQuery = {
                titleAcres: {
                    $gte: minAcres,
                    $lte: maxAcres
                }
            };
        }

        let serviceTypeQuery = {};
        if (filters.serviceType && filters.serviceType.length > 0) {
            serviceTypeQuery = {
                serviceType: {
                    $in: filters.serviceType
                }
            };
        }

        let listingStatusQuery = {};
        if (filters.serviceType && filters.listingStatus.length > 0) {
            listingStatusQuery = {
                listingStatus: {
                    $in: filters.listingStatus
                }
            };
        }

        let updatesQuery = {};
        if (filters.serviceType && filters.updates.length > 0) {
            updatesQuery = {
                updates: {
                    $in: filters.updates
                }
            };
        }

        const query = {
            $and: [
                {
                    $or: [
                        {title: {$regex: searchTerm, $options: 'i'}},
                        {description: {$regex: searchTerm, $options: 'i'}}
                    ]
                },
                geoQuery,
                priceQuery,
                acresQuery,
                serviceTypeQuery,
                listingStatusQuery,
                updatesQuery
            ]
        };

        const listings = await Listing.find(query).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};


