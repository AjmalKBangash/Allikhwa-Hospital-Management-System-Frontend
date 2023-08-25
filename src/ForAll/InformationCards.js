import { Link } from "react-router-dom";

import { BsPersonFillExclamation } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";

function InformationCards(props) {
  console.log(props);
  return (
    <>
      {" "}
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
          <span
            className="dashboard_employee_card_name"
            style={{ fontSize: "15px" }}
          >
            <Link
              to={
                "http://localhost:3000/all'ikhwa-management-system/departments/totaldepartmentdoctors"
              }
              // state={props.data}
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            >
              Total Doctors
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span
            className="dashboard_employee_card_name"
            style={{ fontSize: "15px" }}
          >
            {/* <Link
              to={
                "http://localhost:3000/all'ikhwa-management-system/departments"
              }
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            > */}
            Total Nurses
            {/* </Link> */}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span
            className="dashboard_employee_card_name"
            style={{ fontSize: "15px" }}
          >
            {/* <Link
              to={
                "http://localhost:3000/all'ikhwa-management-system/departments"
              }
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            > */}
            Total Beds
            {/* </Link> */}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span
            className="dashboard_employee_card_name"
            style={{ fontSize: "15px" }}
          >
            {/* <Link
              to={
                "http://localhost:3000/all'ikhwa-management-system/departments"
              }
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            > */}
            Filled Beds
            {/* </Link> */}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span
            className="dashboard_employee_card_name"
            style={{ fontSize: "15px" }}
          >
            {/* <Link
              to={
                "http://localhost:3000/all'ikhwa-management-system/departments"
              }
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            > */}
            Free Beds
            {/* </Link> */}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
      </div>
    </>
  );
}

export default InformationCards;