import "./Dashboard.css";
import AreaChartt from "./AreaChartt";
// Icons for Employees
import { BsPersonBadgeFill } from "react-icons/bs";
import { AiFillIdcard } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { RiDashboardFill, RiAdminFill } from "react-icons/ri";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaUserNurse } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FaHandHoldingMedical } from "react-icons/fa";
import { FaFileMedicalAlt } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { AreaChart } from "recharts";
import PieChartt from "./PieChartt";
import { FaBed } from "react-icons/fa";
import { PiBedFill } from "react-icons/pi";

function Dashboard() {
  return (
    <>
      {/* Patients Card Started */}
      <div className="dashboard_top dashboard_top02">
        <div
          className="dashboard_employee_pat_card"
          style={{ borderRight: "1px solid #fe44007e" }}
        >
          <span
            className="dashboard_employee_card_num"
            style={{ bottom: "10%", left: "0%" }}
          >
            79876
          </span>
          <span
            className="dashboard_employee_card_name"
            style={{ bottom: "10%", left: "0%" }}
          >
            Total Patients Treated{" "}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <BsPersonFillExclamation />
          </span>
        </div>
        <div
          className="dashboard_employee_pat_card"
          style={{ borderRight: "1px solid #fe44007e" }}
        >
          <span
            className="dashboard_employee_card_num"
            style={{ bottom: "10%", left: "0%" }}
          >
            564
          </span>
          <span
            className="dashboard_employee_card_name"
            style={{ bottom: "10%", left: "0%" }}
          >
            {" "}
            Surgeries Performed
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaHandHoldingMedical />
          </span>
        </div>
        <div
          className="dashboard_employee_pat_card"
          style={{ borderRight: "1px solid #fe44007e" }}
        >
          <span
            className="dashboard_employee_card_num"
            style={{ bottom: "10%", left: "0%" }}
          >
            187
          </span>
          <span
            className="dashboard_employee_card_name"
            style={{ bottom: "10%", left: "0%" }}
          >
            {" "}
            Births
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaBirthdayCake />
          </span>
        </div>
        <div
          className="dashboard_employee_pat_card"
          style={{ borderRight: "1px solid #fe44007e" }}
        >
          <span
            className="dashboard_employee_card_num"
            style={{ bottom: "10%", left: "0%" }}
          >
            97
          </span>
          <span
            className="dashboard_employee_card_name"
            style={{ bottom: "10%", left: "0%" }}
          >
            {" "}
            Deaths
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaFileMedicalAlt />
          </span>
        </div>
      </div>
      <div className="dashboard_psd_charts">
        <div
          style={{
            width: "60%",
            height: "100%",
            borderRight: "1px solid #fe44007e",
          }}
        >
          <AreaChartt style={{ fontSize: "13px" }} />
        </div>
        <div style={{ width: "40%", height: "100%" }}>
          <PieChartt />
        </div>
      </div>
      {/* departments Started  */}
      <div className="dashboard_departments_card">
        <div className="dashboard_top dashboard_top02">
          <div
            className="dashboard_employee_pat_card"
            style={{ borderRight: "1px solid #fe44007e" }}
          >
            <span
              className="dashboard_employee_card_num"
              style={{ bottom: "10%", left: "0%" }}
            >
              18
            </span>
            <span
              className="dashboard_employee_card_name"
              style={{ bottom: "10%", left: "0%" }}
            >
              Total Departments{" "}
            </span>{" "}
            <span className="dashboard_employee_card_icon">
              <FcDepartment />
            </span>
          </div>
          <div
            className="dashboard_employee_pat_card"
            style={{ borderRight: "1px solid #fe44007e" }}
          >
            <span
              className="dashboard_employee_card_num"
              style={{ bottom: "10%", left: "0%" }}
            >
              240
            </span>
            <span
              className="dashboard_employee_card_name"
              style={{ bottom: "10%", left: "0%" }}
            >
              {" "}
              Total Beds
            </span>{" "}
            <span className="dashboard_employee_card_icon">
              <FaBed />
            </span>
          </div>
          <div
            className="dashboard_employee_pat_card"
            style={{ borderRight: "1px solid #fe44007e" }}
          >
            <span
              className="dashboard_employee_card_num"
              style={{ bottom: "10%", left: "0%" }}
            >
              21
            </span>
            <span
              className="dashboard_employee_card_name"
              style={{ bottom: "10%", left: "0%" }}
            >
              {" "}
              Free Beds
            </span>{" "}
            <span className="dashboard_employee_card_icon">
              <PiBedFill />
            </span>
          </div>
        </div>
      </div>
      {/* General Like doctors, pharmacists, staf members others etc in totall numbers  */}
      <div className="dashboard_top">
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">1224</span>
          <span className="dashboard_employee_card_name">
            {" "}
            Total Employess{" "}
          </span>
          <span className="dashboard_employee_card_icon">
            <AiFillIdcard />
          </span>
        </div>

        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">ADMINS </span>
          <span className="dashboard_employee_card_icon">
            <RiAdminFill />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name"> DOCTORS</span>
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            PHARMACISTS{" "}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <AiFillMedicineBox />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">NURSES </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserNurse />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            {" "}
            RECEPTIONISTS
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <MdPersonalInjury />
          </span>
        </div>
        {/* <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            {" "}
            Total Departments
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FcDepartment />
          </span>
        </div> */}
      </div>
    </>
  );
}

export default Dashboard;
