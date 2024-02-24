"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [uid, setUid] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/login", formObject, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
   
      localStorage.setItem('UserID', response.data.data.pid);
      localStorage.setItem('displayData', JSON.stringify(response.data.data));

      router.replace("/");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error.message);
      router.push('login');
    }
  };

  return (
    <section className="">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            FitraX
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-background-950 dark:border-background-900">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login with Email
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-background-900 dark:placeholder-background-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none"
                    placeholder="name@domain.com"
                    required
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-background-900 dark:placeholder-background-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account?{" "}
                  <a
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
