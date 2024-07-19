import Listing from "../models/listing.model.js";
import { errorHandler } from '../utils/error.js';

const VALID_SORT_FIELDS = ['createdAt', 'price', 'titleAcres', 'cultivatedAcres', 'soilFinalRating', 'avgAVPerQtr', 'improvements'];
const VALID_SORT_ORDERS = { 'ascending': 1, 'descending': -1 };

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
        const sortField = req.query.sort || 'createdAt';
        const sortOrder = req.query.order || 'descending';

        // Validation for sortField and sortOrder
        if (!VALID_SORT_FIELDS.includes(sortField) || !Object.keys(VALID_SORT_ORDERS).includes(sortOrder)) {
            return next(errorHandler(400, 'Invalid sort parameters.'));
        }

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

        let queries = [];
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange;
            queries.push({ price: { $gte: minPrice, $lte: maxPrice } });
        }
        if (filters.acresRange) {
            const [minAcres, maxAcres] = filters.acresRange;
            queries.push({ titleAcres: { $gte: minAcres, $lte: maxAcres } });
        }
        if (filters.soilRange) {
            const [minSoil, maxSoil] = filters.soilRange;
            queries.push({ soilFinalRating: { $gte: minSoil, $lte: maxSoil } });
        }
        if (filters.serviceType) {
            queries.push({ serviceType: { $in: filters.serviceType } });
        }
        if (filters.listingStatus) {
            queries.push({ listingStatus: { $in: filters.listingStatus } });
        }
        if (filters.enterprises) {
            queries.push({ enterprises: { $in: filters.enterprises } });
        }
        if (filters.updates) {
            queries.push({ updates: { $in: filters.updates } });
        }

        const searchQuery = {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        };

        const query = {
            $and: [searchQuery, geoQuery, ...queries]
        };

        const sortCriteria = { [sortField]: VALID_SORT_ORDERS[sortOrder] };

        const listings = await Listing.find(query).sort(sortCriteria).limit(limit).skip(startIndex);
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};
