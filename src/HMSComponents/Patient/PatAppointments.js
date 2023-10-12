import axios from "axios";
import { useEffect, useState } from "react";

function PatAppointments() {
  const [data_of_patient_appointments, setdata_of_patient_appointments] =
    useState();
  useEffect(() => {
    axios
      .get(
        "http://localhost:3100/patients/?PID=b0f07faf-06f5-43ee-8003-fbf9d144d66b"
      )
      .then((res) => {
        setdata_of_patient_appointments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {data_of_patient_appointments &&
        data_of_patient_appointments.map((patdata, id) => {
          return (
            <div
              className="col2indocdetails"
              style={{
                width: "75%",
                position: "relative",
                margin: "30px auto",
                padding: "10px",
                boxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                webkitboxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                mozBoxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
              }}
            >
              <span>
                <h2 className="fillfreebeds_h2">MY APPOINTMENT DETAILS</h2>
              </span>
              <table className="employee_GeneratedTable">
                <tbody>
                  <tr>
                    <td>PID</td>
                    <td>{patdata.PID}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td> {patdata.name}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{patdata.age}</td>
                  </tr>
                  <tr>
                    <td>Last Appointment Date</td>
                    <td>{patdata.date}</td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>{patdata.contact}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td> {patdata.city}</td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>{patdata.department}</td>
                  </tr>
                  <tr>
                    <td>Patient Doctor</td>
                    <td>{patdata.doctor}</td>
                  </tr>
                  <tr>
                    <td>Medicine</td>
                    <td>{patdata.medicine}</td>
                  </tr>
                  <tr>
                    <td>Instructions</td>
                    <td>{patdata.instructions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
    </>
  );
}

export default PatAppointments;
