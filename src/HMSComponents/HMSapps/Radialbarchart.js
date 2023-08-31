import React, { PureComponent } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "CONTRUCTION & RENOVATION",
    uv: 21.47,
    pv: 2400,
    fill: "#8884d8",
  },
  {
    name: "FOOD SERVICE",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed",
  },
  {
    name: "EMPLOYEE SALARIES",
    uv: 15.69,
    pv: 1398,
    fill: "#8dd1e1",
  },
  {
    name: "HOSPITAL AND MEDICAL EQUIPMENT",
    uv: 8.22,
    pv: 9800,
    fill: "#82ca9d",
  },
  {
    name: "MEDICAL AND SURGICAL SUPPLIES",
    uv: 8.63,
    pv: 3908,
    fill: "#a4de6c",
  },
  {
    name: "PATIENT MEDICATIONS",
    uv: 2.63,
    pv: 4800,
    fill: "#d0ed57",
  },
  {
    name: "SOFTWARE AND INFORMATION TECHNOLOGY",
    uv: 6.67,
    pv: 4800,
    fill: "#ffc658",
  },
  {
    name: "DIFFERENT BILLS",
    uv: 6.67,
    pv: 4800,
    fill: "#013737a2",
  },
];

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

function Radialbarchart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        cx="35%"
        cy="95%"
        innerRadius="30%"
        outerRadius="200%"
        barSize={100}
        data={data}
        startAngle={180}
        endAngle={0}
        color={"black"}
      >
        <RadialBar
          minAngle={15}
          label={{ position: "insideStart", fill: "#013737" }}
          background
          clockWise
          dataKey="uv"
        />
        <Legend
          iconSize={20}
          layout="vertical"
          verticalAlign="top"
          align="right"
          wrapperStyle={style}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default Radialbarchart;
