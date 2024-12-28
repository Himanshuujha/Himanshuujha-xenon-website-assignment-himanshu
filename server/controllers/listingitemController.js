import ListingItems from "../models/Listingitemmodel.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await ListingItems.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// Delete Listing
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await ListingItems.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"));

    if (req.user.id !== listingItems.userRef) {
      return next(errorHandler(403, "You can only delete your own listings"));
    }

    await ListingItems.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

// Update Listing
export const updateListing = async (req, res, next) => {
  try {
    const listing = await ListingItems.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"));

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(403, "You can only update your own listings"));
    }

    const updatedListing = await ListingItems.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// Get Listing by ID
export const getListing = async (req, res, next) => {
  try {
    const listing = await ListingItems.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found!"));

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Get Listings with filters, sorting, etc.
export const getListings = async (req, res) => {
    try {
      console.log("/listings");
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      const searchTerm = req.query.searchTerm || "";
  
      const allowedSortFields = ["createdAt", "price", "name"];
      const allowedOrderValues = ["asc", "desc"];
      const sort = allowedSortFields.includes(req.query.sort) ? req.query.sort : "createdAt";
      const order = allowedOrderValues.includes(req.query.order) ? req.query.order : "desc";
  
      let { offer, furnished, parking, type } = req.query;
  
      offer = offer === undefined || offer === "false" ? { $in: [false, true] } : offer === "true";
      furnished = furnished === undefined || furnished === "false" ? { $in: [false, true] } : furnished === "true";
      parking = parking === undefined || parking === "false" ? { $in: [false, true] } : parking === "true";
      type = type === undefined || type === "all" ? { $in: ["sale", "rent"] } : type;
      
      const listings = await ListingItems.find({
        
        offer,
        furnished,
        type,
        parking,
      })
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(startIndex);
        
  
      if (listings.length === 0) {
        console.log("sent listing")
        return res.status(404).json({ message: "No listings found." });
      }
  
      res.status(200).json(listings);
      
    } catch (error) {
      console.log(error);
    }
  };
  

// Get one random listing
export const getOneRandom = async (req, res) => {
  try {
    const count = await ListingItems.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomDoc = await Listing.findOne().skip(random);
    res.status(200).json(randomDoc);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random listing" });
  }
};
