import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { googleLogin, signInUser, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // রোল অনুযায়ী রিডাইরেক্ট ফাংশন
  const redirectByRole = () => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else if (user?.role === "guide") {
      navigate("/guide-dashboard");
    } else {
      navigate(location.state?.from || "/");
    }
  };

  // Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      console.log("Google Login Success:", res.user);

      // গুগল লগইন হলে ইউজারের ডাটা ফেচ হয়ে AuthContext এ সেট হবে, তাই redirect এখানে করবো
      redirectByRole();
    } catch (err) {
      console.error("Google Login Error:", err);
    }
  };

  // Form Submission Handler
  const onSubmit = async (data) => {
    try {
      const res = await signInUser(data.email, data.password);
      console.log("Email Login Success:", res.user);

      // লগইনের পরে রোল দেখে রিডাইরেক্ট
      redirectByRole();
    } catch (err) {
      console.error("Email Login Error:", err.message);
    }
  };

  return (
    <div className="hero w-full lg:mt-10">
      <div className="card-body flex flex-col gap-2 w-full lg:w-1/2">
        <h1 className="text-4xl font-bold">Welcome Home</h1>
        <p>Login With ProFast</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset w-full">
            <label className="label text-black font-bold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            <label className="label text-black font-bold">Password</label>
            <input
              type="password"
              className="input w-full"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
            />
            {errors.email && <p className="text-red-900">Email is required</p>}
            {errors.password?.type === "required" && (
              <p className="text-red-900">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-900">Password must be 6+ characters</p>
            )}

            <div>
              <a className="link link-hover text-gray-600 text-sm underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn bg-[#caeb66] border-[#caeb66] hover:bg-[#caeb6640] duration-300 mt-4"
            >
              Login
            </button>

            <p className="text-gray-600 text-sm mt-2">
              Don't have an account?{" "}
              <a href="/register" className="text-[#caeb90] text-shadow-2xs">
                Register
              </a>
            </p>

            <div className="text-center py-2">OR</div>
          </fieldset>
        </form>

        <button
          className="btn bg-gray-200 text-black border-[#e5e5e5]"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={20} />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
