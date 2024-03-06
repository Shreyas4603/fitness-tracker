"use client";

import React, { useState, useEffect } from "react";
import { postData } from "../../../utils/apiCall";
import DisplayView from "../components/DisplayView";

const Page = () => {
  // State to store the data fetched from the API
  const [data, setData] = useState([]);
  const [viewName, setviewName] = useState();
const [viewData, setviewData] = useState([])
  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/view/getAll"); // Assuming your API endpoint is /api/view/get
      const jsonData = await response.json();
      if (jsonData) {
        setData(jsonData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const getViewData = async (viewName) => {
    try {
      const response = await postData("http://127.0.0.1:8000/api/view/get", {
        view_name: viewName,
      }); // Assuming your API endpoint is /api/view/get
      // const jsonData = await response.json();
      if (response) {
        setviewData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to render table headers dynamically
  const handleChange = async (e) => {
    const selectedViewName = e.target.value;
    setviewName(selectedViewName); // Update the viewName state with the selected value
    await getViewData(selectedViewName); // Pass the selected value to getViewData
  };

  return (
    <div className="container mx-auto p-4">
      <select
        className="bg-transparent rounded-md"
        onChange={(e) => handleChange(e)}
      >
        {/* <option disabled >Select a view</option> */}
        {data?.map((item, idx) => (
          <option className="bg-black" key={idx}>
            {item}
          </option>
        ))}
      </select>
      <DisplayView data={viewData}/>
    </div>
  );
};

export default Page;
