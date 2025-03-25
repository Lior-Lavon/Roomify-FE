import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { TopBar } from "../../components";
import { setUserLogin } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google_logo.png";

const SignIn = ({ isVisible, closeSignIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("1234");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { profile } = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin && password !== confirmPassword) {
      setError("Password do not match.");
      return;
    }

    if (isLogin) {
      console.log("Logging in with:", { email, password });
    } else {
      console.log("Registering with:", { email, password });
    }
    handleUserLogin();
  };

  const handleFacebookLogin = () => {
    console.log("Logging in with Facebook...");
  };
  const handleUserLogin = () => {
    dispatch(setUserLogin());

    if (closeSignIn != undefined) {
      setTimeout(() => {
        closeSignIn(true);
      }, 500);
    } else {
      navigate("/landing");
    }
  };

  const closeSignInMe = () => {
    closeSignIn(false);
  };

  return (
    <div
      className={`w-full h-full z-100 fixed top-0 right-0 transition-transform duration-500 flex flex-col ${
        isVisible != undefined
          ? isVisible
            ? "translate-x-0"
            : "translate-x-full"
          : ""
      }`}
    >
      <TopBar leftIcon={"close"} closeSignIn={closeSignInMe} />

      <div className="w-full h-full bg-white p-6 flex flex-col items-center ">
        <div
          className={`w-[90%] max-w-[640px] bg-white ${isLogin ? "mt-6" : ""}`}
        >
          <div className="w-full inline-block text-center">
            <h1 className="text-transparent bg-gradient-to-r from-[#261a18] to-[#ff5733] bg-clip-text font-bold text-2xl ">
              Welcome to Roomify
            </h1>
            <p className="text-[#7b7b7b] text-[13px] mt-2">
              <span>Log in</span> <span className="text-orange-500">or</span>{" "}
              <span>create new account</span>.
            </p>
          </div>
          {error && (
            <p className="text-red-500 my-2 text-center text-sm">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm pl-2">Your email</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm pl-2">Your password</p>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                required
              />
            </div>
            {!isLogin && (
              <div className="flex flex-col gap-2 ">
                <p className="text-gray-500 text-sm pl-2">Confirm password</p>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 mt-4 text-white tracking-wide text-sm py-4 rounded-full transition"
              // onClick={handleUserLogin}
            >
              {isLogin ? "Log in" : "Register"}
            </button>
          </form>

          <div className="w-full relative flex justify-center items-center mt-8">
            <div className="w-full h-[0.05rem] bg-gray-300"></div>
            <p className="absolute top-1/2 -translate-y-1/2 bg-white px-6 text-sm text-gray-400">
              Or
            </p>
          </div>

          <div className="relative w-full mt-8 rounded-full p-[2px] bg-gradient-to-r from-[#261a18] to-[#ff5733]">
            <button
              type="submit"
              className="w-full bg-white text-black tracking-wide text-sm py-3 rounded-full transition"
              onClick={handleUserLogin}
            >
              {/* <span className="">
                <img src={googleLogo} alt="" className="w-6 h-6" />
              </span> */}
              Log in with Google
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-500 ml-1"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
