"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

function Navbar() {
  const [isRevealed, setIsRevealed] = useState(false);
const loc=window.location.pathname.slice(1,)
console.log(loc)
  const handleButtonClick = () => {
    setIsRevealed(!isRevealed); // Toggle the state
    console.log("first", isRevealed); // Toggleevealed); // Toggle
  };
  return (
    <nav className=" sticky top-0  z-[10000] bg-background-950 border-b border-background-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-bold-Inter whitespace-nowrap text-text-50">
            FitraX
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            href={"../register/"}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://avatarfiles.alphacoders.com/804/80451.png"
              alt="user photo"
            />
          </Link>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent ">
            <li>
              <a
                href="/"
                className={`block py-2 px-3  rounded   md:p-0 
                ${loc==''?" text-blue-600":"dark:text-white "}`}
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="user-statistics"
                className={`block py-2 px-3  rounded   md:p-0 
                  ${loc=='user-statistics'?" text-blue-600":"dark:text-white "}`}
              >
                My Stats
              </a>
            </li>
            <li>
              <a
                href="exercises"
                className={`block py-2 px-3  rounded   md:p-0 
                  ${loc=='exercises'?" text-blue-600":"dark:text-white "}`}
              >
                Exercise
              </a>
            </li>
            <li>
              <a
                href="workouts"
                className={`block py-2 px-3  rounded   md:p-0 
                  ${loc=='workouts'?" text-blue-600":"dark:text-white "}`}
              >
                Workouts
              </a>
            </li>
            <li>
              <a
                href="diet"
                className={`block py-2 px-3  rounded   md:p-0 
                  ${loc=='diet'?" text-blue-600":"dark:text-white "}`}
              >
                Diet
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
