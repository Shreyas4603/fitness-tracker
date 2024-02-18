import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartComponent = ({ imageSrc, chartTitle, chartData, linkUrl,color }) => (
  <div className="bg-gradient-to-b from-gray-300 to-amber-100 max-w-xl w-96 m-5 bg-black border border-gray-200 rounded-lg shadow dark:bg-blue-100 dark:border-gray-400">
    <a href={linkUrl}>
      <img className="rounded-t-lg" src={imageSrc} alt="" />
    </a>
    <div className="p-5">
      <a href={linkUrl} className="hover:text-blue-500">
        <h5 className="hover:bg-gray-200 underline mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">
          {chartTitle}
        </h5>
      </a>

      <Line className=' h-64' data={chartData} options={{  borderColor: color, scales: {
    y: {
        
      ticks: {
        // Define the step size to match your data's precision
        // For example, if your data ranges from  55 to  56 and includes decimals,
        // you might set a step size of  0.1 to capture those decimals.
        stepSize:  0.1,
        
        // Optionally, you can use a callback function to format the ticks
        // callback: (value, index, values) => {
        //   return value.toFixed(1); // Display ticks with  1 decimal place
        // }
      },
    },
  },}} />


    </div>
  </div>
);

export default LineChartComponent;
