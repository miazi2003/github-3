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
  const { googleLogin, signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        console.log(res.user);
        navigate(location.state?.form || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location.state?.form || "/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="hero w-full lg:mt-10">
      <div className="card-body flex flex-col gap-2 w-1/2">
        <h1 className="text-4xl font-bold">Welcome Home</h1>
        <p>Login With ProFast</p>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset w-full">
            <label className="label text-black font-bold">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input w-full"
              placeholder="Email"
            />
            <label className="label  text-black font-bold">Password</label>
            <input
              type="password"
              className="input w-full"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-900">password needed</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-900">6 needed</p>
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
              Don't have Any Account?{" "}
              <a href="/register" className="text-[#caeb90] text-shadow-2xs">
                Register
              </a>
            </p>
            <div className="text-center py-2">OR</div>
          </fieldset>
        </form>
        <button
          className="btn bg-gray-200 text-black border-[#e5e5e5]"
          onClick={() => {
            handleGoogleLogin();
          }}
        >
          <FcGoogle size={20} />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
