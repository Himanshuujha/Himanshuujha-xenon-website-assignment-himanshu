import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/Listitem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchListings = async (type, setter) => {
      try {
        const res = await fetch(`http://localhost:5000/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setter(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings("offer=true", setOfferListings);
    fetchListings("type=rent", setRentListings);
    fetchListings("type=sale", setSaleListings);
    console.log(offerListings)
    console.log(saleListings)
    console.log(rentListings)
  }, []);

  return (
    <div className="bg-white text-gray-800 min-h-screen mt-20"> {/* Added mt-20 for margin */}
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center gap-6 py-16 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Find Your Perfect <span className="text-blue-500">Home</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Discover properties tailored to your needs. Whether you're looking to
          buy, rent, or find exclusive offers, we've got you covered!
        </p>
        <Link
          to="/search"
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Start Searching
        </Link>
      </div>

      {/* Swiper Section */}
      <div className="relative max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Featured Properties
        </h2>
        <Swiper navigation spaceBetween={20} slidesPerView={1}>
          {offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-72 rounded-lg shadow-md"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Listings Section */}
      <div className="max-w-6xl mx-auto py-8 px-4 grid gap-12">
        {[
          { title: "Recent Offers", listings: offerListings, type: "offer=true" },
          { title: "Places for Rent", listings: rentListings, type: "type=rent" },
          { title: "Places for Sale", listings: saleListings, type: "type=sale" },
        ].map(
          ({ title, listings, type }) =>
            listings && listings.length > 0 && (
              <div key={title}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                  <Link
                    to={`/search?${type}`}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    View More
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {listings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
