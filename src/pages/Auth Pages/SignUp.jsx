import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, googleLogin, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);

  // 🔼 Handle image upload to imgbb
  const handleImageUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`,
        formData
      );
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  // 🔐 Handle manual email/password signup
  const onSubmit = async (data) => {
    try {
      const res = await createUser(data.email, data.password);
      console.log("Auth created:", res);

      // ✅ Set role = 'user' by default
      const userInfo = {
        userEmail: data.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axios.post("http://localhost:3000/users", userInfo);

      const profileInfo = {
        displayName: data.name,
        photoURL: profilePic,
      };

      await updateUserProfile(profileInfo);
      navigate(location.state?.from || "/");
    } catch (err) {
      console.error("Signup error:", err.message);
    }
  };

  // 🔐 Google sign-in with fallback user creation
  const handleGoogleSignIn = async () => {
    try {
      const res = await googleLogin();
      const userInfo = {
        userEmail: res.user?.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axios.post("http://localhost:3000/users", userInfo);
      navigate(location.state?.from || "/");
    } catch (err) {
      console.error("Google Sign-In Error:", err.message);
    }
  };

  return (
    <div className="hero w-full py-12 min-h-screen bg-base-100">
      <div className="card-body bg-white shadow-lg rounded-lg w-full max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-2">Create an Account</h1>
        <p className="text-center text-gray-500 mb-6">Register with ROAVIA</p>

        {/* Profile image preview */}
        <div className="h-20 w-20 rounded-full border overflow-hidden mb-6 mx-auto">
          {uploading ? (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">
              Uploading...
            </div>
          ) : profilePic ? (
            <img
              src={profilePic}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
              Your Profile
            </div>
          )}
        </div>

        {/* Main SignUp Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label text-black font-bold">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Name"
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
          </div>

          <div>
            <label className="label text-black font-bold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
          </div>

          <div>
            <label className="label text-black font-bold">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && <p className="text-red-500 text-sm">Password is required</p>}
            {errors.password?.type === "minLength" && <p className="text-red-500 text-sm">Minimum 6 characters</p>}
          </div>

          {/* Profile image uploader */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-semibold text-black">Upload Your Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          <button
            type="submit"
            className="btn bg-[#caeb66] border-[#caeb66] hover:bg-[#caeb6640] duration-300 w-full"
          >
            Sign Up
          </button>
        </form>

        <div className="divider">OR</div>
        <button
          className="btn w-full bg-gray-200 text-black border-[#e5e5e5]"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle size={20} />
          Register with Google
        </button>

        <p className="text-gray-600 text-sm mt-4 text-center">
          Already have an account? {" "}
          <a href="/login" className="text-[#caeb90] underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;