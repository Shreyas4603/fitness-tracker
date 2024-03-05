"use client";

import React, { useState, useEffect } from 'react';

const Page = () => {
  // State to store the data fetched from the API
  const [data, setData] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/view/get'); // Assuming your API endpoint is /api/view/get
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to render table headers dynamically
  const renderTableHeaders = () => {
    if (data.length === 0) return null;
    const keys = Object.keys(data[0]); // Get keys from the first item in data
    return (
      <tr>
        {keys.map((key, index) => (
          <th key={index} className="px-4 py-2 capitalize">{key.replace('_', ' ')}</th>
        ))}
      </tr>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View</h1>
      <table className="table-auto w-full">
        <thead className='bg-background-700'>
          {renderTableHeaders()}
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-background-800' : 'bg-background-900'}>
              {Object.values(item).map((value, i) => (
                <td key={i} className="px-4 py-2">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
