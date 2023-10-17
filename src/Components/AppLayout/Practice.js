import axios from "axios";
import { useEffect, useState } from "react";

function Practice() {
  const [sttt, setsttt] = useState();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/adminhms/deaths")
      .then((res) => {
        console.log(res.data);
        setsttt(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      {sttt &&
        sttt.map((death, id) => {
          return (
            <div key={id}>
              <li>Death: {death.deaths}</li>
              <li>Date: {death.date}</li>
            </div>
          );
        })}
    </>
  );
}

export default Practice;
