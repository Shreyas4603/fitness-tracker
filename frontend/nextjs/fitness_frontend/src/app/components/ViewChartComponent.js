import React from 'react';
import { Radar } from 'react-chartjs-2';

const ViewChartComponent = ({ title, chartData, minmax, color,LinkUrl }) => (
 <div className="max-w-full w-128 mx-5 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-400">
    <a href={LinkUrl}>
      <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div className="p-5">
      <a href="#" className="">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600">
          {title}
        </h5>
      </a>
      <Radar
        options={{
          backgroundColor: color,
          borderColor: color,
          scale: { minmax },
        }}
        data={chartData}
      />
    </div>
 </div>
);

export default ViewChartComponent;