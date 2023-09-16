import "./DrAppointments.css";
import { useEffect, useState } from "react";
import axios from "axios";

// Icons
// import { BsPersonFillExclamation } from "react-icons/bs";
// import { FaHandHoldingMedical } from "react-icons/fa";
// import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdDetails } from "react-icons/md";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";

function DrAppointments() {
  const [drdashboard_showPatient_Details, setdrdashboard_showPatient_Details] =
    useState(false);
  const [patientData, setPatientData] = useState();
  const [prescription_from_appointments, setprescription_from_appointments] =
    useState(null);
  const [deletion_for_appointments, setdeletion_for_appointments] =
    useState(null);
  const [
    rejected_reception_from_appointments,
    setrejected_reception_from_appointments,
  ] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3100/appointments?doctor=DrHassan")
      .then((res) => {
        // console.log(res.data);
        setPatientData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deletion_for_appointments]);
  useEffect(() => {
    {
      prescription_from_appointments &&
        axios
          .post("http://localhost:3100/prescriptions", {
            ...prescription_from_appointments,
          })
          // .then((res) => {
          // console.log(res.data);
          // setPatientData(res.data);
          // })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [prescription_from_appointments]);
  useEffect(() => {
    {
      deletion_for_appointments &&
        axios
          .delete(
            "http://localhost:3100/appointments/?PID=" +
              deletion_for_appointments
          )
          .then((res) => {
            console.log(res.data);
            console.log(deletion_for_appointments);
          })
          .catch((error) => {
            console.log(error);
            console.log(deletion_for_appointments);
          });
    }
  }, [deletion_for_appointments]);
  useEffect(() => {
    {
      rejected_reception_from_appointments &&
        axios
          .post("http://localhost:3100/rejectedappointments", {
            // the new patients data model in databse(server) will be for newly patients which will be handled by receptionists
            ...rejected_reception_from_appointments, //here i should also pass the doctor name to rejectedappointments database table Noo The doctor name is already added by the receptionist so need to add dr which is already in the appointment data table
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [rejected_reception_from_appointments]);
  return (
    <>
      {/* details  */}
      <div>
        <h2 className="fillfreebeds_h2">TODAY APPOINTMENTS </h2>
        {drdashboard_showPatient_Details && (
          <div
            style={{
              width: "75%",
              position: "relative",
              margin: "0 auto",
              padding: "10px",
              boxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
              webkitboxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
              mozBoxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
            }}
          >
            <span>
              <h2 className="fillfreebeds_h2" style={{ width: "125px" }}>
                PATIENT DETAILS
              </h2>
              <h2
                className="fillfreebeds_h2"
                style={{
                  position: "absolute",
                  top: "1%",
                  right: "3%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setdrdashboard_showPatient_Details(false);
                }}
              >
                &#10060;
              </h2>
            </span>
            <div
              className="col2indocdetails"
              style={{ margin: "30px auto 30px auto", width: "95%" }}
            >
              <table className="employee_GeneratedTable">
                <tbody>
                  {/* <tr>
                  <td>
                    <h2 className="fillfreebeds_h2" style={{ width: "125px" }}>
                      PATIENT DETAILS
                    </h2>
                  </td>
                  <td>
                    <button
                      className="admin_buttons_add_update_from_add_update_form"
                      onClick={() => {
                        setdrdashboard_showPatient_Details(false);
                      }}
                      style={{
                        margin: " 0 30%",
                        backgroundColor: "red",
                      }}
                    >
                      CLOSE DETAILS
                    </button>
                  </td>
                </tr> */}
                  {/* {patientDataDetails ? (
                  <> */}
                  <tr>
                    <td>PID</td>
                    <td>{drdashboard_showPatient_Details.PID}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td> {drdashboard_showPatient_Details.name}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{drdashboard_showPatient_Details.age}</td>
                  </tr>
                  <tr>
                    <td>Last Appointment Date</td>
                    <td>{drdashboard_showPatient_Details.date}</td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>{drdashboard_showPatient_Details.contact}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td> {drdashboard_showPatient_Details.city}</td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>{drdashboard_showPatient_Details.department}</td>
                  </tr>
                  <tr>
                    <td>Admitted Status</td>
                    <td>{drdashboard_showPatient_Details.admitted_status}</td>
                  </tr>
                  <tr>
                    <td>Bed No</td>
                    <td>{drdashboard_showPatient_Details.bed_no}</td>
                  </tr>
                  <tr>
                    <td>Patient Doctor</td>
                    <td>{drdashboard_showPatient_Details.doctor}</td>
                  </tr>
                  <tr>
                    <td>Medicine</td>
                    <td>{drdashboard_showPatient_Details.medicine}</td>
                  </tr>
                  <tr>
                    <td>Instructions</td>
                    <td>{drdashboard_showPatient_Details.instructions}</td>
                  </tr>
                  {/* </>
                ) : (
                  <h6>Loading ...</h6>
                )} */}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="drappointments_patient_details">
        <div className="drappointments_patient_list">
          {" "}
          <table class="patient_GeneratedTable_details">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Date</th>
                <th>City</th>
                <th>Admitted Status</th>
                <th>Approve</th>
                <th>Reject</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {patientData ? (
                patientData.map((patdet, id) => {
                  return (
                    <tr key={id}>
                      <td>{patdet.name}</td>
                      <td>{patdet.age}</td>
                      <td>{patdet.date}</td>
                      <td>{patdet.city}</td>
                      <td>{patdet.admitted_status}</td>

                      <td>
                        <span
                          style={{
                            fontSize: "25px",
                            color: "green",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setprescription_from_appointments(patdet);
                            setdeletion_for_appointments(patdet.PID);
                            console.log("clicked approved");
                          }}
                        >
                          <AiFillCheckCircle />
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span
                          style={{
                            fontSize: "25px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setrejected_reception_from_appointments(patdet);
                            setdeletion_for_appointments(patdet.PID);
                          }}
                        >
                          <AiFillCloseCircle />
                        </span>
                      </td>
                      <td
                        onClick={() => {
                          // PatientDetailsFun(patdet);
                          setdrdashboard_showPatient_Details(patdet);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        <MdDetails className="patient_details_edit_icon" />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h6>Loading ...</h6>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default DrAppointments;
