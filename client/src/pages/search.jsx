import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ListingItem from '../components/Listitem';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`http://localhost:5000/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`http://localhost:5000/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='mt-16 flex flex-col md:flex-row'>
      {/* Sidebar */}
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen bg-gray-50 shadow-md'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-medium'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          {/* Type Selection */}
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-medium'>Type:</label>
            {['all', 'rent', 'sale'].map((type) => (
              <div key={type} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id={type}
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata.type === type}
                />
                <span className='capitalize'>{type}</span>
              </div>
            ))}
          </div>
          {/* Amenities */}
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-medium'>Amenities:</label>
            {['parking', 'furnished'].map((amenity) => (
              <div key={amenity} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id={amenity}
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebardata[amenity]}
                />
                <span className='capitalize'>{amenity}</span>
              </div>
            ))}
          </div>
          {/* Sort */}
          <div className='flex items-center gap-2'>
            <label className='font-medium'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='created_at_desc'>Latest</option>
              <option value='created_at_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700'>
            Search
          </button>
        </form>
      </div>

      {/* Listings Section */}
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold p-5 text-gray-700'>
          Listing Results
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-gray-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-gray-700 text-center w-full'>
              Loading...
            </p>
          )}
          {!loading &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-blue-700 hover:underline p-5 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
