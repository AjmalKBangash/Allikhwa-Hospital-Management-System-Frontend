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

const data = [
  {
    name: "JAN",
    Tests: 4000,
    // pv: 2400,
    // amt: 2400,
  },
  {
    name: "FEB",
    Tests: 3000,
    // pv: 1398,
    // amt: 2210,
  },
  {
    name: "MAR",
    Tests: 2000,
    // pv: 9800,
    // amt: 2290,
  },
  {
    name: "APR",
    Tests: 2423,
    // pv: 3908,
    // amt: 2000,
  },
  {
    name: "MAY",
    Tests: 1890,
    // pv: 4800,
    // amt: 2181,
  },
  {
    name: "JUN",
    Tests: 2390,
    // pv: 3800,
    // amt: 2500,
  },
  {
    name: "JUL",
    Tests: 3490,
    // pv: 4300,
    // amt: 2100,
  },
  {
    name: "AUG",
    Tests: 3245,
    // pv: 9800,
    // amt: 2290,
  },
  {
    name: "SEP",
    Tests: 2647,
    // pv: 3908,
    // amt: 2000,
  },
  {
    name: "OCT",
    Tests: 3214,
    // pv: 3800,
    // amt: 2500,
  },
  {
    name: "NOV",
    Tests: 2134,
    // pv: 4300,
    // amt: 2100,
  },
  {
    name: "DEC",
    Tests: 1175,
    // pv: 4800,
    // amt: 2181,
  },
];

function LabBarChartAllikhwa() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
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
