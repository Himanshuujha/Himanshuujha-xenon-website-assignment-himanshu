import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import clsx from 'clsx';

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg overflow-hidden w-full sm:w-[320px] lg:w-[360px] mx-auto">
      <Link to={`/listing/${listing._id}`} className="block group">
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt="listing cover"
          className="w-full h-[240px] sm:h-[220px] lg:h-[260px] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl"
        />
        <div className="p-4 space-y-3">
          {/* Property Name */}
          <p className="truncate text-xl font-semibold text-slate-700 mb-1">{listing.name}</p>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdLocationOn className="h-5 w-5 text-green-700" />
            <p className="truncate">{listing.address}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>

          {/* Price and Property Details */}
          <div className="flex justify-between items-center mt-2">
            <p className="text-xl text-slate-800 font-semibold">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>

            <div className="flex gap-4 text-xs font-bold text-slate-700">
              <div>{listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}</div>
              <div>{listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

