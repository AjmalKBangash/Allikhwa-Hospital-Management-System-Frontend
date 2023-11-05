import "./DrDashboard.css";
import BarChartAllikhwa from "../../ForAll/BarChartAllikhwa";
import { useEffect, useState } from "react";
import axios from "axios";

// Icons
import { BsPersonFillExclamation } from "react-icons/bs";
import { FaHandHoldingMedical } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdDetails } from "react-icons/md";

function DrDashboard() {
  const [drdashboard_showPatient_Details, setdrdashboard_showPatient_Details] =
    useState(false);
  const [patientData, setPatientData] = useState();
  const [total_treated_Patients, settotal_treated_Patients] = useState();
  const [last_year_ind_dr_appointments, setlast_year_ind_dr_appointments] =
    useState();
  const [
    total_last_year_appointments_by_ind_dr,
    settotal_last_year_appointments_by_ind_dr,
  ] = useState();
  const [
    total_last_month_appointments_by_ind_dr,
    settotal_last_month_appointments_by_ind_dr,
  ] = useState();

  useEffect(() => {
    let listtt = [];
    if (last_year_ind_dr_appointments) {
      last_year_ind_dr_appointments.map((each_months_appointment) => {
        if ("2023-01-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "JAN",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-02-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "FEB",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-03-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "MAR",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-04-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "APR",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-05-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "MAY",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-06-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "JUN",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-07-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "JUL",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-08-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "AUG",
            Tests: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-09-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "SEP",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-10-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "OCT",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-11-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "NOV",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
        } else if ("2023-12-01" == each_months_appointment.year_month) {
          listtt.push({
            name: "DEC",
            APPOINTMENTS: each_months_appointment.appointments_per_month,
          });
          settotal_last_month_appointments_by_ind_dr(
            each_months_appointment.appointments_per_month
          );
        }
      });
      settotal_last_year_appointments_by_ind_dr(listtt);
    }
  }, [last_year_ind_dr_appointments]);
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

  // LAST YEAR MdAirlineSeatIndividualSuiteL DOCTOR APPOINTMENTS
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/patients-lastyear-appointments/" +
          "cad5aad8-bf96-48ed-8c48-e1b190ac829a"
      )
      .then((res) => {
        setlast_year_ind_dr_appointments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // FOR TOTAL TRETAED PATIENTS BY DOCTOR
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/total-treated-patients/" +
          "cad5aad8-bf96-48ed-8c48-e1b190ac829a"
      )
      .then((res) => {
        settotal_treated_Patients(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="dashboard_top">
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {total_treated_Patients && total_treated_Patients.counts}
          </span>
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
          <span className="dashboard_employee_card_num">
            {/* &#36;    //this is dollar sign */}
            {total_last_year_appointments_by_ind_dr &&
              total_last_year_appointments_by_ind_dr.length}
          </span>
          <span className="dashboard_employee_card_name">
            {" "}
            Last Year Appointments{" "}
          </span>
          <span className="dashboard_employee_card_icon">
            <RiMoneyDollarCircleFill />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">
            {total_last_month_appointments_by_ind_dr
              ? total_last_month_appointments_by_ind_dr
              : "0"}
          </span>
          <span className="dashboard_employee_card_name">
            Last Month Appointments
          </span>
          <span className="dashboard_employee_card_icon">
            <FaHandHoldingMedical />
          </span>
        </div>
        {/* <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name">
            {" "}
            Today Appointments
          </span>
          <span className="dashboard_employee_card_icon">
            <FaHandHoldingMedical />
          </span>
        </div> */}
      </div>
      <div
        style={{
          width: "95%",
          height: "60vh",
          margin: "20px auto",
        }}
      >
        {/* {total_last_year_appointments_by_ind_dr && ( */}
        <BarChartAllikhwa data={total_last_year_appointments_by_ind_dr} />
        {/* // )} */}
      </div>
    </>
  );
}
export default DrDashboard;
