import React, { useState, useContext } from "react";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Provider/Provider";

const SignUp = () => {

  const { createNewUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { name, email, password } = formData;

    try {
      // Step 1: Create user in Firebase
      const userCredential = await createNewUser(email, password);
      const user = userCredential.user;

      // Step 2: Update profile with name
      await updateProfile(user, {
        displayName: name,
      });

      // Step 3: Send user data to the database (only if it's their first login)
      const userInfo = {
        uid: user.uid,
        name,
        email,
      };

      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to store user data on server");
      }

      alert("Sign-up successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
