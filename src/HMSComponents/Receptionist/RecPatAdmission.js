import { useEffect, useRef, useState } from "react";
// import "./FillFreeBeds.css";
import SuccessPopUp from "../../ForAll/SuccessPopUp";
import FailurePopUp from "../../ForAll/FailurePopUp";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import Medicines from "./Medicines";
// importing icons
import { BsQuestionDiamondFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
  fillfreebeds_variable,
  successpopup,
  failurepopup,
} from "../../Store/Store";
// function medicines
import { useFieldArray } from "react-hook-form";
import { useLocation } from "react-router-dom";

function RecPatAdmission() {
  const [fillFreeBedsPatients, setfillFreeBedsPatients] = useState();
  const [fillFreeBedsPatients01, setfillFreeBedsPatients01] = useState();
  const [admitting_patients, setadmitting_patients] = useState(false);
  const [
    fillfreebeds_display_patient_details,
    setfillfreebeds_display_patient_details,
  ] = useState(false);
  const [display_edit_patient_bed_info, setdisplay_edit_patient_bed_info] =
    useState(false);
  const [deleting_referred_to_admission, setdeleting_referred_to_admission] =
    useState(false);
  const [
    rerender_get_referred_to_admission,
    setrerender_get_referred_to_admission,
  ] = useState(false);
  const [departmentValue, setDepartmentValue] = useState("");
  const fillfreebeds_close_pat_details = useRef();
  const fillfreebeds_table_details_beds = useRef();
  // const { department_name, total_beds } = useSelector(
  //   (state) => state.fillfreebeds_variable
  // );
  const successpopup_var = useSelector((state) => state.successpopup);
  const failurepopup_var = useSelector((state) => state.failurepopup);
  const dispatch = useDispatch();

  const location = useLocation();

  const { total_beds, department_name } = location.state;

  const fillfreebeds_validation_schema = Yup.object().shape({
    admitted_patient_bed_no: Yup.number()
      .typeError("Bed No is required and must be a number")
      .min(1, "Beds should not be less than one ")
      .max(total_beds, "Beds must not be greater than " + total_beds)
      .required("Bed No is Required!"),
    patient: Yup.string("PID is required").required("PID is Required"),
    admitted_patient_department: Yup.string(
      "Department should be in capital text"
    ).required("Department is required"),
    admitted_patient_contact: Yup.string()
      .max(14, "Must be 14 characters")
      .min(14, "Must be 14 characters")
      .required("Contact is Required"),
    admitted_patient_admission_date: Yup.date("Date is required")
      .typeError("Date is required")
      .min(
        new Date().toISOString().split("T")[0],
        "Date should not be less than the current Date!"
      )
      .max(
        // This date as 10 years ahead  to the current date
        // new Date().getFullYear() +
        //   10 +
        //   "-" +
        //   Number(new Date().getMonth() + 1) +
        //   "-" +
        // new Date().getDate(),
        new Date().toISOString().split("T")[0],
        "Date should not be greater than the current Date!"
      )
      .required("Date is Required"),
    admitted_patient_instructions: Yup.string().required(
      "Instructions is Required"
    ),
    admitted_patient_beds_description: Yup.string()
      .required("Description is Required")
      .min(10, "Minimum characters should be 10"),
  });

  const {
    setValue,
    control,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(fillfreebeds_validation_schema),
  });

  // Handler function for the onChange event
  const handleDepartmentChange = (event) => {
    // Update the state with the new input value
    setDepartmentValue(event.target.value);
  };
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handle_edit_patiend_bed = (data) => {
    let result = window.confirm("Are you sure you want to admit the patient");
    if (result) {
      setadmitting_patients({
        patient: data.patient,
        admitted_patient_admission_date: formatDateToYYYYMMDD(
          data.admitted_patient_admission_date
        ),
        admitted_patient_bed_no: data.admitted_patient_bed_no,
        admitted_patient_beds_description:
          data.admitted_patient_beds_description,
        admitted_patient_contact: data.admitted_patient_contact,
        admitted_patient_department: data.admitted_patient_department,
        admitted_patient_instructions: data.admitted_patient_instructions,
      });
    }
    console.log(data);
  };

  // RETRIEVEING REFERRED TO ADMISSION PATIENTS
  useEffect(() => {
    if (department_name) {
      axios
        .get(
          "http://localhost:8000/allikhwa-hms/referred-to-admission/" +
            department_name.toUpperCase()
        )
        .then((res) => {
          setfillFreeBedsPatients(res.data);
          setrerender_get_referred_to_admission(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [department_name, rerender_get_referred_to_admission]);

  // POSTING PATIENT APPROVED BY THE RECEPTIONIST
  useEffect(() => {
    if (admitting_patients) {
      axios
        .post(
          "http://localhost:8000/allikhwa-hms/admitted-patients/",
          admitting_patients
        )
        .then((res) => {
          dispatch(
            successpopup(
              "The Patient has been successfully admitted in the hospital " +
                department_name +
                " department"
            )
          );
          setdeleting_referred_to_admission(admitting_patients.patient);
          setadmitting_patients(false);
          reset();
        })
        .catch((error) => {
          if (error.response.data.admitted_patient_bed_no) {
            dispatch(failurepopup(error.response.data.admitted_patient_bed_no));
          } else if (error.response.data.patient) {
            dispatch(failurepopup(error.response.data.patient));
          } else if (error.response.data.non_field_errors) {
            dispatch(failurepopup("Patient with this bed no already exists!"));
          } else {
            dispatch(
              failurepopup(
                "Patient has not admitted in the department due to an error!"
              )
            );
          }
          console.log(error);
        });
    }
  }, [admitting_patients]);

  // DELETING THE POSTED PATIENT TO ADMITTED PATIENTS FROM REFERRED TO ADMISSION DATA MODEL
  useEffect(() => {
    if (deleting_referred_to_admission) {
      axios
        .delete(
          "http://localhost:8000/allikhwa-hms/referred-to-admission-deletion/" +
            deleting_referred_to_admission
        )
        .then((res) => {
          // dispatch(successpopup(true));
          setdeleting_referred_to_admission(false);
          setfillfreebeds_display_patient_details(false);
          setdisplay_edit_patient_bed_info(false);
          setrerender_get_referred_to_admission(true);
        })
        .catch((error) => {
          console.log(error);
          // dispatch(
          //   failurepopup(
          //     "Failed to delete the patient from referred to admission"
          //   )
          // );
        });
    }
  }, [deleting_referred_to_admission]);
  return (
    <>
      {successpopup_var && <SuccessPopUp message={successpopup_var} />}
      {failurepopup_var && <FailurePopUp message={failurepopup_var} />}
      {display_edit_patient_bed_info && (
        <>
          <div
            ref={fillfreebeds_table_details_beds} // this ref is for ecrolling to this div element from edit details scrollintoview
            className="profile_information_all"
            style={{
              borderRadius: "8px",
              boxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
              webkitboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
              mozboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
              marginTop: "10px",
            }}
          >
            <button
              className="admin_buttons_add_update_from_add_update_form"
              onClick={() => {
                setdisplay_edit_patient_bed_info(false);
              }}
              style={{
                margin: "10px auto",
                padding: "0 10px",
                backgroundColor: "red",
                width: "fit-content",
              }}
            >
              CLOSE ADMITTING PATIENT
            </button>
            <form onSubmit={handleSubmit(handle_edit_patiend_bed)}>
              <div className="profile_label_input ">
                <label htmlFor="patient" className="profile_lanel_input_label">
                  Patient:
                </label>
                <input
                  {...register("patient")}
                  id="contact"
                  type="text"
                  value={
                    fillfreebeds_display_patient_details &&
                    fillfreebeds_display_patient_details.patient.patient_UID
                  }
                  placeholder="Enter Patient ID Given By Hospital"
                ></input>
                <p className="pForForm">{errors.patient?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label
                  htmlFor="admitted_patient_bed_no"
                  className="profile_lanel_input_label"
                >
                  Bed No:
                </label>
                <input
                  id="admitted_patient_bed_no"
                  type="text"
                  {...register("admitted_patient_bed_no")}
                  placeholder="Enter Beds No "
                ></input>
                <p className="pForForm">
                  {errors.admitted_patient_bed_no?.message}
                </p>
              </div>
              <div className="profile_label_input ">
                <label
                  htmlFor="admitted_patient_contact"
                  className="profile_lanel_input_label"
                >
                  Contact:
                </label>
                <input
                  {...register("admitted_patient_contact")}
                  id="admitted_patient_contact"
                  type="text"
                  placeholder="Enter Contact Information of Patient"
                ></input>
                <p className="pForForm">
                  {errors.admitted_patient_contact?.message}
                </p>
              </div>
              <div className="profile_label_input ">
                <label
                  htmlFor="admitted_patient_admission_date"
                  className="profile_lanel_input_label"
                >
                  Date:
                </label>
                <input
                  {...register("admitted_patient_admission_date")}
                  id="admitted_patient_admission_date"
                  type="date"
                  placeholder="Enter Patient Admission Date"
                ></input>
                <p className="pForForm">
                  {errors.admitted_patient_admission_date?.message}
                </p>
              </div>
              <div className="profile_label_input ">
                <label
                  htmlFor="admitted_patient_department"
                  className="profile_lanel_input_label"
                >
                  Department:
                </label>
                <input
                  {...register("admitted_patient_department")}
                  id="admitted_patient_department"
                  type="text"
                  value={
                    fillfreebeds_display_patient_details &&
                    fillfreebeds_display_patient_details.patient
                      .patient_department
                  }
                  placeholder="Enter Patient Department"
                ></input>
                <p className="pForForm">
                  {errors.admitted_patient_department?.message}
                </p>
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label
                  htmlFor="admitted_patient_instructions"
                  className="profile_lanel_input_label"
                >
                  Admitted Patient Instructions
                </label>
                <textarea
                  id="admitted_patient_instructions"
                  name="admitted_patient_instructions"
                  cols="30"
                  rows="3"
                  placeholder="Enter about patient disease"
                  {...register("admitted_patient_instructions")}
                  style={{ width: "300px" }}
                ></textarea>
                <p className="pForForm">
                  {errors.admitted_patient_instructions?.message}
                </p>
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label
                  htmlFor="admitted_patient_beds_description"
                  className="profile_lanel_input_label"
                >
                  Admitted Patient Description:
                </label>
                <textarea
                  id="admitted_patient_beds_description"
                  name="admitted_patient_beds_description"
                  cols="30"
                  rows="3"
                  placeholder="Enter about patient disease"
                  {...register("admitted_patient_beds_description")}
                  style={{ width: "300px" }}
                ></textarea>
                <p className="pForForm">
                  {errors.admitted_patient_beds_description?.message}
                </p>
              </div>
              <input
                type="submit"
                className="admin_buttons_add_update_from_add_update_form"
                value="Submit The Patient In Department"
                style={{
                  margin: "10px 25% 20px 25%",
                  width: "50%",
                }}
              />
            </form>
          </div>
        </>
      )}

      {/* patient bed information  */}
      {fillfreebeds_display_patient_details && (
        <div className="fillfreebeds_paatient_details">
          <table
            className="employee_GeneratedTable"
            style={{ borderCollapse: "collapse" }}
            ref={fillfreebeds_close_pat_details}
          >
            {fillfreebeds_display_patient_details && (
              <>
                <tbody>
                  <tr>
                    <td style={{ border: "none" }}>
                      <div
                        className="fillfreebeds_edit_icon"
                        onClick={() => {
                          reset();
                          setdisplay_edit_patient_bed_info(
                            fillfreebeds_display_patient_details,
                            setValue(
                              "admitted_patient_department",
                              fillfreebeds_display_patient_details.patient
                                .patient_department
                            )
                          );
                          fillfreebeds_table_details_beds.current?.scrollIntoView(
                            { behavior: "smooth" }
                          );
                        }}
                      >
                        ADMIT PATIENT
                        <BiEdit className="fillfree_edit_icon_inedit" />
                      </div>
                    </td>
                    <td style={{ border: "none" }}>
                      <button
                        className="admin_buttons_add_update_from_add_update_form"
                        onClick={() => {
                          setfillfreebeds_display_patient_details(false);
                        }}
                        style={{ margin: " 0 30%", backgroundColor: "red" }}
                      >
                        CLOSE DETAILS
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>PID</td>
                    <td>
                      {fillfreebeds_display_patient_details.patient.patient_UID}
                    </td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_name
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>
                      {fillfreebeds_display_patient_details.patient.patient_age}
                    </td>
                  </tr>
                  <tr>
                    <td>Last Appointment Date</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_eappointmentdate
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_contact
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_city
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_department
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Patient Email</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_email
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Patient Country</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_country
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Patient City</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_city
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Patient Address</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_address
                      }
                    </td>
                  </tr>
                </tbody>
              </>
            )}
          </table>
          {/* <table
            className="employee_GeneratedTable employee_GeneratedTable_appontments_table"
            style={{ borderCollapse: "collapse" }}
          >
            {fillfreebeds_display_patient_details &&
              fillfreebeds_display_patient_details.appointments.map(
                (appointment, id) => {
                  x = x + 1;
                  return (
                    <>
                      <h2
                        className="fillfreebeds_h2"
                        style={{
                          display: "block",
                          margin: "40px auto 10px auto",
                          width: "150px",
                          backgroundColor: "#013737",
                          color: "white",
                        }}
                      >
                        APPOINTMENT NO {x}
                      </h2>
                      <tbody
                        style={{
                          boxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
                          webkitboxShadow:
                            "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
                          mozboxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
                        }}
                      >
                        <tr>
                          <td>Appointment {id}</td>
                          <td>{appointment.appointment}</td>
                        </tr>
                        <tr>
                          <td>Date</td>
                          <td>{appointment.date}</td>
                        </tr>
                        <tr>
                          <td>Medicine</td>
                          <td>{appointment.medicine}</td>
                        </tr>
                        <tr>
                          <td>Instructions</td>
                          <td>{appointment.instructions}</td>
                        </tr>
                        <tr>
                          <td>Next Appointment Date</td>
                          <td>{appointment.nextappointmentdate}</td>
                        </tr>
                      </tbody>
                    </>
                  );
                }
              )}
          </table> */}
        </div>
      )}
      <div
        className="fill_free_beds_html_table"
        style={{ margin: "80px 5% 80px 5%" }}
      >
        <h2 className="fillfreebeds_h2">ADMITTED PATIENTS BED INFORMATION</h2>
        <table
          className="employee_GeneratedTable"
          style={{ marginBottom: "50px" }}
        >
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Date</th>
              <th>Contact</th>
              <th>Department</th>
              <th>Details</th>
              {/* <th>Patient Information ID</th>
              <th>Patient Information name</th>
              <th>Patient Information age</th> */}
            </tr>
          </thead>

          {fillFreeBedsPatients ? (
            fillFreeBedsPatients.map((patient, id) => {
              return (
                <tbody>
                  <tr key={id}>
                    <td>{patient.patient.patient_UID}</td>
                    <td>{patient.patient.patient_name}</td>
                    <td>{patient.patient.patient_age}</td>
                    <td>{patient.patient.patient_eappointmentdate}</td>
                    <td>{patient.patient.patient_contact}</td>
                    <td>{patient.patient_department}</td>
                    <td
                      onClick={() => {
                        setfillfreebeds_display_patient_details(patient);
                        fillfreebeds_close_pat_details.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      <BsQuestionDiamondFill className="patient_details_edit_icon" />
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <h6>Loading ...</h6>
          )}
        </table>
      </div>
    </>
  );
}

export default RecPatAdmission;
