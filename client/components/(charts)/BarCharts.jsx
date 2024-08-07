"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const BarCharts = ({ data, xAxis, yAxis }) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} className="text-xs" />
        <YAxis dataKey={yAxis} className="text-xs" />
        <Tooltip />
        <Legend />
        <Bar dataKey={yAxis} fill="#000000" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
