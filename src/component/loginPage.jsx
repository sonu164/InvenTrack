import { useState, useRef } from "react";
import { AddCard } from "../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const Navigate = useNavigate();
  const handleAuth = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Switch to Signup
      const Login = {
        email: email.current.value,
        password: password.current.value,
      };
      console.log("Login successfull:", Login);
      Navigate("/assignment", { replace: true });
    } else {
      // Switch to Login
      const Signup = {
        fullName: fullName.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      console.log("Signup successfull:", Signup);
      console.log("data are store in AddCard", dispatch(AddCard(Signup)));
      // console.log("data are store in AddCard",dispatch(AddCard(Signup)));
    }
  };
  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="space-y-4" onSubmit={handleAuth}>
          {!isLogin && (
            <input
              type="text"
              ref={fullName}
              placeholder="Full Name"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            type="email"
            ref={email}
            placeholder="Email"
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <button
            onClick={handleSwitch}
            className="text-blue-600 ml-1 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};
export default LoginSignup;
