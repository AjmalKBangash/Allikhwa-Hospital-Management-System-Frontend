import BarChartAllikhwa from "../../ForAll/BarChartAllikhwa";
import { useEffect, useState } from "react";
import axios from "axios";

// Icons
import { BsPersonFillExclamation } from "react-icons/bs";
import { FaHandHoldingMedical } from "react-icons/fa";

function PatDashboard() {
  const [drdashboard_showPatient_Details, setdrdashboard_showPatient_Details] =
    useState(false);
  const [patientData, setPatientData] = useState();

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
  }, [patientData]);
  return (
    <>
      {/* These treatements and appointments will be taken from database table where we will be having doctor id (dr_id) and patient id (PID) through that we can make orm query to database to achieve this and also we will dispatch(upload) the data to the databse table appointments_to_dashboard which will render for us these patients data  */}
      {/* the upline work may not be true because if we have patients data table in database then we can orm the table and fetch the data for these queries for example last month appointments (patients treated), today appointments (patients treated)  */}
      <div className="dashboard_top">
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">1224</span>
          <span
            className="dashboard_employee_card_name"
            // style={{ fontSize: "15px" }}
          >
            Total Treated Patients
          </span>
          <span className="dashboard_employee_card_icon">
            <BsPersonFillExclamation />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            Today Appointments
          </span>
          <span className="dashboard_employee_card_icon">
            <FaHandHoldingMedical />
          </span>
        </div>
      </div>
      <div
        style={{
          width: "95%",
          height: "60vh",
          margin: "20px auto",
        }}
      >
        <BarChartAllikhwa />
      </div>
    </>
  );
}

export default PatDashboard;
