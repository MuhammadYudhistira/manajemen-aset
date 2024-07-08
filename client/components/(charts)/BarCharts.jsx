"use client";
import React from "react";
import { BarChart } from "@tremor/react";

const BarCharts = () => {
  const chartdata = [
    {
      name: "2018",
      "Total Aset": 1000,
    },
    {
      name: "2019",
      "Total Aset": 2488,
    },
    {
      name: "2020",
      "Total Aset": 1445,
    },
    {
      name: "2021",
      "Total Aset": 743,
    },
    {
      name: "2022",
      "Total Aset": 281,
    },
    {
      name: "2023",
      "Total Aset": 500,
    },
    {
      name: "2024",
      "Total Aset": 900,
    },
  ];

  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  return (
    <BarChart
      className="h-56"
      data={chartdata}
      index="name"
      categories={["Total Aset"]}
      colors={["blue"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
      onValueChange={(v) => console.log(v)}
    />
  );
};

export default BarCharts;
