import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-8">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="password"
              onChange={handleChange}
            />
          </div>
          <button
            disabled={loading}
            className="w-full p-4 bg-indigo-600 text-white rounded-lg uppercase font-semibold tracking-wider hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <div className="flex justify-between items-center my-6">
          <div className="w-1/3 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500">or</p>
          <div className="w-1/3 h-px bg-gray-300"></div>
        </div>

        <OAuth />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Don't have an account? 
            <Link to={"/sign-up"}>
              <span className="text-indigo-600 font-semibold cursor-pointer"> Sign Up</span>
            </Link>
          </p>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
