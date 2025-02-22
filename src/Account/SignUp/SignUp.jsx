import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import signUpImage from "../../assets/signup.svg";
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const { createNewUser, signInWithGoogle } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle User Sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create user with Firebase Authentication
      const userCredential = await createNewUser(email, password);
      const user = userCredential.user;

      // Update user profile in Firebase
      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl
      });

      // Store user in MongoDB (Preventing duplicates)
      await axiosPublic.post("/users", { name, email, photoUrl });

      console.log("User signed up and data stored successfully!");
      navigate("/");
    } catch (error) {
      console.error("Sign Up Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Store Google user in MongoDB (Preventing duplicates)
      await axiosPublic.post("/users", {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
      });

      console.log("Google Sign-in successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  return (
    <div className="lg:py-20 lg:px-36">
      <div className="bg-white/65 flex md:flex-row-reverse flex-col items-center justify-center">
        {/* Sign Up Image */}
        <div className="flex justify-center">
          <img src={signUpImage} alt="Sign Up" className="h-40 md:h-96" />
        </div>

        <div className="p-8 shadow-lg rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Your Account</h2>

          {/* Sign-up Form */}
          <form onSubmit={handleSignUp} className="space-y-4 text-black">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Photo URL"
              className="border border-gray-300 p-3 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Redirect to Sign In */}
          <div className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/signIn" className="text-blue-600">Sign In</Link>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center bg-rose-900 text-white px-4 py-2 rounded w-full hover:bg-red-800 transition-all"
          >
            <FcGoogle className="text-2xl mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
