"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function AreaCharts({ data, xAxis, yAxis }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const valueFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  if (!isClient) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#000000" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#000000" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey={xAxis} className="text-xs" />
        <YAxis tickFormatter={valueFormatter} width={120} className="text-xs" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={valueFormatter} className="text-sm" />
        <Area type="monotone" dataKey={yAxis} stroke="#000000" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
