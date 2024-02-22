"use client";
import Image from "next/image";
import axios from "axios";
import ChartComponent from "./components/ChartComponent";
import { Chart } from "chart.js/auto";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import LineChartComponent from "./components/LineChartComponent";
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
  const [workoutChartData, setWorkoutChartData] = useState({
    labels: ["Workout 1", "Workout 2", "Workout 3"],
    datasets: [
      {
        label: "reps",
        data: [100, 200, 300],
      },
      {
        label: "weight",
        data: [200, 300, 100],
      },
    ],
  });
  const [weightchartData, setWeightChartData] = useState({
    labels: ["2024-08-08", "2024-08-09", "2024-08-10"],
    datasets: [
      {
        label: "weight",
        data: [100, 101, 100],
      },
    ],
  });
  const [heightchartData, setHeightChartData] = useState({
    labels: ["2024-08-08", "2024-08-09", "2024-08-10"],
    datasets: [
      {
        label: "height",
        data: [100, 101, 100],
      },
    ],
  });
  const [latestWeight, setLatestWeight] = useState(null);
  const [latestHeight, setLatestHeight] = useState(null);
  async function fetchData() {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      let apistr =
        "http://127.0.0.1:8000/api/exercise/getall/" +
        localStorage.getItem("UserID");
      const response = await axios.get(apistr);
      const data = response.data;

      console.log(localStorage.getItem("UserID"));
      let norData = normalizeData(data);
      if (Array.isArray(data) && data.length > 0) {
        const newData = {
          labels: data.map((exercise) => exercise.exerciseName || ""),
          datasets: [
            {
              label: "duration",
              data: norData.map((exercise) => exercise.duration || 0),
            },
            {
              label: "distance",
              data: norData.map((exercise) => exercise.distance || 0),
            },
            {
              label: "calories",
              data: norData.map((exercise) => exercise.calories || 0),
            },
          ],
        };

        setChartData(newData);
      } else {
        console.error("Invalid data format or empty array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchWorkoutData() {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      let apistr =
        "http://127.0.0.1:8000/api/workout/getall/" +
        localStorage.getItem("UserID");
      const response = await axios.get(apistr);
      const data = response.data;

      console.log(data);
      let norData = normalizeData(data);
      if (Array.isArray(data) && data.length > 0) {
        const newData = {
          labels: data.map((workout) => workout.workoutName || ""),
          datasets: [
            {
              label: "reps",
              data: norData.map((workout) => workout.reps || 0),
            },
            {
              label: "weight",
              data: norData.map((workout) => workout.weight || 0),
            },
          ],
        };

        setWorkoutChartData(newData);
      } else {
        console.error("Invalid data format or empty array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchWeightData() {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      let apistr =
        "http://127.0.0.1:8000/api/parameter/getall/" +
        localStorage.getItem("UserID");
      const response = await axios.get(apistr);
      const data = response.data;

      console.log(data);
      const sortedData = data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      if (Array.isArray(data) && data.length > 0) {
        const newData = {
          labels: sortedData.map((params) => params.date || ""),
          datasets: [
            {
              label: "weight",
              data: sortedData.map((params) => params.weight || 0),
            },
          ],
        };
        const newData2 = {
          labels: sortedData.map((params) => params.date || ""),
          datasets: [
            {
              label: "height",
              data: sortedData.map((params) => params.height || 0),
            },
          ],
        };

        setWeightChartData(newData);
        setHeightChartData(newData2);
      } else {
        console.error("Invalid data format or empty array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchLatestData() {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      let apistr =
        "http://127.0.0.1:8000/api/parameter/getlatest/" +
        localStorage.getItem("UserID");
      const response = await axios.get(apistr);
      const data = response.data;

      console.log(data, "latest data");
      setLatestWeight(data.weight);
      setLatestHeight(data.height);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      fetchWorkoutData();
    }, 20);
    const timer2 = setTimeout(() => {
      fetchWeightData();
    }, 40);
    const timer3 = setTimeout(() => {
      fetchLatestData();
    }, 60);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  function normalizeData(data) {
    const normalizedData = [];
    const minMaxValues = {};

    // Check if data is not empty and has elements
    if (Array.isArray(data) && data.length > 0) {
      // Find min and max values for each property
      Object.keys(data[0]).forEach((key) => {
        const values = data.map((item) => item[key]);
        minMaxValues[key] = {
          min: Math.min(...values),
          max: Math.max(...values),
        };
      });

      // Normalize data
      data.forEach((item) => {
        const normalizedItem = {};
        Object.keys(item).forEach((key) => {
          const value = item[key];
          const { min, max } = minMaxValues[key];
          normalizedItem[key] = (value - min) / (max - min);
        });
        normalizedData.push(normalizedItem);
      });
    } else {
      console.error("Data is empty or not an array:", data);
    }

    return normalizedData;
  }
  return (
    <section className=" w-3/4 xl:w-3/4 grid grid-rows-1 grid-cols-1  mx-auto p-4 gap-4">
      <div className="w-full grid grid-cols-5 grid-rows-1 items-center gap-4">
        <div className="col-span-2">
          <LineChartComponent
            imageSrc="/docs/images/blog/image-1.jpg"
            chartTitle="Weight chart"
            chartData={weightchartData}
            linkUrl="/user-statistics"
            addUrl="/parameters"
            svgPath="M1 5h12m0 0L9 1m4 4L9 9"
            buttonText="Add more"
            color={"rgba(105,108,214,1)"}
          />
        </div>
        <div className="col-span-2">
          <LineChartComponent
            imageSrc="/docs/images/blog/image-1.jpg"
            chartTitle="Height chart"
            chartData={heightchartData}
            linkUrl="/user-statistics"
            addUrl="/parameters"
            svgPath="M1 5h12m0 0L9 1m4 4L9 9"
            buttonText="Add more"
            color={"rgba(105,208,114,1)"}
          />
        </div>

        <div className="col-span-1 ">
          
          <div className="flex flex-col gap-2 xl:gap-5 justify-center items-center   bg-background-900 p-2 xl:py-10 border border-background-900 rounded-md w-full md:h-full">
            <p className="text-white w-full text-center xl:block hidden">Current paramters</p>
            {/* Weight Circle */}
            <div className="bg-accent-900      shadow text-white  border border-background-900 p-5  rounded-full flex items-center justify-center relative">
              <span className=" font-bold">{latestWeight} kg</span>
            </div>
            {/* Height Circle */}
            <div className="bg-accent-900      shadow text-white  border border-background-900 p-5 rounded-full flex items-center justify-center relative">
              <span className=" font-bold">{latestHeight} cm</span>
            </div>

            <a
              href="/user-statistics"
              className="bg-primary-500 text-white px-4 py-2 rounded"
              // Set task to  0 for Add
            >
              Edit Stats
            </a>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 grid-rows-1 items-center gap-4">
        <div className="col-span-2 ">
          {" "}
          <ChartComponent
            imageSrc="/docs/images/blog/image-1.jpg"
            chartTitle="Exercise charts"
            chartData={chartData}
            linkUrl="/exerciseview"
            addUrl="/exercises"
            svgPath="M1 5h12m0 0L9 1m4 4L9 9"
            buttonText="Add more"
          />
        </div>
        <div className="col-span-2">
          <ChartComponent
            imageSrc="/docs/images/blog/image-1.jpg"
            chartTitle="Workout charts"
            chartData={workoutChartData}
            linkUrl="/workoutview"
            addUrl="/workouts"
            svgPath="M1 5h12m0 0L9 1m4 4L9 9"
            buttonText="Add more"
          />
        </div>
      </div>
    </section>
  );
}
