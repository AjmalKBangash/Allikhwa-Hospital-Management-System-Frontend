import "./Patients.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// react icons
import { RiHospitalFill } from "react-icons/ri";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";

function Patients() {
  let [patientData, setPatientData] = useState();
  let [patientDataDetails, setPatientDataDetails] = useState();
  let [showPatienDetails, setShowPatientDetails] = useState(false);

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
      .get("http://localhost:3100/patients")
      .then((res) => {
        // console.log(res.data);
        setPatientData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
        <div className="dashboard_employee_card">
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
        </div>
      </div>
      {/* On Edit Each Patient Information  */}
      {showPatienDetails && (
        <div
          className="col2indocdetails"
          style={{ margin: "30px auto 30px auto", width: "70%" }}
        >
          <table className="employee_GeneratedTable">
            <tbody>
              <tr>
                <td>
                  {" "}
                  <div
                    className="statisticsonlineconsul"
                    style={{
                      width: "fit-content",
                      margin: "auto",
                    }}
                  >
                    PATIENT DETAILS
                  </div>
                </td>
                <td>
                  <button
                    // ref={toggle_display_canceldetails_button}
                    className="admin_buttons_add_update_from_add_update_form"
                    onClick={() => {
                      setShowPatientDetails(false);
                    }}
                    style={{ margin: " 0 30%", backgroundColor: "red" }}
                  >
                    CLOSE DETAILS
                  </button>
                </td>
              </tr>
              {patientDataDetails ? (
                <>
                  <tr>
                    <td>PID</td>
                    <td>{patientDataDetails.PID}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td> {patientDataDetails.name}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{patientDataDetails.age}</td>
                  </tr>
                  <tr>
                    <td>Last Appointment Date</td>
                    <td>{patientDataDetails.date}</td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>{patientDataDetails.contact}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td> {patientDataDetails.city}</td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>{patientDataDetails.department}</td>
                  </tr>
                  <tr>
                    <td>Admitted Status</td>
                    <td>{patientDataDetails.admitted_status}</td>
                  </tr>
                  <tr>
                    <td>Bed No</td>
                    <td>{patientDataDetails.bed_no}</td>
                  </tr>
                  <tr>
                    <td>Patient Doctor</td>
                    <td>{patientDataDetails.doctor}</td>
                  </tr>
                  <tr>
                    <td>Medicine</td>
                    <td>{patientDataDetails.medicine}</td>
                  </tr>
                  <tr>
                    <td>Instructions</td>
                    <td>{patientDataDetails.instructions}</td>
                  </tr>
                </>
              ) : (
                <h6>Loading ...</h6>
              )}
            </tbody>
          </table>
        </div>
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
        <table class="patient_GeneratedTable_details">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Date</th>
              <th>Contact</th>
              <th>City</th>
              <th>Department</th>
              <th>Admitted Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {patientData ? (
              patientData.map((patdet, id) => {
                console.log(patdet);
                return (
                  <tr key={id}>
                    <td>{patdet.name}</td>
                    <td>{patdet.age}</td>
                    <td>{patdet.date}</td>
                    <td>{patdet.contact}</td>
                    <td>{patdet.city}</td>
                    <td>{patdet.department}</td>
                    <td>{patdet.admitted_status}</td>
                    <td
                      onClick={() => {
                        PatientDetailsFun(patdet);
                      }}
                    >
                      <BiEdit className="patient_details_edit_icon" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <h6>Loading ...</h6>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Patients;
