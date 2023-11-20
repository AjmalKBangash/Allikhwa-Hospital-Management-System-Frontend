import { Link, Outlet } from "react-router-dom";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { PiBedFill } from "react-icons/pi";
import { MdControlPoint } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";

function InformationCards(props) {
  let departmentname = props.data;
  let departmentname02 = props.data.toUpperCase();

  const [department_beds_info, setdepartment_beds_info] = useState(false);
  const [
    patients_count_info_for_statistics,
    setpatients_count_info_for_statistics,
  ] = useState();
  const [last_month_patients, setlast_month_patients] = useState();
  const [last_year_patients_state, setlast_year_patients_state] = useState();
  const [referred_to_admission, setreferred_to_admission] = useState();
  const location = useLocation();

  useEffect(() => {
    let last_year_patients = 0;
    if (patients_count_info_for_statistics) {
      patients_count_info_for_statistics.counts.map((months_counts) => {
        last_year_patients =
          last_year_patients + months_counts.patients_per_month;
        if ("2023-12-01" == months_counts.year_month) {
          setlast_month_patients(months_counts.patients_per_month);
        }
      });
      setlast_year_patients_state(last_year_patients);
    }
  }, [patients_count_info_for_statistics]);
  // THIS API IS FOR GETTING DEPARTMEN BEDS INFORMATON FOR STATISTICS FOR INFORMATION CARDS
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/department-beds/" + departmentname02
      )
      .then((res) => {
        setdepartment_beds_info(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [departmentname02]);

  // THIS API IS FOR GETTING TOTAL PATIENTS COUNT TREATED BY THIS INDIVIDUAL DEPARTMENT LAST YEAR PATIENTS AND LAST MONTH PATIENTS
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/patients-information/" +
          departmentname02
      )
      .then((res) => {
        setpatients_count_info_for_statistics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [departmentname02]);

  let patients_admission_obj = {};
  useEffect(() => {
    let total_beds = department_beds_info.total_beds;
    patients_admission_obj = {
      department_name: departmentname,
      total_beds: total_beds,
    };
  }, [department_beds_info]);
  // THIS API IS FOR NEW REFERRED TO ADMISSION PATIENTS
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/referred-to-admission/" +
          departmentname02
      )
      .then((res) => {
        setreferred_to_admission(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [departmentname02]);

  const path_for_rec = matchPath(
    "/rec-hms/rec-departments/:departmentname",
    location.pathname
  );
  const path_for_allikhwa = matchPath(
    "/all'ikhwa-management-system/departments/:departmentname",
    location.pathname
  );
  return (
    <>
      <div className="dashboard_top">
        {/* // THIS LOCATION.PATHNAME = "/REC-HMS..." WILL NOT WORK BECAUSE THIS 'REC-HMS/...' WILL BE TREATED AS A STRING WHILE HERE DEPARTMENT NAME IS DYNAMIC */}
        {/* {location.pathname ===  
          "/all'ikhwa-management-system/departments/:departmentname" ||
        location.pathname === "/rec-hms/rec-departments/:departmentname" ? ( */}
        {path_for_allikhwa && (
          <div className="dashboard_employee_card">
            <span className="dashboard_employee_card_num">
              {referred_to_admission ? referred_to_admission : 0}
            </span>
            <span
              className="dashboard_employee_card_name"
              style={{ fontSize: "15px" }}
            >
              <Link
                className="linkk"
                style={{ color: "#fe4200" }}
                to={`${location.pathname}/rec-patients-admission`}
                state={
                  departmentname && {
                    department_name: departmentname,
                    total_beds: department_beds_info.total_beds,
                  }
                }
              >
                Patients Admission
              </Link>
            </span>
            <span className="dashboard_employee_card_icon">
              <MdControlPoint />
            </span>
          </div>
        )}
        {path_for_rec && (
          <div className="dashboard_employee_card">
            <span className="dashboard_employee_card_num">
              {referred_to_admission ? referred_to_admission : 0}
            </span>
            <span
              className="dashboard_employee_card_name"
              style={{ fontSize: "15px" }}
            >
              <Link
                className="linkk"
                style={{ color: "#fe4200" }}
                to={`${location.pathname}/rec-patients-admission`}
                state={
                  departmentname && {
                    department_name: departmentname,
                    total_beds: department_beds_info.total_beds,
                  }
                }
              >
                Patients Admission
              </Link>
            </span>
            <span className="dashboard_employee_card_icon">
              <MdControlPoint />
            </span>
          </div>
        )}
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {patients_count_info_for_statistics &&
              patients_count_info_for_statistics.total_treated_patients}
          </span>
          <span
            className="dashboard_employee_card_name"
            style={{ fontSize: "15px" }}
          >
            Total Treated Patients
          </span>
          <span className="dashboard_employee_card_icon">
            <BsPersonFillExclamation />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {last_month_patients ? last_month_patients : 0}
          </span>
          <span className="dashboard_employee_card_name">
            Last Month Patients
          </span>
          <span className="dashboard_employee_card_icon">
            <BsPersonFillExclamation />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {last_year_patients_state && last_year_patients_state}
          </span>
          <span className="dashboard_employee_card_name">
            {" "}
            Last Year Patients
          </span>
          <span className="dashboard_employee_card_icon">
            <BsPersonFillExclamation />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num"></span>
          <span className="dashboard_employee_card_name">
            <Link
              to={location.pathname + "/department-doctors"}
              // to={"department-doctors"}
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
              to={location.pathname + "/department-nurses"}
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
              to={location.pathname + "/department-beds"}
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
              to={location.pathname + "/department-beds"}
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
              to={location.pathname + "/department-beds"}
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

export default InformationCards;
