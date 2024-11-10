import { useState, useContext } from "react";
import { Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../_context/conexts";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../../../d";
import useMsg from "../../../_hooks/useMsg";
import { baseUrl } from "../../../_functions/getData";

const UserLogin = () => {
  const context = useContext(MyContext)!; // The `!` asserts that context is not undefined
  const { contextValue, setContextValue } = context;
  const [isSubmit, setIsSubmit] = useState(false);
  let {msg} = useMsg()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let url = `${baseUrl}/api/users/login`;
    let userdata = {
      email: data.email,
      password: data.password,
    };

    setIsSubmit(true);

    let resp = await axios.post(url, userdata);

    console.log(resp,'login data');
    
    if (resp.data.code == 400) {
      msg(resp.data.msg, "error");
    } else {
      if(resp.data.data.role == 'vendor'){
        localStorage.setItem("vendorToken", resp.data.token);
        navigate("/vendor");
      }else {
        localStorage.setItem("userToken", resp.data.token);
        navigate("/");
      }
      msg(resp.data.msg);
    }
    setContextValue(!contextValue);
    setIsSubmit(false);
  };

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Welcome back
      </h2>
      <p className="text-center text-sm text-gray-600">
        Sign in to access your account
      </p>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            {...register("email", { required: true })}
            type="email"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            {...register("password", { required: true })}
            type="password"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">This field is required</p>
          )}
        </div>

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
              <span>Sign in</span>
            )}
          </motion.button>
        </div>
      </form>
    </>
  );
};

export default UserLogin;
