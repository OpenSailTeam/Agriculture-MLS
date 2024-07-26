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
        Object.keys(filters).forEach(key => {
            if (Array.isArray(filters[key]) && filters[key].length > 0) {
                switch (key) {
                    case 'priceRange':
                        const [minPrice, maxPrice] = filters[key];
                        queries.push({ price: { $gte: minPrice, $lte: maxPrice } });
                        break;
                    case 'acresRange':
                        const [minAcres, maxAcres] = filters[key];
                        queries.push({ titleAcres: { $gte: minAcres, $lte: maxAcres } });
                        break;
                    case 'soilRange':
                        const [minSoil, maxSoil] = filters[key];
                        queries.push({ soilFinalRating: { $gte: minSoil, $lte: maxSoil } });
                        break;
                    case 'serviceType':
                    case 'listingStatus':
                    case 'enterprises':
                    case 'updates':
                        queries.push({ [key]: { $in: filters[key] } });
                        break;
                }
            }
        });

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
