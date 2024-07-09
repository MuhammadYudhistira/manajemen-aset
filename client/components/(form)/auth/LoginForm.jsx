"use client";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useMutation } from "@tanstack/react-query";
import axios from "@/libs/axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [hidden, setHidden] = useState(true);

  const { mutate: login } = useMutation({
    mutationFn: async (body) => {
      const response = await axios.post("/auth/login", {
        nip: body.nip,
        password: body.password,
      });
      return response;
    },
    onSuccess: (response) => {
      console.log(response.data.payload);
      toast.success("Berhasil Login");
      Cookies.set("token", response.data.payload.token);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      nip: "",
      password: "",
    },
    onSubmit: () => {
      console.log(formik.values);
      const { nip, password } = formik.values;
      login(formik.values);
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const handleEyeClick = () => {
    setHidden(!hidden);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mt-8 flex w-full flex-col gap-6"
    >
      <div className="w-full">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            maxLength="18"
            className="grow"
            placeholder="NIP"
            name="nip"
            onChange={handleFormInput}
          />
        </label>
      </div>
      <div className="w-full">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type={hidden ? `password` : "text"}
            className="grow"
            placeholder="Password"
            name="password"
            onChange={handleFormInput}
          />
          <RemoveRedEyeOutlinedIcon
            className="cursor-pointer"
            onClick={handleEyeClick}
          />
        </label>
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button
          type="submit"
          className="inline-block w-full shrink-0 rounded-lg border border-black bg-black px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none"
        >
          Login
        </button>
      </div>
      <Link href={"/forget-password"} className="text-sm font-semibold">
        Forget Password?
      </Link>
    </form>
  );
};

export default LoginForm;
