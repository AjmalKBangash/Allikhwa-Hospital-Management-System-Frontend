import axios from "axios";
import { useEffect, useState } from "react";

function PatAppointments() {
  const [patdata, setdata_of_patient] = useState();
  const [pat_appointment_data, setdata_of_patient_appointments] = useState();

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/patients/31feb58e-8044-4cfc-b528-24829165eef4"
      )
      .then((res) => {
        setdata_of_patient(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (patdata) {
      axios
        .get(
          "http://localhost:8000/allikhwa-hms/appointments/" +
            patdata.patient_UID
        )
        .then((res) => {
          setdata_of_patient_appointments(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [patdata]);
  let x = 0;
  return (
    <>
      {
        patdata && (
          <>
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
                <h2 className="fillfreebeds_h2">MY PERSONAL DETAILS</h2>
              </span>
              <table className="employee_GeneratedTable">
                <tbody>
                  <tr>
                    <td>Patient ID</td>
                    <td>{patdata.patient_UID}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td> {patdata.patient_name}</td>
                  </tr>{" "}
                  <tr>
                    <td>National ID</td>
                    <td> {patdata.patient_NID}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{patdata.patient_age}</td>
                  </tr>
                  <tr>
                    <td>Last Appointment Date</td>
                    <td>{patdata.patient_eappointmentdate}</td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>{patdata.patient_contact}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td> {patdata.patient_city}</td>
                  </tr>{" "}
                  <tr>
                    <td>Country</td>
                    <td> {patdata.patient_country}</td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>{patdata.patient_department}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {pat_appointment_data && (
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
                {pat_appointment_data.map((appointment, id) => {
                  return (
                    <>
                      <span>
                        <h2 className="fillfreebeds_h2">
                          MY APPOINTMENTS DETAILS {(x = x + 1)}
                        </h2>
                      </span>
                      <table className="employee_GeneratedTable" key={id}>
                        <tbody key={id + 1}>
                          <tr>
                            <td>Patient ID</td>
                            <td>{appointment.patient}</td>
                          </tr>
                          <tr>
                            <td>My Appointment Doctor</td>
                            <td> {appointment.doctor}</td>
                          </tr>
                          <tr>
                            <td>Family Member</td>
                            <td> {patdata.patient_familymem}</td>
                          </tr>
                          <tr>
                            <td>Appointment Date</td>
                            <td>{appointment.patient_appointmentdate}</td>
                          </tr>
                          <tr>
                            <td>Blood Pressure</td>
                            <td>{appointment.patient_bloodpressure}</td>
                          </tr>
                          <tr>
                            <td>Diabetes</td>
                            <td>{appointment.patient_diabetes}</td>
                          </tr>
                          <tr>
                            <td>My Problem</td>
                            <td> {appointment.patient_disease}</td>
                          </tr>
                          <tr>
                            <td>Instructions by Doctor</td>
                            <td>{appointment.patient_instructions}</td>
                          </tr>
                          <tr>
                            <td>Medicines</td>
                            <td> {appointment.patient_medicine}</td>
                          </tr>
                          <tr>
                            <td>Dosage Frequency</td>
                            <td> {appointment.patient_dosagefrequency}</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  );
                })}
              </div>
            )}
          </>
        )
        // );
      }
    </>
  );
}

export default PatAppointments;
