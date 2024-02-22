import { Chart } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

const LineChartComponent = ({
  imageSrc,
  chartTitle,
  chartData,
  linkUrl,
  color,
}) => {

  Chart.defaults.borderColor = "#7893ed";
  Chart.defaults.color = "#ffffff";
  return (
    <div className="bg-background-900  w-full   rounded-lg shadow text-white  border border-background-900">
      <a href={linkUrl}>
        <img className="rounded-t-lg" src={imageSrc} alt="" />
      </a>
      <div className="p-5">
        <a href={linkUrl} className="">
          <p className="text-center text-2xl pb-3 ">
            {chartTitle}
          </p>
        </a>

        <Line
          className=" h-64"
          data={chartData}
          options={{
            borderColor: color,
            scales: {
              y: {
                ticks: {
                  // Define the step size to match your data's precision
                  // For example, if your data ranges from  55 to  56 and includes decimals,
                  // you might set a step size of  0.1 to capture those decimals.
                  stepSize: 0.1,

                  // Optionally, you can use a callback function to format the ticks
                  // callback: (value, index, values) => {
                  //   return value.toFixed(1); // Display ticks with  1 decimal place
                  // }
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChartComponent;
