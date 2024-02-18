import React from "react";
import { Chart } from "chart.js/auto";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
const ChartComponent = ({
  imageSrc,
  chartTitle,
  chartData,
  linkUrl,
  addUrl,
  svgPath,
  buttonText,
}) => (
  <div className="bg-gradient-to-b from-gray-300 to-amber-200 max-w-4xl w-128 m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-400">
    <a href={linkUrl}>
      <img className="rounded-t-lg" src={imageSrc} alt="" />
    </a>
    <div className="p-5">
      <a href={linkUrl} className="hover:text-blue-500">
        <h5 className="hover:bg-gray-200 underline mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">
          {chartTitle}
        </h5>
      </a>

      <Radar
        options={{
          defaults: {
            global: {
              defaultFontColor: "#000000", // Set the color to black or any other dark color
            },
          },
        }}
        data={chartData}
      />

      <a
        href={addUrl}
        className="inline-flex items-center px-3 py-2 my-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {buttonText}
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
            d={svgPath}
          />
        </svg>
      </a>
    </div>
  </div>
);

export default ChartComponent;
