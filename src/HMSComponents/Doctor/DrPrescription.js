import "./DrPrescription.css";
import SuccessPopUp from "/home/ajay/Desktop/FYP/allikhwa/src/ForAll/SuccessPopUp";
import FailurePopUp from "/home/ajay/Desktop/FYP/allikhwa/src/ForAll/FailurePopUp";
import React from "react";
import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  cd_open_close,
  cd_yess_no,
  failurepopup,
  successpopup,
  prescription_show_patient_detail_rest_pres_form,
  re_render_presc_upper_component,
  show_lab_test_form,
} from "../../Store/Store";

// icons
import { MdDetails } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaUserDoctor, FaPrescription } from "react-icons/fa6";
import { setNestedObjectValues } from "formik";

function DrPrescription() {
  const [patientData, setPatientData] = useState();
  const [drdashboard_showPatient_Details, setdrdashboard_showPatient_Details] =
    useState();
  const [go_to_prescription_state, setgo_to_prescription_state] = useState();
  const [waiting_patients_data, setwaiting_patients_data] = useState();
  const [waiting_list_deletion_work, setwaiting_list_deletion_work] =
    useState(false);
  const [data_for_patients_fetching, setData_for_patients_fetching] =
    useState();
  const [data_for_patients_fetching02, setData_for_patients_fetching02] =
    useState();
  const [data_of_patient_appointments, setdata_of_patient_appointments] =
    useState(false);
  const [data_of_patient_labtests, setdata_of_patient_labtests] =
    useState(false);
  const [isTriangleRotated, setIsTriangleRotated] = useState(false);
  const [show_appointments_labtest, set_show_appointments_labtest] =
    useState(true);

  // const [
  //   deletion_from_prescription_data_model,
  //   setdeletion_from_prescription_data_model,
  // ] = useState();
  const presc_ref_for_printing_component = useRef(null);
  const presc_ref_for_Rx_scrolltoview = useRef(null);
  const detail_column_patient_list = useRef();
  const re_render_presc_upper_component_ver = useSelector(
    (state) => state.re_render_presc_upper_component
  );
  const dispatch = useDispatch();
  //  FUNCTION FOR TRIANGLE RORTATION
  const handleTriangleRotation = () => {
    setIsTriangleRotated(!isTriangleRotated);
  };
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/uuids-for-prescriptions/?patient_doctor=Ajmal Bangash"
      )
      .then((res) => {
        // console.log(res.data);
        setData_for_patients_fetching(res.data);
        // setPatientData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [re_render_presc_upper_component_ver]);

  useEffect(() => {
    // we will fetch patient on the basis of UID and DOCTOR name but we will fetch patients on the basis of only patient_UID because it is unique and we only need it
    if (data_for_patients_fetching) {
      try {
        const fetchPatients = async () => {
          const responses = await Promise.all(
            data_for_patients_fetching.map((uuid) => {
              return axios.get(
                "http://localhost:8000/allikhwa-hms/patients/" +
                  uuid.patient_UID
                // { params: uuid }
              );
            })
          );

          const patients = responses.map((patient) => patient.data);
          const arrayOfObjects = [].concat(...patients);
          // console.log(arrayOfObjects);
          setPatientData(arrayOfObjects);
          // setrerendertwo_axios_gets(false);
        };

        fetchPatients();
      } catch (error) {
        console.log(error);
      } // rerendertwo_axios_gets
    }
  }, [data_for_patients_fetching]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/waiting-patients-of-lab/Ajmal Bangash"
      )
      .then((res) => {
        setData_for_patients_fetching02(res.data);
        // setwaiting_patients_data(res.data);
        // dispatch(prescription_show_patient_detail_rest_pres_form(false));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    // we will fetch patient on the basis of UID and DOCTOR name but we will fetch patients on the basis of only patient_UID because it is unique and we only need it
    if (data_for_patients_fetching02) {
      try {
        const fetchPatients = async () => {
          const responses = await Promise.all(
            data_for_patients_fetching02.map((uuid) => {
              return axios.get(
                "http://localhost:8000/allikhwa-hms/patients/" +
                  uuid.patient_UID
                // { params: uuid }
              );
            })
          );
          const patients = responses.map((patient) => patient.data);
          const arrayOfObjects = [].concat(...patients);
          setwaiting_patients_data(arrayOfObjects);
        };

        fetchPatients();
      } catch (error) {
        console.log(error);
      } // rerendertwo_axios_gets
    }
  }, [data_for_patients_fetching02]);

  // PATIENT APPOINTMENT
  useEffect(() => {
    if (drdashboard_showPatient_Details) {
      axios
        .get(
          "http://localhost:8000/allikhwa-hms/appointments/" +
            drdashboard_showPatient_Details.PID
        )
        .then((res) => {
          setdata_of_patient_appointments(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [drdashboard_showPatient_Details]);
  // PATIENT LAB TESTS
  useEffect(() => {
    if (drdashboard_showPatient_Details) {
      axios
        .get(
          "http://localhost:8000/allikhwa-hms/patient-lab-tests/" +
            drdashboard_showPatient_Details.PID
        )
        .then((res) => {
          setdata_of_patient_labtests(res.data);

          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [drdashboard_showPatient_Details]);
  let x = 0;
  let y = 0;
  return (
    <>
      <div>
        <h2 className="fillfreebeds_h2">PRESCRIPTION </h2>
        <div className="printing_component_prescription">
          <div>
            <Prescription
              data={waiting_list_deletion_work}
              ref={presc_ref_for_printing_component}
            />
          </div>
          {/* <button onClick={handle_print}>PRINT</button> */}
          <ReactToPrint
            trigger={() => (
              <button
                className="admin_buttons_add_update_from_add_update_form"
                style={{
                  margin: "10px 25% 20px 25%",
                  width: "50%",
                }}
              >
                PRINT THE PRESCRIPTION
              </button>
            )}
            content={() => presc_ref_for_printing_component.current}
          />
        </div>
        {drdashboard_showPatient_Details && (
          <div
            className="col2indocdetails"
            style={{ margin: "30px auto 30px auto", width: "70%" }}
            ref={detail_column_patient_list}
          >
            <table className="employee_GeneratedTable">
              <tbody>
                <tr>
                  <td>
                    <button
                      onClick={() => {
                        dispatch(
                          prescription_show_patient_detail_rest_pres_form(
                            drdashboard_showPatient_Details
                          )
                        );
                        presc_ref_for_printing_component.current?.scrollIntoView();
                      }}
                      className="admin_buttons_add_update_from_add_update_form"
                    >
                      GO TO PRESCRIPTION
                    </button>
                  </td>
                  <td>
                    <button
                      // ref={toggle_display_canceldetails_button}
                      className="admin_buttons_add_update_from_add_update_form"
                      useEffect
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
                </tr>
                {/* {patientDataDetails ? (
                  <> */}
                <tr>
                  <td>Patient ID</td>
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
                  <td>Country</td>
                  <td> {drdashboard_showPatient_Details.country}</td>
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
                  {/* <td>{drdashboard_showPatient_Details.admitted_status}</td> */}
                  <td>Admitted Status</td>
                </tr>
                <tr>
                  <td>Bed No</td>
                  {/* <td>{drdashboard_showPatient_Details.bed_no}</td> */}
                  <td>Bed No</td>
                </tr>
                <tr>
                  <td>Patient Doctor</td>
                  <td>{drdashboard_showPatient_Details.doctor}</td>
                </tr>
              </tbody>
            </table>
            {/* ******************************************************************************************************************** */}
            <div style={{ margin: "20px auto", width: "100%" }}>
              {" "}
              <h2
                style={{
                  cursor: "pointer",
                  position: "relative",
                  display: "inline",
                  marginLeft: "30%",
                }}
                className={`fillfreebeds_h2 `}
                onClick={() => {
                  handleTriangleRotation();
                  set_show_appointments_labtest(!show_appointments_labtest);
                }}
              >
                APPOINTMENTS&nbsp;&nbsp;
                <span
                  style={{
                    top: "33.333%",
                    // right: ''
                    position: "absolute",
                    height: "0",
                    width: "0",
                    borderRight: "7px solid transparent",
                    borderLeft: "7px solid transparent",
                    borderBottom: "12px solid #fe4200",
                  }}
                  className={` ${
                    isTriangleRotated ? "rotate-triangle" : "rotate-triangle02"
                  }`}
                ></span>
                &nbsp;&nbsp;&nbsp;
              </h2>
              <h2
                style={{
                  cursor: "pointer",
                  position: "relative",
                  display: "inline",
                  marginRight: "30%",
                  marginLeft: "3%",
                }}
                className="fillfreebeds_h2"
                onClick={() => {
                  handleTriangleRotation();
                  set_show_appointments_labtest(!show_appointments_labtest);
                }}
              >
                LAB TESTS&nbsp;&nbsp;
                <span
                  style={{
                    top: "33.333%",
                    // right: ''
                    position: "absolute",
                    height: "0",
                    width: "0",
                    borderRight: "7px solid transparent",
                    borderLeft: "7px solid transparent",
                    borderBottom: "12px solid #fe4200",
                  }}
                  className={` ${
                    isTriangleRotated ? "rotate-triangle02" : "rotate-triangle"
                  }`}
                ></span>
                &nbsp;&nbsp;&nbsp;
              </h2>
            </div>
            {show_appointments_labtest &&
            data_of_patient_appointments.length > 0 ? (
              <div
                className="col2indocdetails"
                style={{
                  width: "75%",
                  position: "relative",
                  margin: "30px auto",
                  padding: "10px",
                  boxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                  webkitboxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                  mozBoxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                }}
              >
                {data_of_patient_appointments.map((appointment, id) => {
                  return (
                    <>
                      <span>
                        <h2 className="fillfreebeds_h2">
                          {" "}
                          <span style={{ color: "#fe4200" }}>
                            {drdashboard_showPatient_Details.name.toUpperCase()}
                          </span>{" "}
                          APPOINTMENT NO {(x = x + 1)}
                        </h2>
                      </span>
                      <table className="employee_GeneratedTable" key={id}>
                        <tbody key={id + 1}>
                          <tr>
                            <td>Family Member</td>
                            <td> {appointment.patient_familymem}</td>
                          </tr>
                          <tr>
                            <td>Appointment Date</td>
                            <td>{appointment.patient_appointmentdate}</td>
                          </tr>
                          <tr>
                            <td>Blood Pressure</td>
                            <td>{appointment.patient_bloodpressure}</td>
                          </tr>
                          <tr>
                            <td>Diabetes</td>
                            <td>{appointment.patient_diabetes}</td>
                          </tr>
                          <tr>
                            <td>My Problem</td>
                            <td> {appointment.patient_disease}</td>
                          </tr>
                          <tr>
                            <td>Instructions by Doctor</td>
                            <td>{appointment.patient_instructions}</td>
                          </tr>
                          <tr>
                            <td>Medicines</td>
                            <td> {appointment.patient_medicine}</td>
                          </tr>
                          <tr>
                            <td>Dosage Frequency</td>
                            <td> {appointment.patient_dosagefrequency}</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  );
                })}
              </div>
            ) : (
              // <h2 className="fillfreebeds_h2">NO APPOINTMENTS</h2>
              ""
            )}
            {/* ****************************************************************************************************************************** */}
            {!show_appointments_labtest &&
            data_of_patient_labtests.length > 0 ? (
              <div
                className="col2indocdetails"
                style={{
                  width: "75%",
                  position: "relative",
                  margin: "30px auto",
                  padding: "10px",
                  boxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                  webkitboxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                  mozBoxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                }}
              >
                {data_of_patient_labtests.map((test, id) => {
                  return (
                    <>
                      <span>
                        <h2 className="fillfreebeds_h2">
                          {" "}
                          <span style={{ color: "#fe4200" }}>
                            {drdashboard_showPatient_Details.name.toUpperCase()}
                          </span>{" "}
                          TEST NO {(y = y + 1)}
                        </h2>
                      </span>
                      <table className="employee_GeneratedTable" key={id}>
                        <tbody key={id + 1}>
                          <tr>
                            <td>Test Date</td>
                            <td> {test.patient_testdate}</td>
                          </tr>
                          <tr>
                            <td>Test Time</td>
                            <td> {test.patient_testtime}</td>
                          </tr>
                          <tr>
                            <td>Patients Tests</td>
                            <td>{test.patient_tests}</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  );
                })}
              </div>
            ) : (
              // <h2 className="fillfreebeds_h2">NO LAB TESTS</h2>
              ""
            )}
            {/* ********************************************************************************************************* */}
          </div>
        )}
      </div>
      <div className="drappointments_patient_details">
        <h2 className="fillfreebeds_h2">CURRENT PATIENTS LIST </h2>
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
                <th>View</th>
                {/* <th>Done</th> */}
              </tr>
            </thead>
            <tbody>
              {patientData ? (
                patientData.map((patdet, id) => {
                  return (
                    <tr key={id}>
                      <td>{patdet.patient_name}</td>
                      <td>{patdet.patient_age}</td>
                      <td>{patdet.patient_eappointmentdate}</td>
                      <td>{patdet.patient_city}</td>
                      {/* <td>{patdet.admitted_status}</td> */}
                      <td>admitted status</td>
                      <td
                        onClick={() => {
                          let {
                            patient_UID,
                            patient_name,
                            patient_age,
                            patient_eappointmentdate,
                            patient_city,
                            patient_country,
                            patient_doctor,
                            patient_contact,
                            patient_department,
                          } = patdet;
                          setdrdashboard_showPatient_Details({
                            PID: patient_UID,
                            name: patient_name,
                            age: patient_age,
                            date: patient_eappointmentdate,
                            contact: patient_contact,
                            city: patient_city,
                            country: patient_country,
                            department: patient_department,
                            doctor: patient_doctor,
                          });
                          setwaiting_list_deletion_work(false);
                          detail_column_patient_list.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        <MdDetails className="patient_details_edit_icon" />
                      </td>

                      {/* <td
                        onClick={() => {
                          setdeletion_from_prescription_data_model(patdet.PID); //this is for deletion from prescription
                        }}
                      >
                        <AiFillCheckCircle
                          style={{
                            fontSize: "25px",
                            // margin: "0 0 0 30px",
                            color: "green",
                            cursor: "pointer",
                          }}
                        />
                      </td> */}
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
      <div className="drappointments_patient_details">
        <h2 className="fillfreebeds_h2">WAITING PATIENTS LIST (LAB TESTS) </h2>
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
                <th>View</th>
                {/* <th>Done</th> */}
              </tr>
            </thead>
            <tbody>
              {waiting_patients_data ? (
                waiting_patients_data.map((patdet, id) => {
                  return (
                    <tr key={id}>
                      <td>{patdet.patient_name}</td>
                      <td>{patdet.patient_age}</td>
                      <td>{patdet.patient_eappointmentdate}</td>
                      <td>{patdet.patient_city}</td>
                      {/* <td>{patdet.admitted_status}</td> */}
                      <td>admitted status</td>
                      <td
                        onClick={() => {
                          // setdrdashboard_showPatient_Details(patdet);
                          setdrdashboard_showPatient_Details({
                            PID: patdet.patient_UID,
                            name: patdet.patient_name,
                            age: patdet.patient_age,
                            date: patdet.patient_eappointmentdate,
                            contact: patdet.patient_contact,
                            city: patdet.patient_city,
                            country: patdet.patient_country,
                            department: patdet.patient_department,
                            doctor: patdet.patient_doctor,
                          });
                          setwaiting_list_deletion_work(true);

                          detail_column_patient_list.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        <MdDetails className="patient_details_edit_icon" />
                      </td>

                      {/* <td
                        onClick={() => {
                          setdeletion_from_prescription_data_model(patdet.PID); //this is for deletion from prescription
                        }}
                      >
                        <AiFillCheckCircle
                          style={{
                            fontSize: "25px",
                            // margin: "0 0 0 30px",
                            color: "green",
                            cursor: "pointer",
                          }}
                        />
                      </td> */}
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
export default DrPrescription;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Prescription = React.forwardRef((props, ref) => {
  const waiting_list_deletion_work = props.data;
  const [from_prescription_to_patients, setfrom_prescription_to_patients] =
    useState(false);
  const [presc_print_refer_to_admission, setpresc_print_refer_to_admission] =
    useState(false);
  const [
    submission_before_reset_will_work,
    setsubmission_before_reset_will_work,
  ] = useState(false);
  const [show_lab_test_form, setshow_lab_test_form] = useState(false);
  const [show_form_for_patient_admission, setshow_form_for_patient_admission] =
    useState(false);
  const [showpopup, setShowpopup] = useState(false);
  const [errormsg, seterrormsg] = useState(false);
  const cd_yess_no_var = useSelector((state) => state.cd_yess_no);
  const prescription_show_patient_detail_rest_pres_form_var = useSelector(
    (state) => state.prescription_show_patient_detail_rest_pres_form
  );
  const successpopup_var = useSelector((state) => state.successpopup);
  const failurepopup_var = useSelector((state) => state.failurepopup);
  const dispatch = useDispatch();

  const prescription_validation_schema = Yup.object().shape({
    // Sign Up Form Validation
    blood_pressure: Yup.string().max(120, "Must be less than 120 characters"),
    diabetes: Yup.string().max(150, "Age must be less than 150 years"),
    family_member: Yup.string().required("Family Member is Required"),
    gender: Yup.string().required("Gender is Required"),
    instructions: Yup.string().required("Instructions is Required"),
    patient_disease: Yup.string().required(
      "Patient Info about Disease is required"
    ),
    medicine: Yup.string().required("Medicine is Required!"),
    dosage_frequency: Yup.string().required(
      "Dosage and Frequency is required!"
    ),
    instructions: Yup.string().required("Instructions is required!"),
  });
  const admission_validation_schema = Yup.object().shape({
    patient_UID: Yup.string().required("Valid PatientID is required"),
    patient_department: Yup.string().required(
      "Department for Patient Admission is required"
    ),
    patient_admissiondate: Yup.date()
      .typeError("Date is required")
      .required("Patient Admission date is Required"),
  });
  const {
    setValue,
    reset,
    register,
    formState: { errors: errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(prescription_validation_schema),
  });
  const {
    setValue: setValue02,
    reset: reset02,
    register: register02,
    formState: { errors: errors02 },
    handleSubmit: handleSubmit02,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(admission_validation_schema),
  });

  function FunDoctorPrescription(data) {
    setfrom_prescription_to_patients({
      patient_bloodpressure: data.blood_pressure,
      patient_appointmentdate: data.date,
      patient_diabetes: data.diabetes,
      patient_dosagefrequency: data.dosage_frequency,
      patient_familymem: data.family_member,
      patient_gender: data.gender,
      patient_instructions: data.instructions,
      patient_medicine: data.medicine,
      patient_disease: data.patient_disease,
    });
    console.log(data);
    console.log(data.PID);
    dispatch(cd_open_close(true));
    dispatch(re_render_presc_upper_component(true));
  }

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function FunReferToAdmission(data) {
    const result = window.confirm(
      "Are you sure you want to refer this patient to Admission?"
    );
    // if (result) {
    //   setpresc_print_refer_to_admission({
    //     patient_UID: data.patient_UID,
    //     patient_department: data.patient_department,
    //     patient_admissiondate: formatDateToYYYYMMDD(data.patient_admissiondate),
    //   });
    // }
    // THISIS FOR REFERRED TO ADMISSION
    if (result) {
      setpresc_print_refer_to_admission({
        patient: data.patient_UID,
        patient_department: data.patient_department,
        patient_admissiondate: formatDateToYYYYMMDD(data.patient_admissiondate),
      });
    }

    // console.log(data);
  }

  function reset_the_prescription_formFun() {
    if (submission_before_reset_will_work && cd_yess_no_var) {
      dispatch(prescription_show_patient_detail_rest_pres_form(false));
      setsubmission_before_reset_will_work(false);
      reset();
    }
  }

  useEffect(() => {
    if (
      from_prescription_to_patients &&
      cd_yess_no_var &&
      prescription_show_patient_detail_rest_pres_form_var
    ) {
      axios
        .post("http://localhost:8000/allikhwa-hms/appointments/", {
          ...from_prescription_to_patients,
          patient: prescription_show_patient_detail_rest_pres_form_var.PID,
          doctor: "cad5aad8-bf96-48ed-8c48-e1b190ac829a",
        })
        .then((res) => {
          console.log("added succfully!");
        })
        .catch((error) => {
          console.log(error);
        });
      setsubmission_before_reset_will_work(true);
    }
  }, [from_prescription_to_patients, cd_yess_no_var]);
  useEffect(() => {
    if (
      from_prescription_to_patients &&
      cd_yess_no_var &&
      !waiting_list_deletion_work
    ) {
      //  DELETING FROM WAITING PATIENTS IS REMAINING OKAYYYYY
      axios
        .delete(
          "http://localhost:8000/allikhwa-hms/uuids-for-prescription-deletion/" +
            prescription_show_patient_detail_rest_pres_form_var.PID
        )
        .then((res) => {
          console.log(res);
          console.log(
            "useffect for uuids-for-pres deletion 2nd class inside 02"
          );
          dispatch(cd_open_close(false));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [from_prescription_to_patients, cd_yess_no_var]);
  useEffect(() => {
    if (
      from_prescription_to_patients &&
      cd_yess_no_var &&
      waiting_list_deletion_work
    ) {
      //  DELETING FROM WAITING PATIENTS IS REMAINING OKAYYYYY

      axios
        .delete(
          "http://localhost:8000/allikhwa-hms/waiting-patients-of-lab-deletion/" +
            prescription_show_patient_detail_rest_pres_form_var.PID
        )
        .then((res) => {
          console.log(res);
          console.log(
            "useffect for uuids-for-pres deletion 2nd class inside 02"
          );
          dispatch(cd_open_close(false));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [from_prescription_to_patients, cd_yess_no_var]);
  useEffect(() => {
    if (presc_print_refer_to_admission) {
      axios
        .post(
          "http://localhost:8000/allikhwa-hms/referred-to-admission/",
          presc_print_refer_to_admission // the pid has been passed to data model refferedtoadmission, now from data model we will access the patient in the prescribed department for admission
        )
        .then((res) => {
          setpresc_print_refer_to_admission(false);
          // alert("The patient is successfully admitted in the hospital,");
          setShowpopup(true);
          dispatch(successpopup(true));
        })
        .catch((error) => {
          // console.log(error);
          dispatch(failurepopup(error.response.data.patient_UID));
        });
    }
  }, [presc_print_refer_to_admission]);

  useEffect(() => {
    setValue("date", new Date().toISOString().split("T")[0]);
  }, []);
  return (
    <>
      {successpopup_var && (
        <SuccessPopUp message="Patient has been successfully admitted in the Hospital" />
      )}
      {failurepopup_var && <FailurePopUp message={failurepopup_var} />}
      <form
        onSubmit={handleSubmit(FunDoctorPrescription)}
        id="prescription_form"
      >
        <div className="prescription_top" ref={ref}>
          <div className="presc_div01">
            <div
              className="presc_first presc_1234"
              style={{ borderBottom: "2px solid #fe4200" }}
            >
              <img src={AllikhwaLogo} className="presc_allikhwa_logo" />
              <br />
              <div>
                <FaUserDoctor style={{ color: "#fe4200", margin: "2px" }} /> Dr
                Marine Khan
              </div>
              <div>
                <BsFillTelephoneFill
                  style={{ color: "#fe4200", margin: "2px" }}
                />{" "}
                0092 4483486
              </div>
              <div>
                <MdEmail style={{ color: "#fe4200", margin: "2px" }} />{" "}
                ak1489007@gmail.com
              </div>
            </div>
            <div
              className="presc_1234"
              style={{ borderBottom: "2px solid #fe4200" }}
            >
              <div>
                <h2 className="prescription_h2">DOCTOR EDUCATION</h2>
                <p></p>
              </div>
              <div>
                {" "}
                <h2 className="prescription_h2">DOCTOR EXPERIENCE </h2>
                <p></p>
              </div>
            </div>
          </div>
          <div className="presc_div01">
            <div className="presc_third presc_1234">
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <div>Name:</div>
                <div>
                  {prescription_show_patient_detail_rest_pres_form_var.name}
                </div>
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <div>Age:</div>
                <div>
                  {prescription_show_patient_detail_rest_pres_form_var.age}
                </div>
              </div>
              {/* Now appointment and medication from the doctor               */}
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label htmlFor="gender" className="profile_lanel_input_label">
                  Salect Gender:
                </label>
                <select
                  type="select"
                  id="gender"
                  name="gender"
                  form="prescription_form"
                  {...register("gender")}
                  style={{
                    width: "fit-content",
                    height: "30px",
                    fontSize: "15px",
                    border: "none",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.103)",
                    backgroundColor: "white",
                  }}
                >
                  <option value={""} disabled selected>
                    ..select an option..
                  </option>
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"other"}>Other</option>
                </select>
                <p className="pForForm">{errors.gender?.message}</p>
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label htmlFor="date" className="profile_lanel_input_label">
                  Date:
                </label>
                <input
                  {...register("date")}
                  id="date"
                  type="date"
                  placeholder="Enter Patient Appointment Date"
                ></input>
                <p className="pForForm">{errors.date?.message}</p>
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label
                  htmlFor="blood_pressure"
                  className="profile_lanel_input_label"
                >
                  Blood Pressure:
                </label>
                <input
                  {...register("blood_pressure")}
                  id="blood_pressure"
                  type="text"
                  placeholder="Enter Patient Blood Pressure"
                ></input>
                <p className="pForForm">{errors.blood_pressure?.message}</p>
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label htmlFor="diabetes" className="profile_lanel_input_label">
                  Diabetes:
                </label>
                <input
                  {...register("diabetes")}
                  id="diabetes"
                  type="text"
                  placeholder="Enter Patient Diabetes"
                ></input>
                <p className="pForForm">{errors.diabetes?.message}</p>
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label
                  htmlFor="family_member"
                  className="profile_lanel_input_label"
                >
                  Family Member:
                </label>
                <input
                  {...register("family_member")}
                  id="family_member"
                  type="text"
                  placeholder="Enter Patient Family Member Name"
                ></input>
                <p className="pForForm">{errors.family_member?.message}</p>
              </div>
            </div>
            <div className="presc_1234">
              <div>
                <FaPrescription
                  style={{
                    color: "#fe4200",
                    fontSize: "30px",
                    padding: "15px",
                  }}
                />
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label
                  htmlFor="patient_disease"
                  className="profile_lanel_input_label"
                >
                  Patient Disease:
                </label>
                <textarea
                  id="patient_disease"
                  name="patient_disease"
                  cols="30"
                  rows="3"
                  placeholder="Enter about patient disease"
                  {...register("patient_disease")}
                  style={{ width: "300px" }}
                ></textarea>
                <p className="pForForm">{errors.patient_disease?.message}</p>
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label htmlFor="medicine" className="profile_lanel_input_label">
                  Medicine:
                </label>
                <textarea
                  id="medicine"
                  name="medicine"
                  cols="30"
                  rows="3"
                  placeholder="Enter Medication"
                  {...register("medicine")}
                  style={{ width: "300px" }}
                ></textarea>
                <p className="pForForm">{errors.medicine?.message}</p>
              </div>

              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label
                  htmlFor="dosage_frequency"
                  className="profile_lanel_input_label"
                >
                  Dosage and Frequency:
                </label>
                <textarea
                  id="dosage_frequency"
                  name="dosage_frequency"
                  cols="30"
                  rows="3"
                  placeholder="Enter patient medication dosage and frequency"
                  {...register("dosage_frequency")}
                  style={{ width: "300px" }}
                ></textarea>
                <p className="pForForm">{errors.dosage_frequency?.message}</p>
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label
                  htmlFor="instructions"
                  className="profile_lanel_input_label"
                >
                  Instructions:
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  cols="30"
                  rows="3"
                  placeholder="Enter your Instructions for patient to follow"
                  {...register("instructions")}
                  style={{ width: "300px" }}
                ></textarea>
                <p className="pForForm">{errors.instructions?.message}</p>
              </div>
            </div>
          </div>
        </div>
        {!submission_before_reset_will_work && !cd_yess_no_var && (
          <p
            style={{
              color: "red",
              fontSize: "12px",
              margin: "10px auto",
              padding: "10px",
              width: "fit-content",
            }}
          >
            *SUBMIT AND PRINT THE FORM BEFORE RESETTING!
          </p>
        )}

        <div>
          <input
            type="submit"
            // onSubmit={handle_edit_patiend_bed}
            // onClick={() => handle_edit_patiend_bed()}
            className="admin_buttons_add_update_from_add_update_form"
            value="SUBMIT THE PRESCRIPTION"
            style={{
              margin: "10px 25% 20px 25%",
              width: "50%",
            }}
          />
          <button
            type="button"
            className="admin_buttons_add_update_from_add_update_form"
            onClick={() => {
              reset_the_prescription_formFun();
            }}
            style={{
              margin: "10px 25% 20px 25%",
              width: "50%",
            }}
          >
            RESET THE PRESCRIPTION
          </button>
        </div>
      </form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          className="admin_buttons_add_update_from_add_update_form"
          style={{ display: "inline" }}
          onClick={() => {
            setshow_lab_test_form(!show_lab_test_form);
          }}
        >
          REFER TO LAB TEST
        </button>
        <button
          className="admin_buttons_add_update_from_add_update_form"
          onClick={() => {
            setshow_form_for_patient_admission(
              !show_form_for_patient_admission
            );
            setValue02(
              "patient_UID",
              prescription_show_patient_detail_rest_pres_form_var.PID
            );
            setValue02(
              "patient_department",
              prescription_show_patient_detail_rest_pres_form_var.department
            );
          }}
        >
          REFER TO ADMISSION
        </button>
      </div>
      {show_lab_test_form && (
        <Test_from_dr_to_lab data={waiting_list_deletion_work} />
      )}
      {show_form_for_patient_admission && (
        <form
          onSubmit={handleSubmit02(FunReferToAdmission)}
          style={{
            borderRadius: "8px",
            margin: "10px auto 10px auto",
            padding: "20px",
            boxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
            webkitboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
            mozboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
            boxSizing: "border-box",
            width: "70%",
          }}
        >
          <h2 className="fillfreebeds_h2">
            SUBMIT THE FORM FOR PATIENT ADMISSION
          </h2>

          <div className="profile_label_input prescription_editing_to_form_of_patient">
            <label htmlFor="patient_UID" className="profile_lanel_input_label">
              Patient ID:
            </label>
            <input
              {...register02("patient_UID")}
              id="patient_UID"
              type="text"
              placeholder="Enter Patient ID"
            ></input>
            <p className="pForForm">{errors02.patient_UID?.message}</p>
          </div>
          <div className="profile_label_input prescription_editing_to_form_of_patient">
            <label
              htmlFor="patient_department"
              className="profile_lanel_input_label"
            >
              Patient Department:
            </label>
            <input
              {...register02("patient_department")}
              id="patient_department"
              type="text"
              placeholder="Enter Patient Department"
            ></input>
            <p className="pForForm">{errors02.patient_department?.message}</p>
          </div>
          <div className="profile_label_input prescription_editing_to_form_of_patient">
            <label
              htmlFor="patient_admissiondate"
              className="profile_lanel_input_label"
            >
              Patient Admission Date:
            </label>
            <input
              {...register02("patient_admissiondate")}
              id="patient_admissiondate"
              name="patient_admissiondate"
              type="date"
              placeholder="Enter Patient Admission Date"
            ></input>

            <p className="pForForm">
              {errors02.patient_admissiondate?.message}
            </p>
          </div>
          <div>
            {errormsg && (
              <div
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {errormsg}{" "}
              </div>
            )}
            <input
              type="submit"
              className="admin_buttons_add_update_from_add_update_form"
              value="SUBMIT"
              style={{
                margin: "10px 25% 20px 25%",
                width: "50%",
              }}
            />
          </div>
        </form>
      )}
    </>
  );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
function Test_from_dr_to_lab(props) {
  const waiting_list_deletion_work = props.data;

  const [data_for_lab, setdata_for_lab] = useState();
  const [showpopup, setshowpopup] = useState(false);
  const prescription_show_patient_detail_rest_pres_form_var = useSelector(
    (state) => state.prescription_show_patient_detail_rest_pres_form
  );
  const successpopup_var = useSelector((state) => state.successpopup);
  const failurepopup_var = useSelector((state) => state.failurepopup);
  const dispatch = useDispatch();
  const lab_test_validation_schema = Yup.object().shape({
    patient_department: Yup.string().required(
      "Department for Patient Lab test is required"
    ),
  });
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      tests: [{ test_name: "", test_discription: "" }],
    },
    resolver: yupResolver(lab_test_validation_schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tests",
  });
  // console.log(prescription_show_patient_detail_rest_pres_form_var);
  function handle_lab_testFun(data) {
    let listt = [];
    data.tests.map((test) => {
      listt.push(test.test_name, test.test_discription);
    });
    const result = listt.join(" > ");
    setdata_for_lab({
      patient_latercheckupdescription: data.later_checkup_discription,
      patient_tests: result,
      patient_department: data.patient_department,
    });
  }

  useEffect(() => {
    if (data_for_lab && prescription_show_patient_detail_rest_pres_form_var) {
      //the patient will be uploaded to labnewtests for lab technician and it is also uploaded to waiting patients for tests for this doctor and it is also deleted from the prescription data model, after this the lab technician will update the patient data table from lab while uploading(updating) test results
      axios
        .post("http://localhost:8000/allikhwa-hms/uuids-for-lab-tests/", {
          ...data_for_lab,
          patient_UID: prescription_show_patient_detail_rest_pres_form_var.PID,
          patient_name:
            prescription_show_patient_detail_rest_pres_form_var.name,
          // patient_department:
          //   prescription_show_patient_detail_rest_pres_form_var.department,
        })
        .then((res) => {
          dispatch(failurepopup(true));
        })
        .catch((error) => {
          dispatch(successpopup(error.response.data.patient_UID[0]));
        });
    }
  }, [data_for_lab]);

  useEffect(() => {
    if (
      data_for_lab &&
      prescription_show_patient_detail_rest_pres_form_var &&
      !waiting_list_deletion_work
    ) {
      axios
        // .delete(
        .post(
          // it should be be post method not delete because we will have to post it to waiting patients because and delete it from prescription uuids because mow the patient is passsed to the lab technician
          "http://localhost:8000/allikhwa-hms/waiting-patients-of-lab/",
          {
            // "http://localhost:3100/waitingpatientsforlabtests/?PID+" +
            patient_UID:
              prescription_show_patient_detail_rest_pres_form_var.PID,
            patient_doctor:
              // prescription_show_patient_detail_rest_pres_form_var.doctor,
              "Ajmal Bangash",
            patient_eappointmentdate:
              prescription_show_patient_detail_rest_pres_form_var.date,
          }
        )
        .then((res) => {
          dispatch(prescription_show_patient_detail_rest_pres_form(false));
          setdata_for_lab(false); // added now
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data_for_lab]);
  useEffect(() => {
    if (
      data_for_lab &&
      prescription_show_patient_detail_rest_pres_form_var &&
      !waiting_list_deletion_work
    ) {
      axios
        .delete(
          "http://localhost:8000/allikhwa-hms/uuids-for-prescription-deletion/" +
            // "http://localhost:3100/prescriptions/?PID=" +
            prescription_show_patient_detail_rest_pres_form_var.PID
        )
        .then((res) => {
          // dispatch(prescription_show_patient_detail_rest_pres_form_var(false));
          setdata_for_lab(false); // added now
        })
        .catch((error) => {
          console.log(error);
        });
      reset();
    }
  }, [data_for_lab]);
  return (
    <>
      {failurepopup_var && (
        <SuccessPopUp message="Patient has successfully referred to Lab Technician" />
      )}
      {successpopup_var && <FailurePopUp message={successpopup} />}
      <form
        onSubmit={handleSubmit(handle_lab_testFun)}
        style={{
          borderRadius: "8px",
          margin: "10px auto 10px auto",
          padding: "20px",
          boxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
          webkitboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
          mozboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
          boxSizing: "border-box",
          width: "70%",
        }}
        className="testFrom_presc_dr_css"
      >
        <h2 className="fillfreebeds_h2">SUBMIT THE FORM FOR LAB TECHNICIAN </h2>

        <div className="profile_label_input ">
          <label className="profile_lanel_input_label">Patient ID:</label>
          <p>{prescription_show_patient_detail_rest_pres_form_var.PID}</p>
        </div>
        <div className="profile_label_input ">
          <label className="profile_lanel_input_label">Patient Name:</label>
          <p>{prescription_show_patient_detail_rest_pres_form_var.name}</p>
        </div>
        <div className="profile_label_input ">
          <label className="profile_lanel_input_label">Patient Age:</label>
          <p>{prescription_show_patient_detail_rest_pres_form_var.age}</p>
        </div>
        {/* <div className="profile_label_input ">  depricated
          <label className="profile_lanel_input_label">Patient Doctor:</label>
          <p>{prescription_show_patient_detail_rest_pres_form_var.doctor}</p>
        </div> */}
        <div className="profile_label_input ">
          <label
            htmlFor="patient_department"
            className="profile_lanel_input_label"
          >
            Patient Department:
          </label>
          <input
            name="patient_department"
            setValue={
              prescription_show_patient_detail_rest_pres_form_var.department
            }
            {...register("patient_department")}
          />
          <p className="pForForm">{errors.patient_department?.message}</p>
        </div>
        <div className="profile_label_input ">
          <label className="profile_lanel_input_label">Date:</label>
          <input
            name="date"
            value={new Date().toISOString().split("T")[0]}
            readOnly
          />
        </div>
        <div className="profile_label_input ">
          <label className="profile_lanel_input_label">Time:</label>
          <input
            // value={new Date().toLocaleString("en-US", {
            //   timeFormat: "HH:mm:ss",
            // })}
            name="time"
            value={new Date().toLocaleTimeString()}
            readOnly
          />
        </div>
        <div className="profile_label_input ">
          <label className="profile_lanel_input_label">
            Enter Discription For Later Checkup After Lab Tests!
          </label>
          <textarea
            cols={10}
            rows={3}
            name="later_checkup_discription"
            {...register("later_checkup_discription")}
            placeholder="Enter description for later Checkup after test results!"
            style={{ height: "100px", maxWidth: "70%" }}
          ></textarea>
        </div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="profile_label_input ">
              <label className="profile_lanel_input_label">
                Enter Test Name:
              </label>
              <input
                placeholder="Enter Test Name"
                {...register(`tests.${index}.test_name`, {
                  required: "Test Name is required",
                })}
              />
            </div>
            <div className="profile_label_input ">
              <label className="profile_lanel_input_label">
                Enter Test Discription
              </label>
              <textarea
                cols={10}
                rows={3}
                name="test_discription"
                {...register(`tests.${index}.test_discription`)}
                placeholder="Enter Test Description"
              ></textarea>
            </div>
            {fields.length !== 1 && (
              <button className="pricing_button" onClick={() => remove(index)}>
                Remove the test
              </button>
            )}
            {fields.length - 1 === index && (
              <button
                className="pricing_button"
                onClick={() => append({ test_name: "", test_discription: "" })}
              >
                Add another test
              </button>
            )}
          </div>
        ))}
        <input
          type="submit"
          className="admin_buttons_add_update_from_add_update_form"
          value="SUBMIT YOUR FORM"
          style={{
            margin: "10px 25% 20px 25%",
            width: "50%",
            border: "none",
          }}
        />
      </form>
    </>
  );
}
