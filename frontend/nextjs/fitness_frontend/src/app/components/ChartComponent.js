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
}) => {
  // Chart.defaults.backgroundColor = "#fffff";
  Chart.defaults.borderColor = "#424242";
  Chart.defaults.color = "#ffffff";
  return (
    <div className="bg-background-900    rounded-lg shadow text-white  border border-background-900 h-full">
      <a href={linkUrl}>
        <img className="rounded-t-lg" src={imageSrc} alt="" />
      </a>
      <div className="p-5">
        <a href={linkUrl} className="">
          <h5 className=" text-center text-2xl pb-3 ">
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
          className="inline-flex items-center px-3 py-2 my-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
};

export default ChartComponent;
