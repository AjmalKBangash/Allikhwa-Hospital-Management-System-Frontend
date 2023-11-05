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
    APPOINTMENTS: 4000,
    // pv: 2400,
    // amt: 2400,
  },
  {
    name: "FEB",
    APPOINTMENTS: 3000,
    // pv: 1398,
    // amt: 2210,
  },
  {
    name: "MAR",
    APPOINTMENTS: 2000,
    // pv: 9800,
    // amt: 2290,
  },
  {
    name: "APR",
    APPOINTMENTS: 2423,
    // pv: 3908,
    // amt: 2000,
  },
  {
    name: "MAY",
    APPOINTMENTS: 1890,
    // pv: 4800,
    // amt: 2181,
  },
  {
    name: "JUN",
    APPOINTMENTS: 2390,
    // pv: 3800,
    // amt: 2500,
  },
  {
    name: "JUL",
    APPOINTMENTS: 3490,
    // pv: 4300,
    // amt: 2100,
  },
  {
    name: "AUG",
    APPOINTMENTS: 3245,
    // pv: 9800,
    // amt: 2290,
  },
  {
    name: "SEP",
    APPOINTMENTS: 2647,
    // pv: 3908,
    // amt: 2000,
  },
  {
    name: "OCT",
    APPOINTMENTS: 3214,
    // pv: 3800,
    // amt: 2500,
  },
  {
    name: "NOV",
    APPOINTMENTS: 2134,
    // pv: 4300,
    // amt: 2100,
  },
  {
    name: "DEC",
    APPOINTMENTS: 1175,
    // pv: 4800,
    // amt: 2181,
  },
];

function BarChartAllikhwa(props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        // data={props.data}
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
        <Bar dataKey="APPOINTMENTS" fill="#8884d8" barSize={30} />
        {/* <Bar dataKey="uv" fill="#82ca9d" />
        <Bar dataKey="amt" fill="#fe4200" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartAllikhwa;
