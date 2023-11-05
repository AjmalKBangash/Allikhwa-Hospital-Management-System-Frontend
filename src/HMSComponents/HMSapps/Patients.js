import "./Patients.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// react icons
import { RiHospitalFill } from "react-icons/ri";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import { MdDetails } from "react-icons/md";

function Patients() {
  let [patientData, setPatientData] = useState();
  let [patientDataDetails, setPatientDataDetails] = useState();
  let [showPatienDetails, setShowPatientDetails] = useState(false);
  const [data_of_patient_appointments, setdata_of_patient_appointments] =
    useState(false);

  // function for showing patient details
  function PatientDetailsFun(patdet) {
    setShowPatientDetails(true);
    setPatientDataDetails(patdet);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    axios
      .get("http://localhost:8000/allikhwa-hms/patients")
      .then((res) => {
        setPatientData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (patientDataDetails) {
      axios
        .get(
          "http://localhost:8000/allikhwa-hms/appointments/" +
            patientDataDetails.patient_UID
        )
        .then((res) => {
          setdata_of_patient_appointments(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [patientDataDetails]);
  let x = 0;
  return (
    <>
      <div className="dashboard_top">
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">1224</span>
          <span
            className="dashboard_employee_card_name"
            style={{ fontSize: "15px" }}
          >
            Total Admitted Patients currently in Hospital
          </span>
          <span className="dashboard_employee_card_icon">
            <RiHospitalFill />
          </span>
        </div>

        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            Last Month Patients
          </span>
          <span className="dashboard_employee_card_icon">
            <BsPersonFillExclamation />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            {" "}
            Last Year Patients
          </span>
          <span className="dashboard_employee_card_icon">
            <BsPersonFillExclamation />
          </span>
        </div>
        {/* This is not approriate because this leaks the protected routes  */}
        {/* <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span
            className="dashboard_employee_card_name"
            // style={{ fontSize: "15px" }}
          >
            <Link
              to={
                "http://localhost:3000/all'ikhwa-management-system/departments"
              }
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            >
              Patients in every Department
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FcDepartment />
          </span>
        </div> */}
      </div>
      {/* On Edit Each Patient Information  */}
      {showPatienDetails && (
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
              MozBoxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
            }}
          >
            <span>
              <h2 className="fillfreebeds_h2" style={{ width: "125px" }}>
                PATIENT DETAILS
              </h2>
              <h2
                className="fillfreebeds_h2"
                style={{
                  position: "absolute",
                  top: "1%",
                  right: "3%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowPatientDetails(false);
                  setdata_of_patient_appointments(false);
                }}
              >
                &#10060;
              </h2>
            </span>
            <table className="employee_GeneratedTable">
              <tbody>
                {patientDataDetails ? (
                  <>
                    <tr>
                      <td>PID</td>
                      <td>{patientDataDetails.patient_UID}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td> {patientDataDetails.patient_name}</td>
                    </tr>
                    <tr>
                      <td>Age</td>
                      <td>{patientDataDetails.patient_age}</td>
                    </tr>
                    <tr>
                      <td>Last Appointment Date</td>
                      <td>{patientDataDetails.patient_eappointmentdate}</td>
                    </tr>
                    <tr>
                      <td>Contact</td>
                      <td>{patientDataDetails.patient_contact}</td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td> {patientDataDetails.patient_city}</td>
                    </tr>
                    <tr>
                      <td>Department</td>
                      <td>{patientDataDetails.patient_department}</td>
                    </tr>
                    <tr>
                      <td>Admitted Status</td>
                      <td>{patientDataDetails.patient_admittedStatus}</td>
                    </tr>
                    <tr>
                      <td>Bed No</td>
                      <td>{patientDataDetails.bed_no}</td>
                    </tr>
                    <tr>
                      <td>Patient Doctor</td>
                      <td>{patientDataDetails.patient_doctor}</td>
                    </tr>
                  </>
                ) : (
                  <h6>Loading ...</h6>
                )}
              </tbody>
            </table>
            <br />
            <hr />

            {data_of_patient_appointments.length > 0 ? (
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
                {data_of_patient_appointments.map((appointment, id) => {
                  return (
                    <>
                      <span>
                        <h2 className="fillfreebeds_h2">
                          {patientDataDetails.patient_name.toUpperCase()}{" "}
                          APPOINTMENT NO {(x = x + 1)}
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
                            <td> {appointment.patient_familymem}</td>
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
            ) : (
              <h2 className="fillfreebeds_h2">NO APPOINTMENTS</h2>
            )}
          </div>
        </>
      )}

      {/* All Patients Html Information Table  */}
      <div className="patient_html_table">
        <div
          className="statisticsonlineconsul"
          style={{
            width: "fit-content",
            margin: " 10px auto",
          }}
        >
          ALL PATIENTS
        </div>
        <table className="patient_GeneratedTable_details">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Date</th>
              <th>Contact</th>
              <th>City</th>
              <th>Department</th>
              <th>Admitted Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {patientData ? (
              patientData.map((patdet, id) => {
                return (
                  <tr key={id}>
                    <td key={id + 1}>{patdet.patient_name}</td>
                    <td key={id + 2}>{patdet.patient_age}</td>
                    <td key={id + 3}>{id + 4}</td>
                    <td key={id + 5}>{patdet.patient_contact}</td>
                    <td key={id + 6}>{patdet.patient_city}</td>
                    <td key={id + 7}>{patdet.patient_department}</td>
                    <td key={id + 8}>{patdet.patient_admittedStatus}</td>
                    <td
                      key={id + 9}
                      onClick={() => {
                        PatientDetailsFun(patdet);
                      }}
                    >
                      <MdDetails className="patient_details_edit_icon" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>
                  {" "}
                  <div>Loading ...</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Patients;
