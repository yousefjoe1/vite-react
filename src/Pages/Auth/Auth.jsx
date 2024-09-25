import React, { useState } from "react";

import { Spinner, useToast } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

const Auth = () => {
  const form = useForm();

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const msg = useToast();

  const [isSubmit, setIsSubmit] = useState(false);

  const loginFunc = async (data) => {
    const { email, password} = data;
    setIsSubmit(true);
  };

  return (
    <div className="register-wrapperp-5 flex justify-center items-center h-screen">
      <form
        noValidate
        className="bg-slate-800 lg:w-1/2 w-10/12 mx-auto p-5 gap-y-2 rounded-3xl"
        onSubmit={handleSubmit(loginFunc)}
      >

        <div>
          <label className="text-white" htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            type="email"
            className="p-4 bg-slate-900 text-white outline-none border-none block rounded-3xl w-full "
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>


        <div>
          <label className="text-white" htmlFor="password">Password</label>
          <input
            {...register("password", { required: "password required" })}
            type="password"
            className="p-4 bg-slate-900 text-white outline-none border-none block rounded-3xl w-full "
          />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>

        <div className="submit-btn">
          {isSubmit ? (
            <Spinner size={"2xl"} color="white" height={50} width={1} />
          ) : (
            <button
              className=" bg-slate-500 text-white outline-none border-none w-full py-2 rounded-3xl"
              type="submit"
            >
              Login
            </button>
          )}

        </div>
      </form>
    </div>
  );
};

export default Auth;
