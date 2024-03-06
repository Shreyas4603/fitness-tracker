"use client";
import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const BMI = ({ weight, height }) => {
  const calculateBMI = (weight, height) => {
    // Convert height from cm to meters
    height = height / 100;

    // Calculate BMI
    const bmi = weight / (height * height);

    return bmi.toFixed(2); // Round to 2 decimal places
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
      return "Overweight";
    } else if (bmi >= 30) {
      return "Obese";
    } else {
      return "Unknown";
    }
  };

  return (
    <div className="">
      <ReactSpeedometer
        customSegmentStops={[0, 18.5, 25, 30, 35, 40, 50]} // Adjusted maximum value to 80
        segmentColors={[
          "#bd2021",
          "#008036",
          "#ffe501",
          "#d28988",
          "#bd2021",
          "#8a0101",
        ]}
        width={250}
        height={100}
        ringWidth={30}
        value={calculateBMI(weight, height)}
        maxValue={50}
      />
      <p className="w-full text-center p-2 ">
        BMI : {calculateBMI(weight, height)} 
      </p>
      <p className="text-center">{getBMICategory(calculateBMI(weight, height))}</p>
    </div>
  );
};

export default BMI;
