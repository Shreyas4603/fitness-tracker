import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale,RadialLinearScale , Title } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title,RadialLinearScale);
const ViewChartComponent = ({ title, chartData, min,max, color,LinkUrl }) => (
 <div className="bg-background-900   m-5  rounded-lg shadow text-white  border border-background-900">
    <a href={LinkUrl}>
      <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div className="p-5">
      <a href="#" className="">
        <h5 className="text-center text-2xl pb-3">
          {title}
        </h5>
      </a>
      <Radar

        data={chartData}
      />
    </div>
 </div>
);

export default ViewChartComponent;