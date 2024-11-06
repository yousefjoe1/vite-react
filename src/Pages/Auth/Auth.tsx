import { useState, useEffect, useContext, ChangeEvent, FormEvent } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../_context/conexts";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../../d";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";

const Auth = () => {
  const context = useContext(MyContext)!; // The `!` asserts that context is not undefined
  const { contextValue, setContextValue } = context;
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get("mode");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let navigate = useNavigate();
  let toast = useToast();
  let msg = (
    msg = "",
    status: "error" | "success" | "info" | "warning" | "loading" = "success",
    timev = 3000
  ) => {
    toast({ title: msg, status: status, duration: timev });
  };
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setIsLogin(mode !== "register");
    setIsForgotPassword(mode === "forgot-password");
  }, [mode]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isLogin) {
      let url = "https://e-commerce-depi-node.vercel.app/api/users/login";
      let userdata = {
        email: data.email,
        password: data.password,
      };

      setIsSubmit(true);

      let resp = await axios.post(url, userdata);
      if (resp.data.code == 400) {
        msg(resp.data.msg, "error");
      } else {
        localStorage.setItem("userToken", resp.data.token);
        navigate("/");
        msg(resp.data.msg);
      }
      setContextValue(!contextValue);
      setIsSubmit(false);

      return;
    } else {
      let url = "https://e-commerce-depi-node.vercel.app/api/users/register";
      let userdata = {
        username: data.name,
        email: data.email,
        password: data.password,
      };

      setIsSubmit(true);
      let resp = await axios.post(url, userdata);
      if (resp.data.code == 400) {
        msg(resp.data.msg, "error");
      } else {
        localStorage.setItem("userToken", resp.data.token);
        navigate("/");
        msg(resp.data.msg);
      }
      setIsSubmit(false);
    }
  };

  const toggleAuthMode = (mode: string) => {
    setIsLogin(mode === "login");
    setIsForgotPassword(mode === "forgot-password");
    window.history.pushState({}, "", `/auth?mode=${mode}`);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        
        {mode == "login" && <UserLogin />}
        {mode == "register" && <UserRegister />}
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
          {mode == 'login' && (
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

        {/* {isForgotPassword && (
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
        )} */}
      </motion.div>
    </section>
  );
};

export default Auth;
