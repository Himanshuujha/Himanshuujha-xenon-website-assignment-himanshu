import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from '../assets/logo.png';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = new URLSearchParams({ searchTerm }).toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleAiSearch = () => navigate('/ai-suggestions');

  useEffect(() => {
    const searchTermFromUrl = new URLSearchParams(location.search).get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 sm:h-12" />
          <span className="font-bold text-lg text-gray-800 ml-2 hidden sm:inline">Assignment</span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-lg hidden md:flex items-center"
        >
          <input
            type="text"
            placeholder="Search for properties..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-3">
            <FaSearch className="text-gray-600 hover:text-gray-800 transition" />
          </button>
        </form>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* AI Suggestions Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition hidden sm:block"
            onClick={handleAiSearch}
          >
            AI Suggestions
          </button>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-500 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-800 hover:text-blue-500 transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/sign-in"
                className="text-gray-800 hover:text-blue-500 transition"
              >
                {currentUser ? (
                  <Link to="/profile" >
                    <img
                    src={currentUser.avatar}
                    alt="Avatar"
                    className="rounded-full h-8 w-8 object-cover border border-gray-300"
                  />
                    </Link>
                ) : (
                  "Sign In"
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="md:hidden bg-gray-100 px-4 py-2 fixed bottom-0 left-0 w-full flex items-center space-x-2 shadow-inner"
      >
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 pl-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="text-blue-500">
          <FaSearch />
        </button>
      </form>
    </header>
  );
};

export default Header;
