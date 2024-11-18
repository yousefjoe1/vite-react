import {  Outlet } from "react-router-dom";
import useFetch from "../../_hooks/useFetch";
import { Spinner } from "@chakra-ui/react";
import MySpinner from "../../_components/MySpinner";
import { motion } from "framer-motion";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import useMsg from "../../_hooks/useMsg";
import { Inputs } from "../../d";
import { baseUrl } from "../../_functions/getData";

const AdminLayout = () => {
  const { data, isLoading, isError } = useFetch(
    `admin/verify`,
    "verify-admin",
    true,
    "adminToken"
  );
  const [isSubmit, setIsSubmit] = useState(false);
  let { msg } = useMsg();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  if (isLoading) {
    return <MySpinner />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let url = `${baseUrl}/api/admin/login`;
    let userdata = {
      email: data.email,
      password: data.password,
    };

    setIsSubmit(true);

    let resp = await axios.post(url, userdata);    

    if (resp.data.code == 400) {
      msg(resp.data.msg, "error");
    } else {
      localStorage.setItem("adminToken", resp.data.token);
      msg(resp.data.msg);
    }
    setIsSubmit(false);
  };
  if (isError || data.status == 404 || data.code == 400) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
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
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
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
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
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
      </div>
    );
  }

  return (
    <>
      <nav>Admin nav</nav>
      <Outlet />
    </>
  );
};

export default AdminLayout;
