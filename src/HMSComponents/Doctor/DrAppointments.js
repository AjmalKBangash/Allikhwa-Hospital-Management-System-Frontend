import "./DrAppointments.css";
import { useEffect, useState } from "react";
// import { employee_loggedin } from "../../Store/Store";
import { useSelector } from "react-redux";
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
  const [uuids_for_appointments, setuuids_for_appointments] = useState();
  const [rerendertwo_axios_gets, setrerendertwo_axios_gets] = useState(false);
  const employee_loggedin_var = useSelector((state) => state.employee_loggedin);

  // FETCHING DATA FROM SERVER OF APPOINTMENTS MADE BY THE CURRENT DOCTOR
  useEffect(() => {
    axios
      .get(
        "allikhwa-hms/uuids-for-appointments/" +
          employee_loggedin_var.employee_name
      )
      .then((res) => {
        setuuids_for_appointments(res.data);
        setrerendertwo_axios_gets(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rerendertwo_axios_gets, rerendertwo_axios_gets]);

  useEffect(() => {
    if (uuids_for_appointments) {
      try {
        const fetchPatients = async () => {
          const responses = await Promise.all(
            uuids_for_appointments.map((uuid) => {
              return axios.get("allikhwa-hms/patients-list/", { params: uuid });
            })
          );

          const patients = responses.map((patient) => patient.data);
          const arrayOfObjects = [].concat(...patients);
          setPatientData(arrayOfObjects);
        };

        fetchPatients();
      } catch (error) {
        console.log(error);
      }
    }
  }, [uuids_for_appointments]);

  // useEffect(() => {
  //   // It is already implemented just above which is more concise while handling errors on ly in catch block after all data has been fetched
  //   Promise.all(
  //     uuids_for_appointments.map((uuid) => {
  //       return axios.get("http://localhost:8000/allikhwa-hms/patients-list/", {
  //         params: uuid,
  //       });
  //     })
  //   )
  //     .then((responses) => {
  //       const patients = responses.map((patient) => patient.data);
  //       console.log(patients);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // );
  // }, []);

  useEffect(() => {
    {
      prescription_from_appointments &&
        axios
          .post("allikhwa-hms/uuids-for-prescriptions/", {
            ...prescription_from_appointments,
          })
          .then((res) => {
            setprescription_from_appointments(false);
          })
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
            "allikhwa-hms/uuids-for-appointments-deletion/" +
              deletion_for_appointments
          )
          .then((res) => {
            setrerendertwo_axios_gets(true);
            setdeletion_for_appointments(false);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [deletion_for_appointments]);
  useEffect(() => {
    {
      rejected_reception_from_appointments &&
        axios
          .post("allikhwa-hms/uuids-for-rejected-appointments/", {
            // the new patients data model in databse(server) will be for newly patients which will be handled by receptionists
            ...rejected_reception_from_appointments, //here i should also pass the doctor name to rejectedappointments database table Noo The doctor name is already added by the receptionist so need to add dr which is already in the appointment data table
          })
          .then((res) => {
            setrejected_reception_from_appointments(false);
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
                    <td>{drdashboard_showPatient_Details.patient_UID}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td> {drdashboard_showPatient_Details.patient_name}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{drdashboard_showPatient_Details.patient_age}</td>
                  </tr>
                  <tr>
                    <td>Last Appointment Date</td>
                    <td>
                      {drdashboard_showPatient_Details.patient_eappointmentdate}
                    </td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>{drdashboard_showPatient_Details.patient_contact}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td> {drdashboard_showPatient_Details.patient_city}</td>
                  </tr>
                  <tr>
                    <td>Patient Problem</td>
                    <td> {drdashboard_showPatient_Details.patient_problem}</td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>
                      {drdashboard_showPatient_Details.patient_department}
                    </td>
                  </tr>
                  <tr>
                    <td>Admitted Status</td>
                    {/* <td>{drdashboard_showPatient_Details.patient_admitted_status}</td> */}
                    <td>admitted_status</td>
                  </tr>
                  <tr>
                    <td>Bed No</td>
                    {/* <td>{drdashboard_showPatient_Details.bed_no}</td> */}
                    <td></td>
                  </tr>
                  {/* <tr> depricated
                    <td>Patient Doctor</td>
                    <td>{drdashboard_showPatient_Details.patient_doctor}</td>
                  </tr> */}
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
                patientData.map(
                  (patdet, index) => {
                    // return (
                    // <div key={index}>
                    // {
                    // patientData02.map((patdet, id) => {
                    return (
                      <tr key={index}>
                        <td key={index + 1}>{patdet.patient_name}</td>
                        <td key={index + 2}>{patdet.patient_age}</td>
                        <td key={index + 3}>
                          {patdet.patient_eappointmentdate}
                        </td>
                        <td key={index + 4}>{patdet.patient_city}</td>
                        {/* <td>{patdet.admitted_status}</td> */}
                        <td key={index + 5}>admitted_status</td>

                        <td key={index + 6}>
                          <span
                            style={{
                              fontSize: "25px",
                              color: "green",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              const result = window.confirm(
                                "Are you sure you want to send the patient to Prescription?"
                              );
                              if (result) {
                                let {
                                  patient_UID,
                                  // patient_doctor,
                                  patient_eappointmentdate,
                                } = patdet;
                                setprescription_from_appointments({
                                  patient_UID: patient_UID,
                                  patient_doctor: "Ajmal Bangash", // later it will be transformed to doctor in which he is
                                  patient_eappointmentdate:
                                    patient_eappointmentdate,
                                });
                                setdeletion_for_appointments(
                                  patdet.patient_UID
                                );
                              }
                            }}
                          >
                            <AiFillCheckCircle />
                          </span>
                        </td>
                        <td key={index + 7}>
                          <span
                            style={{
                              fontSize: "25px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              const result = window.confirm(
                                "Are you sure you want to reject the Appointment?"
                              );
                              if (result) {
                                setrejected_reception_from_appointments(patdet);
                                setdeletion_for_appointments(
                                  patdet.patient_UID
                                );
                              }
                            }}
                          >
                            <AiFillCloseCircle />
                          </span>
                        </td>
                        <td
                          key={index + 8}
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
                    // });
                  }
                  //  </div>
                )
              ) : (
                // })
                <td>
                  {" "}
                  <h6>Loading ...</h6>
                </td>
              )}
            </tbody>
          </table>
          {/* {patientData && patientData.map((patientData02, index) => {
            return <div>{patientData02.map((patient, index) => {})}</div>;
          })} */}
        </div>
      </div>
    </>
  );
}
export default DrAppointments;
