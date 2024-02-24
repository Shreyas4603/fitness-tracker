"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";


export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Convert form data to an object
    const formObject = Object.fromEntries(formData.entries());


    // Post the form data to your API route using Axios
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register",
        formObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );



      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      router.replace("/");
      // Handle the response data
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );

      if (!isLogged) {
        router.push("login");
      }
    }
  }
  return (
    <section className="min-h-screen flex flex-col items-center justify-center ">
      <div >        <a
        href=""
        className="flex  items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        FitraX
      </a></div>
      <div className="max-w-md w-full space-y-8 p-8  rounded-lg shadow-md border border-background-900">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold ">
            Create an Account
          </h2>
        </div>
        <form className="mt-8   " onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm p-4 flex flex-col gap-4">
            <div className="">
              <label htmlFor="email" className="sr-only">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-background-900 dark:placeholder-background-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none"
                placeholder="Your email address"
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-background-900 dark:placeholder-background-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-background-900 dark:placeholder-background-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="gender" className="sr-only w-fit">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                autoComplete="gender"
                required
                className="w-full rounded-md focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-background-900 dark:placeholder-background-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-background-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Log in
          </a>
        </p>
      </div>
    </section>
  );
}