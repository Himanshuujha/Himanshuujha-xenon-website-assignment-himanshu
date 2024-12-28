export default function Footer() {
    return (
      <footer className="bg-slate-800 text-white py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Property Listings</h2>
            <p className="text-sm mt-2">Find your perfect property today!</p>
          </div>
          <div className="text-center mt-4 border-t border-gray-600 pt-4 text-sm">
            <p>&copy; {new Date().getFullYear()} Property Listings. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  