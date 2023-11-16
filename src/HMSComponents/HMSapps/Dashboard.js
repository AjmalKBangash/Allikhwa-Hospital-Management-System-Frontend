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
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [total_treated_patients_state, settotal_treated_Patients_state] =
    useState();
  const [total_departments_state, settotal_departments_state] = useState();
  const [total_free_broken_beds_state, settotal_free_broken_beds_state] =
    useState();
  const [total_hospital_employees_state, settotal_hospital_employees_state] =
    useState();
  const [total_departmn, ments_state, settotal_deparbnmtmentns_state] =
    useState();
  const [total_deparbmnments_state, settotal_depabnvnbrtments_state] =
    useState();

  // TOTAL TREATED PATIENTS
  useEffect(() => {
    axios
      .get("http://localhost:8000/allikhwa-hms/all-treated-patients/")
      .then((res) => {
        settotal_treated_Patients_state(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // TOTAL DEPARTMENTS
  useEffect(() => {
    axios
      .get("http://localhost:8000/allikhwa-hms/departments/")
      .then((res) => {
        settotal_departments_state(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // TOTAL FREE BYSY BROKEN BEDS
  useEffect(() => {
    let total_beds = 0;
    let free_beds = 0;
    let broken_beds = 0;
    axios
      .get("http://localhost:8000/allikhwa-hms/department-beds/")
      .then((res) => {
        res.data.map((department_beds) => {
          total_beds += Number(department_beds.total_beds);
          free_beds += Number(department_beds.free_beds);
          broken_beds += Number(department_beds.broken_beds);
        });
        settotal_free_broken_beds_state({
          total_beds: total_beds,
          broken_beds: broken_beds,
          free_beds: free_beds,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // TOTAL HOSPITAL EMPLOYEES
  useEffect(() => {
    axios
      .get("http://localhost:8000/allikhwa-hms/total-hospital-employees/")
      .then((res) => {
        settotal_hospital_employees_state(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
            {total_treated_patients_state &&
              total_treated_patients_state.total_treated_patients}
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
            2
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
            4
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
            2
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
              {total_departments_state && total_departments_state}
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
              {total_free_broken_beds_state &&
                total_free_broken_beds_state.total_beds}
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
              {total_free_broken_beds_state &&
                total_free_broken_beds_state.free_beds}
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
          <div
            className="dashboard_employee_pat_card"
            style={{ borderRight: "1px solid #fe44007e" }}
          >
            <span
              className="dashboard_employee_card_num"
              style={{ bottom: "10%", left: "0%" }}
            >
              {total_free_broken_beds_state &&
                total_free_broken_beds_state.broken_beds}
            </span>
            <span
              className="dashboard_employee_card_name"
              style={{ bottom: "10%", left: "0%" }}
            >
              {" "}
              Broken Beds
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
          <span className="dashboard_employee_card_num">
            {total_hospital_employees_state &&
              total_hospital_employees_state.total_employees}
          </span>
          <span className="dashboard_employee_card_name">Total Employess</span>
          <span className="dashboard_employee_card_icon">
            <AiFillIdcard />
          </span>
        </div>

        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {total_hospital_employees_state &&
              total_hospital_employees_state.admins}
          </span>
          <span className="dashboard_employee_card_name">ADMINS </span>
          <span className="dashboard_employee_card_icon">
            <RiAdminFill />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {total_hospital_employees_state &&
              total_hospital_employees_state.doctors}
          </span>
          <span className="dashboard_employee_card_name"> DOCTORS</span>
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {total_hospital_employees_state &&
              total_hospital_employees_state.pharmacists}
          </span>
          <span className="dashboard_employee_card_name">PHARMACISTS </span>{" "}
          <span className="dashboard_employee_card_icon">
            <AiFillMedicineBox />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {total_hospital_employees_state &&
              total_hospital_employees_state.nurses}
          </span>
          <span className="dashboard_employee_card_name">NURSES </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserNurse />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {total_hospital_employees_state &&
              total_hospital_employees_state.receptionists}
          </span>
          <span className="dashboard_employee_card_name"> RECEPTIONISTS</span>{" "}
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
