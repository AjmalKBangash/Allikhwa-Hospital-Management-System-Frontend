import { Link } from "react-router-dom";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";

function DrInformationCards(props) {
  let departmentname = [props.data];

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
              to={
                "http://localhost:3000/rec-hms/rec-departments/" +
                departmentname +
                "/department-doctors"
              }
              // to={"department-doctors"}
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            >
              Doctors
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            <Link
              to={
                "http://localhost:3000/rec-hms/rec-departments/" +
                departmentname +
                "/department-nurses"
              }
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            >
              Nurses
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            <Link
              to={
                "http://localhost:3000/rec-hms/rec-departments/" +
                departmentname +
                "/department-beds"
              }
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            >
              Total Beds
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            <Link
              to={
                "http://localhost:3000/rec-hms/rec-departments/" +
                departmentname +
                "/department-beds"
              }
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            >
              Filled Beds
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            <Link
              to={
                "http://localhost:3000/rec-hms/rec-departments/" +
                departmentname +
                "/department-beds"
              }
              state={departmentname}
              className="linkk"
              style={{ color: "#fe4200", borderBottom: "2px solid #fe4200" }}
            >
              Free Beds
            </Link>
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaUserDoctor />
          </span>
        </div>
      </div>
    </>
  );
}

export default DrInformationCards;
