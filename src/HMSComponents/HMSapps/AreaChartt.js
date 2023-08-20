import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AreaChartt() {
  const hhh = "page daboskai";

  const data = [
    {
      name: "2019",
      birth: "2345",
      surgeries: "657",
      deaths: "1789",
    },
    {
      name: "2020",
      birth: "1234",
      surgeries: "342",
      deaths: "1243",
    },
    {
      name: "2021",
      birth: "2143",
      surgeries: "321",
      deaths: "321",
    },
    {
      name: "2022",
      birth: "1678",
      surgeries: "328",
      deaths: "114",
    },
    {
      name: "2023",
      birth: "2345",
      surgeries: "457",
      deaths: "1498",
    },
    // {
    //   name: "2024",
    //   birth: "2345",
    //   surgeries: "657",
    //   deaths: "1789",
    // },
    // {
    //   name: "2025",
    //   birth: "2345",
    //   surgeries: "657",
    //   deaths: "1789",
    // },
  ];
  //   static demoUrl = "https://codesandbox.io/s/stacked-area-chart-ix341";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="birth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="surgeries" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="deaths" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#fe4200" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#fe4200" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tickCount={5}
          style={{ fontSize: "12px", fontWeight: "700" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickCount={5}
          style={{ fontSize: "12px", fontWeight: "700" }}
        />
        <Legend />
        <Tooltip
          wrapperStyle={{ color: "white" }}
          itemStyle={{
            fontSize: "12px",
            fontWeight: "500",
            color: "white",
          }}
          labelStyle={{ color: "white", fontWeight: "500", margin: "2px 15px" }}
          contentStyle={{
            backgroundColor: "#013737",
            opacity: "0.8",
            borderRadius: "4px",
            height: "80px",
            width: "80px",
            border: "none",
            padding: "5px",
          }}
        />
        {/* content={<CustomToolTip />} */}
        <Area
          dataKey="birth"
          stackId="1"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#birth)"
        />
        <Area
          dataKey="surgeries"
          stackId="1"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#surgeries)"
        />
        <Area
          dataKey="deaths"
          stackId="1"
          stroke="#fe4200"
          fillOpacity={1}
          fill="url(#deaths)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// function CustomToolTip({ active, payload, label }) {
//   if (active) {
//     return (
//       <div className="tooltip_Area_Graph">
//         <p>{label}</p>
//         <p>
//           {JSON.stringify(payload[0].name) && JSON.stringify(payload[0].value)}
//         </p>
//         <p>
//           {(JSON.stringify(payload[1].name), JSON.stringify(payload[1].value))}
//         </p>
//       </div>
//     );
//   }
// }
