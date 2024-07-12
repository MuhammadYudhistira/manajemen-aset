import React from "react";
import background from "@/public/background.png";
import LoginForm from "@/components/(form)/auth/LoginForm";

const page = (params) => {

  return (
    <section
      className="flex h-screen items-center justify-center bg-white p-2 lg:p-0"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-full flex-col rounded-xl bg-white p-10 shadow-2xl md:w-8/12 lg:w-4/12">
        <a
          className="flex items-center justify-center text-2xl font-bold"
          href="#"
        >
          <img
            alt="asd"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Coat_of_arms_of_West_Sumatra.svg/800px-Coat_of_arms_of_West_Sumatra.svg.png"
            className="w-10"
          />
          DPRD SUMBAR
        </a>
        <h1 className="mt-6 text-center text-xl font-bold text-gray-900 md:text-2xl">
          Login
        </h1>
        <p className="mt-4 text-center leading-relaxed text-gray-500">
          Masukkan informasi detail untuk masuk ke dalam sistem
        </p>
        <LoginForm callbackUrl={params.searchParams.callbackUrl} />
      </div>
    </section>
  );
};

export default page;
