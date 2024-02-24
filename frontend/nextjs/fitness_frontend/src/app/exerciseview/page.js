"use client";
import image from "next/image";

import { Chart } from "chart.js/auto";
import { Radar } from 'react-chartjs-2';
import ViewChartComponent from "../components/ViewChartComponent";
import axios from "axios";
import { useState, useEffect } from "react";
export default function home() {
  const [durchartData, setdurchartdata] = useState({
    labels: ["exercise 1", "exercise 2", "exercise 3"],
    datasets: [
      {
        label: "duration",
        data: [100, 200, 300],
      },
    ],
  });
  const [distchartData, setdistchartdata] = useState({
    labels: ["exercise 1", "exercise 2", "exercise 3"],
    datasets: [
      {
        label: "distance",
        data: [100, 200, 300],
      },
    ],
  });
  const [calchartData, setcalchartdata] = useState({
    labels: ["exercise 1", "exercise 2", "exercise 3"],
    datasets: [
      {
        label: "calories",
        data: [100, 200, 300],
      },
    ],
  });
  const [uid, setuid] = useState("");
  const fetchData = async () => {
    try {
      // replace 'api_endpoint' with the actual endpoint of your api
      let apistr =
        "http://127.0.0.1:8000/api/exercise/getall/" +
        localStorage.getItem("UserID");
      const response = await axios.get(apistr);
      const data = response.data;

   
      if (Array.isArray(data) && data.length > 0) {
        const newdurationdata = {
          labels: data.map((exercise) => exercise.exerciseName || ""),
          datasets: [
            {
              label: "duration",
              data: data.map((exercise) => exercise.duration || 0),
            },
          ],
        };
        const newdistancedata = {
          labels: data.map((exercise) => exercise.exerciseName || ""),
          datasets: [
            {
              label: "distance",
              data: data.map((exercise) => exercise.distance || 0),
            },
          ],
        };
        const newcaloriesdata = {
          labels: data.map((exercise) => exercise.exerciseName || ""),
          datasets: [
            {
              label: "calories",
              data: data.map((exercise) => exercise.calories || 0),
            },
          ],
        };
        setdurchartdata(newdurationdata);
        setdistchartdata(newdistancedata);
        setcalchartdata(newcaloriesdata);
      } else {
        console.error("invalid data format or empty array:", data);
      }
    } catch (error) {
      console.error("error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  Chart.defaults.borderColor = "#424242";
  Chart.defaults.color = "#ffffff";


  return (
    <>
      <div className="animate-fade-down animate-delay-500 animate-once px-4 my-4 mx-auto max-w-screen-xl text-center">
        <h1 className=" animate-text  bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent text-xl font-black ">
          Get your Fitness information the Right way , the FitraX way
        </h1>
        <div className="w-full p-2  text-white grid grid-cols-3 grid-rows-1 gap-3 place-content-center">
        <div className="w-full bg-background-900 rounded-lg text-white">

          <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold  ">
                Duration *hrs
              </h5>
            <Radar
              options={{
                scales: {
                  r: {
                    ticks: {
                      
                      backdropColor: "rgba(0, 0, 0, 0)"
                  },
                    pointLabels: {
                      display: true, // This hides the labels around the radar chart
                    },
                  },
                },
                backgroundColor: "rgba(214,151,255,0.5)",
                borderColor: "rgba(214,151,255,1)",
                
                scale: { max: 5, min:0 },
              }}
              data={durchartData}
            />
          </div>
        </div>
          <div className="w-full bg-background-900 rounded-lg text-white">
          <div className="p-5">
            
              <h5 className="mb-2 text-2xl font-bold  ">
                Distance *Kms
              </h5>
            

            <Radar
              options={{
                scales: {
                  r: {
                    ticks: {
                      
                      backdropColor: "rgba(0, 0, 0, 0)"
                  },
                    pointLabels: {
                      display: true, // This hides the labels around the radar chart
                    },
                  },
                },
                backgroundColor: "rgba(105,208,214,0.5)",
                borderColor: "rgba(105,208,214,1)",
                scale: { max: 20, min: -1 },
              }}
              data={distchartData}
            />


          </div>  
          </div>
          <div className="w-full bg-background-900 rounded-lg text-white">
          <div className="p-5">
            
              <h5 className="mb-2 text-2xl font-bold  ">
              Calories *Kcal

              </h5>
            


              <Radar
              options={{
                scales: {
                  r: {
                    ticks: {
                      
                      backdropColor: "rgba(0, 0, 0, 0)"
                  },
                    pointLabels: {
                      display: true, // This hides the labels around the radar chart
                    },
                  },
                },
                backgroundColor: "rgba(230,133,92,0.5)",
                borderColor: "rgba(230,133,92,1)",
                scale: { max: 500, min: 100 },
                chartColor: "rgba(0,0,0,1)",
              }}
              data={calchartData}
            />


          </div>  
          </div>
        </div>
      </div>

    </>
  );
}
