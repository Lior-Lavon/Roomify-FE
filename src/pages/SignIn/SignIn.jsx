import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { TopBar } from "../../components";
import {
  setReturnToAfterLogin,
  setUserLogin,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google_logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { returnToAfterLogin } = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin && email !== confirmEmail) {
      setError("Emails do not match.");
      return;
    }
    if (isLogin) {
      console.log("Logging in with:", { email, password });
    } else {
      console.log("Registering with:", { email, password });
    }
  };

  const handleFacebookLogin = () => {
    console.log("Logging in with Facebook...");
  };
  const handleUserLogin = () => {
    dispatch(setUserLogin());
    // check where to go back
    if (returnToAfterLogin != null) {
      if (returnToAfterLogin?.page == "chat") {
        let update = { ...returnToAfterLogin, afterLogin: true };
        dispatch(setReturnToAfterLogin(update));
        navigate(`/chat`);
      }
    } else {
      navigate("/landing");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center sans-regular">
      <div className="w-full h-screen fixed top-0">
        <TopBar showAvatar={false} showLogin={false} />

        <div className="w-full h-full bg-gray-300 p-6 flex flex-col items-center ">
          <div className="w-[90%] max-w-[640px] bg-red-400 mt-6">
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
              <p className="text-red-500 text-center text-sm">{error}</p>
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
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-orange-600 mt-4 text-white tracking-wide text-sm py-4 rounded-full transition"
                onClick={handleUserLogin}
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
    </div>
  );
};

export default SignIn;
