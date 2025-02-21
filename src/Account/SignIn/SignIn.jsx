import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/Provider";
import { FcGoogle } from "react-icons/fc"; // Google icon
import signInImage from "../../assets/login.svg";

const SignIn = () => {
  const { logIn, signInWithGoogle } = useContext(AuthContext); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      console.log("User signed in successfully!");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("Google Sign-in successful!");
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  return (
    <div className="  lg:py-20 lg:px-36">
      
      <div className="bg-white/65 flex md:flex-row-reverse flex-col items-center justify-center">

        {/* Sign In Image */}
      <div className="flex justify-center">
          <img src={signInImage} alt="Sign In" className="h-40 md:h-96" />
        </div>
      <div className=" p-8 shadow-lg rounded-lg max-w-md w-full">
        

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Welcome Back!</h2>

        {/* Sign-in Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4 text-black">
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition-all"
          >
            Sign In
          </button>
        </form>

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

export default SignIn;
