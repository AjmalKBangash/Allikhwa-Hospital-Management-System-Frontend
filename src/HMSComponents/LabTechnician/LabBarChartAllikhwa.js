import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "JAN",
//     Tests: 4000,
//     // pv: 2400,
//     // amt: 2400,
//   },
//   {
//     name: "FEB",
//     Tests: 3000,
//     // pv: 1398,
//     // amt: 2210,
//   }
// ];

function LabBarChartAllikhwa(props) {
  console.log(props.data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Tests" fill="#8884d8" barSize={30} />
        {/* <Bar dataKey="uv" fill="#82ca9d" />
        <Bar dataKey="amt" fill="#fe4200" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default LabBarChartAllikhwa;
