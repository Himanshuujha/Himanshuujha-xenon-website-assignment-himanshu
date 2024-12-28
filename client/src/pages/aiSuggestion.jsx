import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md"; // Import MdLocationOn for the location icon

const AiSuggestions = () => {
  const [listing, setListing] = useState(null);

  // Fetch AI suggestions
  useEffect(() => {
    const fetchAiSuggestions = async () => {
      try {
        const aiSuggest = await fetch("http://localhost:5000/api/listing/ai");
        const data = await aiSuggest.json();
        setListing(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching AI suggestions:", error);
      }
    };

    fetchAiSuggestions();
  }, []);

  // Handle null state to avoid errors
  if (!listing) {
    return <div className="mt-30">Loading...</div>; // Show a loading state while data is being fetched
  }

  const price = listing.offer
    ? listing.discountPrice?.toLocaleString("en-US") // Safely access discountPrice
    : listing.regularPrice?.toLocaleString("en-US"); // Safely access regularPrice

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 mt-200">
      <div className="bg-white shadow-lg rounded-xl w-full sm:w-[400px] md:w-[450px] overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
        <img
          src={
            listing.imageUrls?.[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[220px] sm:h-[250px] w-full object-cover"
        />
        <div className="p-5 flex flex-col gap-4">
          {/* Property Name */}
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {listing.name}
          </h3>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <MdLocationOn className="text-blue-600 w-5 h-5" />
            <span className="truncate">{listing.address}</span>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
            {listing.description}
          </p>

          {/* Price */}
          <p className="text-gray-800 text-lg font-semibold">
            ${price || "N/A"} {/* Fallback to "N/A" if price is not available */}
            {listing.type === "rent" && " / month"}
          </p>

          {/* Details */}
          <div className="flex items-center gap-4 mt-2">
            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </span>
            <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSuggestions;
