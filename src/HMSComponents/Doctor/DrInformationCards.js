import { Link } from "react-router-dom";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { PiBedFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import axios from "axios";
function DrInformationCards(props) {
  let departmentname = [props.data];
  const [department_beds_info, setdepartment_beds_info] = useState();

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/department-beds/" + departmentname
      )
      .then((res) => {
        setdepartment_beds_info(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [departmentname]);
  return (
    <>
      <div className="dashboard_top">
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">1224</span>
          <span
            className="dashboard_employee_card_name"
            style={{ fontSize: "15px" }}
          >
            Total Treated Patients Today
          </span>
          <span className="dashboard_employee_card_icon">
            <BsPersonFillExclamation />
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
          <span className="dashboard_employee_card_name">
            <Link
              to={"department-doctors"}
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200" }}
            >
              Doctors
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num"></span>
          <span className="dashboard_employee_card_name">
            <Link
              to={"department-nurses"}
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200" }}
            >
              Nurses
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {department_beds_info && department_beds_info.total_beds}
          </span>
          <span className="dashboard_employee_card_name">
            <Link
              to={"department-beds"}
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200" }}
            >
              Total Beds
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaBed />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {department_beds_info && department_beds_info.beds_in_use}
          </span>
          <span className="dashboard_employee_card_name">
            <Link
              to={"department-beds"}
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200" }}
            >
              Filled Beds
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <PiBedFill />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {department_beds_info && department_beds_info.free_beds}
          </span>
          <span className="dashboard_employee_card_name">
            <Link
              to={"department-beds"}
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200" }}
            >
              Free Beds
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <PiBedFill />
          </span>
        </div>
      </div>
    </>
  );
}

export default DrInformationCards;
