"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios if you haven't already
import { LogoutIcon } from '@heroicons/react/outline'

const Profile = () => {
  const [myData, setMyData] = useState({
    name: "",
    email: "",
    latest_height:  0,
    latest_weight:   0,
    total_achievements:   0
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile/get/'+localStorage.getItem("UserID"));
        console.log(response);
        if(response)
        setMyData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetching data initially
    fetchData();


  }, []);

  const handleLogout=()=>{
    localStorage.clear()
    window.location.href = '/login';

    
  }

  return (
    <div className="min-h-screen bg-background-950 text-text-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-background-900 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-background-900 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-12 w-12 rounded-full" src="https://flowbite.com/docs/images/logo.svg" alt="" />
              </div>
              <div className="ml-4">
                <h1 className="text-lg leading-6 font-semibold">{myData?.data?.name}</h1>
                <p className="text-sm text-background-400">{myData?.data?.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background-700">
            <dl>
              <div className="bg-background-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-background-100">Latest Height</dt>
                <dd className="text-sm text-background-50">{myData?.data?.latest_height} cm</dd>
              </div>
              <div className="bg-background-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-background-100">Latest Weight</dt>
                <dd className="text-sm text-background-50">{myData?.data?.latest_weight} kg</dd>
              </div>
              <div className="bg-background-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-background-100">Total Achievements</dt>
                <dd className="text-sm text-background-50">{myData?.data?.total_achievements}</dd>
              </div>
            </dl>
          </div>
          <div className="bg-background-800 p-6">
            <div className="flex items-center justify-end">
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded flex items-center" onClick={handleLogout}>
                Logout
                <LogoutIcon className="h-5 w-5 ml-2" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
