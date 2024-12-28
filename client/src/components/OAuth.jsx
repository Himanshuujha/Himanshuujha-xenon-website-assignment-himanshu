import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            // Simulate user data (Replace with actual data if needed)
            const userData = {
                name: "John Doe",   // Replace with dynamic name
                email: "john.doe@example.com",  // Replace with dynamic email
                photo: "https://example.com/photo.jpg"  // Replace with dynamic photo URL
            };

            // Simulate a successful login
            dispatch(signInSuccess(userData));

            // Navigate to the home page after successful sign-in
            navigate("/");         

        } catch (error) {
            console.log('Could not sign in', error);
        }
    };

    return (
        <button onClick={handleGoogleClick} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Continue with Google
        </button>
    );
};

export default OAuth;
