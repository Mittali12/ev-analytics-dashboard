import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import { EVData } from "./interface";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
  "#a4de6c",
  "#d885d8",
];

interface EVByCountryPieProps {
  data: EVData[];
}

const EVByCountryPie: React.FC<EVByCountryPieProps> = ({ data }) => {
  const processedData = data.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.County] = (acc[curr.County] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(processedData).map(([county, count]) => ({
    name: county,
    value: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          isAnimationActive={false}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [`${value}`, `${name}`]}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ fontSize: "10px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EVByCountryPie;
