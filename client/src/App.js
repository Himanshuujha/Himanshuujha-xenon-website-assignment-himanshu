
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/privateRoute";
import CreateListing from "./pages/createlisting";
import UpdateListing from "./pages/updateListing";
import Listing from "./pages/listing";
import Search from "./pages/search";
import AiSuggestions from './pages/aiSuggestion';
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/listing/:listingId" element={<Listing />} />
      <Route path="/search" element={<Search />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/update-listing/:listingId" element={<UpdateListing />} />
      </Route>
      
       <Route path="/ai-suggestions" element={<AiSuggestions />} />  
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
