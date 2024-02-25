"use client";
import axios from "axios";
import ChartComponent from "./components/ChartComponent";
import { useState, useEffect } from "react";
import LineChartComponent from "./components/LineChartComponent";
import { redirect } from "next/navigation";
import { LatestMeal } from "./components/LatestMeal";
export default function Home() {
  const [displayData, setdisplayData] = useState(
    JSON.parse(localStorage.getItem("displayData"))
  );
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
      {
        label: "",
        data: [],
      },
      {
        label: "",
        data: [],
      },
    ],
  });
  const [workoutChartData, setWorkoutChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
      {
        label: "",
        data: [],
      },
    ],
  });
  const [weightchartData, setWeightChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "weight",
        data: [],
      },
    ],
  });
  const [heightchartData, setHeightChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "height",
        data: [],
      },
    ],
  });
  const [latestWeight, setLatestWeight] = useState(null);
  const [latestHeight, setLatestHeight] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("UserID")) {
      redirect("/login");
    }
  }, []);

  async function fetchData() {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      let apistr =
        "http://127.0.0.1:8000/api/exercise/getall/" +
        localStorage.getItem("UserID");
      const response = await axios.get(apistr);
      const data = response.data;

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

      data;
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

      setLatestWeight(data.weight);
      setLatestHeight(data.height);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
    const timer =  setTimeout(async() => {
      await fetchWorkoutData();
    }, 20);
    const timer2 = setTimeout(async() => {
      await fetchWeightData();
    }, 40);
    const timer3 = setTimeout(async() => {
      await fetchLatestData();
    }, 70);
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
      <div>
        <p className="font-light text-4xl">
          Welcome{" "}
          <span className="font-bold  bg-gradient-to-r from-primary-500  to-accent-400 text-transparent bg-clip-text">
            {displayData?.username}
          </span>
        </p>
        <p className="text-sm text-background-400">
          Get ready to track your fitness journey and unlock your full potential{" "}
        </p>
      </div>
      <div className="w-full grid grid-cols-5 grid-rows-1 items-center gap-4">
        <div className="col-span-2">
          <LineChartComponent
            // imageSrc="/docs/images/blog/image-1.jpg"
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
            // imageSrc="/docs/images/blog/image-1.jpg"
            chartTitle="Height chart"
            chartData={heightchartData}
            linkUrl="/user-statistics"
            addUrl="/parameters"
            svgPath="M1 5h12m0 0L9 1m4 4L9 9"
            buttonText="Add more"
            color={"rgba(105,208,114,1)"}
          />
        </div>

        <div className=" grid grid-rows-2 h-full gap-3">
          <LatestMeal />
          <div className="bg-background-900 rounded-lg h-full flex flex-col items-center justify-evenly">
            <p>{latestWeight} kg</p>
            <p>{latestHeight} cm</p>

          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 grid-rows-1 items-center gap-4">
        <div className="col-span-2 ">
          {" "}
          <ChartComponent
            // imageSrc="/docs/images/blog/image-1.jpg"
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
            // imageSrc="/docs/images/blog/image-1.jpg"
            chartTitle="Workout charts"
            chartData={workoutChartData}
            linkUrl="/workoutview"
            addUrl="/workouts"
            svgPath="M1 5h12m0 0L9 1m4 4L9 9"
            buttonText="Add more"
            min={0}
            max={1}
          />
        </div>
      </div>
    </section>
  );
}
