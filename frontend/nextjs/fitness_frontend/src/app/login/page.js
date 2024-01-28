"use client"
import React from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";


export default function Home() {
const [isLogged, setIsLogged] = useState(false);
const [uid, setUid] = useState("");
const saveToLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('UserID', uid);
  }
};

// Function to load from local storage
const loadFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem('UserID');
    if (storedValue) {
      setUid(storedValue);
    }
  }
};
const router = useRouter();
async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);

  // Convert form data to an object
  const formObject = Object.fromEntries(formData.entries());
  console.log(JSON.stringify(formObject));

  // Post the form data to your API route using Axios
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/user/login", formObject, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
            console.log(response);
          }).catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });

    console.log(formObject);

    if (!response.data) {
      throw new Error("Network response was not ok");
    }

   
    // Handle the response data
    console.log(response.data, "helloooo");
    localStorage.setItem('UserID', response.data.data.pid);
    console.log(localStorage.getItem('UserID'))
    router.replace("/");
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error.message);

    if (!isLogged) {
      router.push('login');
    }
  }
}

  return (
    <section className="bg-gray-50 dark:bg-gray-500">
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            FitraX
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
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
