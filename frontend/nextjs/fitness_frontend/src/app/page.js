"use client"
import Image from 'next/image'
import axios from 'axios';

import { Chart } from 'chart.js/auto'
import { Bar,Doughnut,Line,Radar } from 'react-chartjs-2'
import { useState,useEffect } from 'react'
export default function Home() {
  const [chartData, setChartData] = useState({
    labels: ["Exercise 1", "Exercise 2", "Exercise 3"],
    datasets: [
      {
        label: "duration",
        data: [100, 200, 300],
      },
      {
        label: "distance",
        data: [200, 300, 100],
      },
      {
        label: "calories",
        data: [300, 400, 200],
      },
    ],
  });
  const [uid, setUid] = useState("");
  const fetchData = async () => {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      let apistr='http://127.0.0.1:8000/api/exercise/getall/'+localStorage.getItem('UserID');
      const response = await axios.get(apistr);
      const data = response.data;

      console.log(localStorage.getItem('UserID'));
      let norData=normalizeData(data);
      if (Array.isArray(data) && data.length > 0) {
        const newData = {
          labels: data.map(exercise => exercise.exerciseName || ''),
          datasets: [
            {
              label: "duration",
              data: norData.map(exercise => exercise.duration || 0),
            },
            {
              label: "distance",
              data: norData.map(exercise => exercise.distance || 0),
            },
            {
              label: "calories",
              data: norData.map(exercise => exercise.calories || 0),
            },
          ],
        };

        setChartData(newData);
      } else {
        console.error('Invalid data format or empty array:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('UserID');
      if (storedValue) {
        setUid(storedValue);
      }
    }
  };
  useEffect(() => {

    fetchData();
    
  }, []);

  function normalizeData(data) {
    const normalizedData = [];
    const minMaxValues = {};
  
    // Check if data is not empty and has elements
    if (Array.isArray(data) && data.length > 0) {
      // Find min and max values for each property
      Object.keys(data[0]).forEach(key => {
        const values = data.map(item => item[key]);
        minMaxValues[key] = { min: Math.min(...values), max: Math.max(...values) };
      });
  
      // Normalize data
      data.forEach(item => {
        const normalizedItem = {};
        Object.keys(item).forEach(key => {
          const value = item[key];
          const { min, max } = minMaxValues[key];
          normalizedItem[key] = (value - min) / (max - min);
        });
        normalizedData.push(normalizedItem);
      });
    } else {
      console.error('Data is empty or not an array:', data);
    }
  
    return normalizedData;
  }
  return (
    <div className="flex flex-wrap justify-center items-center my-5  h-screen">
    <div className="max-w-xl w-96 m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-400">
  <a href="/exerciseview">
    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
  </a>
  <div className="p-5">
    <a href="/exerciseview" className='hover:text-blue-500'>
      <h5 className="hover:bg-gray-200 underline mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">
        Exercise charts
      </h5>
    </a>
    
    <Radar
    options= {{}}
  data={chartData}
/>





    <a
      href="/exercises"
      className="inline-flex items-center px-3 py-2 my-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Add more
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  </div>
</div>
<div className="max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
  </a>
  <div className="p-5">
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in
      reverse chronological order.
    </p>
    <a
      href="#"
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Read more
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  </div>
</div>
<div className="max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
  </a>
  <div className="p-5">
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Here are the biggest enterprise technology acquisitions of 2021 so far, in
      reverse chronological order.
    </p>
    <a
      href="#"
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Read more
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  </div>
</div>
</div>
  )
}
