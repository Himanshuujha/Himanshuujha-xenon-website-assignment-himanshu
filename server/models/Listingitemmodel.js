import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    regularPrice: {
      type: Number,
      required: true,
      min: 0, 
    },
    discountPrice: {
      type: Number,
      required: true,
      min: 0, 
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0, 
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0, 
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['rent', 'sale'], 
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.every(url => /^(https?:\/\/)?([a-z0-9]+[.])?[a-z0-9]+\.[a-z]{2,6}(\/[^\s]*)?$/i.test(url)); // Validates URL format
        },
        message: props => `${props.value} is not a valid URL!`
      },
    },
    userRef: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);


const Listing = mongoose.model("ListingItems", listingSchema);

export default Listing;
