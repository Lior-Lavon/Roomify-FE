import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { TopBar } from "../../components";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full h-screen fixed top-0">
        <TopBar showAvatar={false} showLogin={false} />

        <div className="w-full h-full bg-white p-6 flex flex-col mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              required
            />
            {!isLogin && (
              <input
                type="email"
                placeholder="Confirm"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                required
              />
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <div className="text-center mt-4">
            <button
              onClick={handleFacebookLogin}
              className="flex items-center justify-center w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
            >
              <FaFacebook className="mr-2" /> Continue with Facebook
            </button>
          </div>
          <p className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-500 ml-1 hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
