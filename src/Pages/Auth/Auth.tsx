import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import ContainerUp from "../../_components/ContainerUp";

const Auth = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get("mode");

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(mode !== "register");;
  }, [mode]);

  const toggleAuthMode = (mode: string) => {
    setIsLogin(!isLogin);
    // window.history.pushState({}, "", `/auth?mode=${mode}`);

  };

  return (
    <ContainerUp className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        
        {isLogin && <UserLogin />}
        {!isLogin && <UserRegister />}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <motion.button
              onClick={() => toggleAuthMode(mode == 'login' ? "register" : "login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-medium text-gray-600 hover:text-gray-500 transition duration-300 ease-in-out"
            >
              {isLogin ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </motion.button>
          </div>
          {/* {mode == 'login' && (
            <div className="text-sm">
              <motion.button
                onClick={() => toggleAuthMode("forgot-password")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-medium text-gray-600 hover:text-gray-500 transition duration-300 ease-in-out"
              >
                Forgot your password?
              </motion.button>
            </div>
          )} */}
        </div>
      </motion.div>
    </ContainerUp>
  );
};

export default Auth;
