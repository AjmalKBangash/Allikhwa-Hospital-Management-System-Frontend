import BarChartAllikhwa from "../../ForAll/BarChartAllikhwa";
import { useEffect, useState } from "react";
import axios from "axios";

// Icons
import { BsPersonFillExclamation } from "react-icons/bs";
import { FaHandHoldingMedical } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdDetails } from "react-icons/md";

function LabDashboard() {
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
            Last Month Appointments
          </span>
          <span className="dashboard_employee_card_icon">
            <FaHandHoldingMedical />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            {" "}
            Today Appointments
          </span>
          <span className="dashboard_employee_card_icon">
            <FaHandHoldingMedical />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">&#36;324</span>
          <span className="dashboard_employee_card_name"> Today Income </span>
          <span className="dashboard_employee_card_icon">
            <RiMoneyDollarCircleFill />
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
export default LabDashboard;
