import LabBarChartAllikhwa from "./LabBarChartAllikhwa";
import { useEffect, useRef, useState } from "react";
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
  const [lastyear_lab_tests, setlastyear_lab_tests] = useState();
  const [allmonths, setallmonths] = useState();
  let [totaltests, settotaltests] = useState(0);
  const [lastmonthtests, setlastmonthtests] = useState(0);
  let listtt = [];
  useEffect(() => {
    let totaltests = 0;
    if (lastyear_lab_tests) {
      lastyear_lab_tests.map((months_counts, id) => {
        totaltests = totaltests + months_counts.test_count;
        if ("2023-01-01" == months_counts.year_month) {
          listtt.push({ name: "JAN", Tests: months_counts.test_count });
        } else if ("2023-02-01" == months_counts.year_month) {
          listtt.push({ name: "FEB", Tests: months_counts.test_count });
        } else if ("2023-03-01" == months_counts.year_month) {
          listtt.push({ name: "MAR", Tests: months_counts.test_count });
        } else if ("2023-04-01" == months_counts.year_month) {
          listtt.push({ name: "APR", Tests: months_counts.test_count });
        } else if ("2023-05-01" == months_counts.year_month) {
          listtt.push({ name: "MAY", Tests: months_counts.test_count });
        } else if ("2023-06-01" == months_counts.year_month) {
          listtt.push({ name: "JUN", Tests: months_counts.test_count });
        } else if ("2023-07-01" == months_counts.year_month) {
          listtt.push({ name: "JUL", Tests: months_counts.test_count });
        } else if ("2023-08-01" == months_counts.year_month) {
          listtt.push({ name: "AUG", Tests: months_counts.test_count });
        } else if ("2023-09-01" == months_counts.year_month) {
          listtt.push({ name: "SEP", Tests: months_counts.test_count });
        } else if ("2023-10-01" == months_counts.year_month) {
          listtt.push({ name: "OCT", Tests: months_counts.test_count });
        } else if ("2023-11-01" == months_counts.year_month) {
          listtt.push({ name: "NOV", Tests: months_counts.test_count });
        } else if ("2023-12-01" == months_counts.year_month) {
          listtt.push({ name: "DEC", Tests: months_counts.test_count });
          setlastmonthtests(months_counts.test_count);
        }
      });
      setallmonths(listtt);
    }
    settotaltests(totaltests);
  }, [lastyear_lab_tests]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3100/patients")
  //     .then((res) => {
  //       // console.log(res.data);
  //       setPatientData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [patientData]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/allikhwa-hms/patients-lastyear-lab-tests/")
      .then((res) => {
        setlastyear_lab_tests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="dashboard_top">
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">{totaltests}</span>
          <span
            className="dashboard_employee_card_name"
            // style={{ fontSize: "15px" }}
          >
            Total Tests
          </span>
          <span className="dashboard_employee_card_icon">
            <BsPersonFillExclamation />
          </span>
        </div>

        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">{lastmonthtests}</span>
          <span className="dashboard_employee_card_name">Last Month Tests</span>
          <span className="dashboard_employee_card_icon">
            <FaHandHoldingMedical />
          </span>
        </div>
        {/* <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name"> Today Tests</span>
          <span className="dashboard_employee_card_icon">
            <FaHandHoldingMedical />
          </span>
        </div> */}
        {/* <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">&#36;324</span>
          <span className="dashboard_employee_card_name"> Today Income </span>
          <span className="dashboard_employee_card_icon">
            <RiMoneyDollarCircleFill />
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
        <LabBarChartAllikhwa data={allmonths} />
      </div>
    </>
  );
}
export default LabDashboard;
