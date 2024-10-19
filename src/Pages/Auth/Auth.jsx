import { useState, useEffect, useContext } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../_context/conexts";

const Auth = () => {
  const { contextValue, setContextValue } = useContext(MyContext);
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get("mode");

  let toast = useToast()
  let navigate = useNavigate()
  let msg = (msg,status='success',timev= 3000)=> {
    toast({title: msg,status: status,duration: timev})
  }
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsLogin(mode !== "register");
    setIsForgotPassword(mode === "forgot-password");
  }, [mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !isForgotPassword && !formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!isForgotPassword && !formData.password) {
      newErrors.password = "Password is required";
    } else if (!isForgotPassword && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (isLogin) {
      let url = "https://e-commerce-depi-node.vercel.app/api/users/login";
      let userdata = {
        email: formData.email,
        password: formData.password
      }
      
      setIsSubmit(true)

      let resp = await axios.post(url,userdata)
      if(resp.data.code == 400){
        msg(resp.data.msg,'error')
      }else{
        localStorage.setItem("userToken", resp.data.token)
        navigate('/')
        msg(resp.data.msg)
      }
      setContextValue(!contextValue)
      setIsSubmit(false)

      return

    }else {
      let url = "https://e-commerce-depi-node.vercel.app/api/users/register";
      let userdata = {
        username: formData.name,
        email: formData.email,
        password: formData.password
      }
      
        setIsSubmit(true)
        let resp = await axios.post(url,userdata)
        if(resp.data.code == 400){
          msg(resp.data.msg,'error')
        }else{
          localStorage.setItem("userToken", resp.data.token)
          navigate('/')
          msg(resp.data.msg)
        }
        setIsSubmit(false)
    }
  };

  const toggleAuthMode = (mode) => {
    setIsLogin(mode === "login");
    setIsForgotPassword(mode === "forgot-password");
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
    setMessage("");
    window.history.pushState({}, "", `/auth?mode=${mode}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isForgotPassword
              ? "Reset your password"
              : isLogin
              ? "Welcome back"
              : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isForgotPassword
              ? "Enter your email to receive reset instructions"
              : isLogin
              ? "Sign in to access your account"
              : "Join us and start shopping"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && !isForgotPassword && (
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          {!isForgotPassword && (
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          )}

          <div>
            <motion.button
              type="submit"
              disabled={isSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
            >
              {isSubmit ? (
                <Spinner size="sm" color="white" />
              ) : (
                <span>
                  {isForgotPassword
                    ? "Reset Password"
                    : isLogin
                    ? "Sign in"
                    : "Sign up"}
                </span>
              )}
            </motion.button>
          </div>
        </form>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <motion.button
              onClick={() => toggleAuthMode(isLogin ? "register" : "login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-medium text-gray-600 hover:text-gray-500 transition duration-300 ease-in-out"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </motion.button>
          </div>
          {isLogin && (
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
          )}
        </div>

        {isForgotPassword && (
          <div className="text-sm text-center">
            <motion.button
              onClick={() => toggleAuthMode("login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-medium text-gray-600 hover:text-gray-500 transition duration-300 ease-in-out"
            >
              Back to login
            </motion.button>
          </div>
        )}

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-gray-700 text-sm text-center bg-gray-100 p-2 rounded-md"
          >
            {message}
          </motion.div>
        )}

        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-red-500 text-sm text-center bg-red-100 p-2 rounded-md"
          >
            {errors.submit}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Auth;
