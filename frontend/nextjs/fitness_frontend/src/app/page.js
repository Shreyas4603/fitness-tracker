"use client";
import Image from "next/image";
import axios from "axios";
import ChartComponent from "./components/ChartComponent";
import { Chart } from "chart.js/auto";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import { useState, useEffect } from "react";
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
  const [uid, setUid] = useState("");
  const fetchData = async () => {
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
  };
  const fetchWorkoutData = async () => {
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
  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
       fetchWorkoutData();
    }, 20);
   
    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
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
  <div className="flex flex-wrap justify-center items-center m-4">
    <ChartComponent
 imageSrc="/docs/images/blog/image-1.jpg"
 chartTitle="Exercise charts"
 chartData={chartData}
 linkUrl="/exerciseview"
 addUrl="/exercises"
 svgPath="M1 5h12m0 0L9 1m4 4L9 9"
 buttonText="Add more"
/>

<ChartComponent
 imageSrc="/docs/images/blog/image-1.jpg"
 chartTitle="Workout charts"
 chartData={workoutChartData}
 linkUrl="/workoutview"
 addUrl="/workouts"
 svgPath="M1 5h12m0 0L9 1m4 4L9 9"
 buttonText="Add more"
/>
  </div>);
}
