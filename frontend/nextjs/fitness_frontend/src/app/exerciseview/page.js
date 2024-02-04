"use client";
import image from "next/image";
import ViewChartComponent from "../components/ViewChartComponent";
import axios from "axios";
import { usestate, useeffect } from "react";
export default function home() {
  const [durchartdata, setdurchartdata] = usestate({
    labels: ["exercise 1", "exercise 2", "exercise 3"],
    datasets: [
      {
        label: "duration",
        data: [100, 200, 300],
      },
    ],
  });
  const [distchartdata, setdistchartdata] = usestate({
    labels: ["exercise 1", "exercise 2", "exercise 3"],
    datasets: [
      {
        label: "distance",
        data: [100, 200, 300],
      },
    ],
  });
  const [calchartdata, setcalchartdata] = usestate({
    labels: ["exercise 1", "exercise 2", "exercise 3"],
    datasets: [
      {
        label: "calories",
        data: [100, 200, 300],
      },
    ],
  });
  const [uid, setuid] = usestate("");
  const fetchdata = async () => {
    try {
      // replace 'api_endpoint' with the actual endpoint of your api
      let apistr =
        "http://127.0.0.1:8000/api/exercise/getall/" +
        localstorage.getitem("userid");
      const response = await axios.get(apistr);
      const data = response.data;

      console.log(localstorage.getitem("userid"));
      if (array.isarray(data) && data.length > 0) {
        const newdurationdata = {
          labels: data.map((exercise) => exercise.exercisename || ""),
          datasets: [
            {
              label: "duration",
              data: data.map((exercise) => exercise.duration || 0),
            },
          ],
        };
        const newdistancedata = {
          labels: data.map((exercise) => exercise.exercisename || ""),
          datasets: [
            {
              label: "distance",
              data: data.map((exercise) => exercise.distance || 0),
            },
          ],
        };
        const newcaloriesdata = {
          labels: data.map((exercise) => exercise.exercisename || ""),
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
  const loadfromlocalstorage = () => {
    if (typeof window !== "undefined") {
      const storedvalue = localstorage.getitem("userid");
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
      <ViewChartComponent
        title="Duration *Mins"
        chartData={durchartData}
        minmax={{min:0,max:100}}
        color="rgba(214,151,255,0.5)"
      />

      <ViewChartComponent
        title="Distance *Kms"
        chartData={distchartData}
        minmax={{min:0,max:20}}
        color="rgba(105,208,214,0.5)"
      />

      <ViewChartComponent
        title="Calories *Kcal"
        chartData={calchartData}
        minmax={{min:0,max:700}}
        color="rgba(230,133,92,0.5)"
      />
    </>
  );
}
