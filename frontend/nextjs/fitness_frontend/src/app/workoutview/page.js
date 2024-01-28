"use client";
import Image from "next/image";
import axios from "axios";
import { Chart } from "chart.js/auto";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import { useState, useEffect } from "react";
export default function Home() {
  const [repschartData, setRepsChartData] = useState({
    labels: ["Workout 1", "Workout 2", "Workout 3"],
    datasets: [
      {
        label: "reps",
        data: [100, 200, 300],
      },
    ],
  });
  const [weightchartData, setWeightChartData] = useState({
    labels:  ["Workout 1", "Workout 2", "Workout 3"],
    datasets: [
      {
        label: "weight",
        data: [100, 200, 300],
      },
    ],
  });

  const [uid, setUid] = useState("");
  const fetchData = async () => {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      let apistr =
        "http://127.0.0.1:8000/api/workout/getall/" +
        localStorage.getItem("UserID");
      const response = await axios.get(apistr);
      const data = response.data;

      console.log(localStorage.getItem("UserID"));
      if (Array.isArray(data) && data.length > 0) {
        const newRepsData = {
          labels: data.map((exercise) => exercise.workoutName || ""),
          datasets: [
            {
              label: "reps",
              data: data.map((exercise) => exercise.reps || 0),
            },
          ],
        };
        const newWeightData = {
          labels: data.map((exercise) => exercise.workoutName || ""),
          datasets: [
            {
              label: "weight",
              data: data.map((exercise) => exercise.weight || 0),
            },
          ],
        };

        setRepsChartData(newRepsData);
        setWeightChartData(newWeightData);

      } else {
        console.error("Invalid data format or empty array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const loadFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("UserID");
      if (storedValue) {
        setUid(storedValue);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="animate-fade-down animate-delay-500 animate-once px-4 my-4 mx-auto max-w-screen-xl text-center">
        <h1 className=" animate-text  bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent text-5xl font-black ">
          Get your Fitness information the Right way , the FitraX way
        </h1>
      </div>
      <div className="flex flex-wrap justify-center items-center m-3">
        <div className="max-w-full w-128 mx-5 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-400">
          <a href="/exerciseView">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#" className="">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">
                Reps
              </h5>
            </a>

            <Radar
              options={{
                backgroundColor: "rgba(214,151,255,0.5)",
                borderColor: "rgba(214,151,255,1)",
                scale: { max: 50, min: 0 },
              }}
              data={repschartData}
            />


          </div>
        </div>
        <div className="max-w-xl w-128 mx-5 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-400">
          <a href="/exerciseView">
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#" className="">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">
                Weight Kg*
              </h5>
            </a>

            <Radar
              options={{
                backgroundColor: "rgba(105,208,214,0.5)",
                borderColor: "rgba(105,208,214,1)",
                scale: { max: 200, min: 0 },
              }}
              data={weightchartData}
            />


          </div>
        </div>
        
      </div>
    </>
  );
}

