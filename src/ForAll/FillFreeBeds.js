import { useEffect, useRef, useState } from "react";
import "./FillFreeBeds.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import Medicines from "./Medicines";
// importing icons
import { BsQuestionDiamondFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { UseSelector, useSelector, ussDispatch } from "react-redux";
import { useFieldArray } from "react-hook-form";
import { useLocation } from "react-router-dom";

function FillFreeBeds({ department_name, total_beds }) {
  const [fillFreeBedsPatients, setfillFreeBedsPatients] = useState();
  const [
    fillfreebeds_display_patient_details,
    setfillfreebeds_display_patient_details,
  ] = useState(false);
  const [display_edit_patient_bed_info, setdisplay_edit_patient_bed_info] =
    useState(false);
  // const [updating_admitted_patient, setUpdating_admitted_patient] =
  //   useState(false);
  const [deleting_admitted_patient, setDeleting_admitted_patient] =
    useState(false);
  const [rerender_admitted_patients, setrerender_admitted_patients] =
    useState(false);
  const fillfreebeds_close_pat_details = useRef();
  const fillfreebeds_table_details_beds = useRef();

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
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(fillfreebeds_validation_schema),
  });

  // function formatDateToYYYYMMDD(date) {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // }
  // const handle_edit_patiend_bed = (data) => {
  //   let result = window.confirm("Are you sure you want to admit the patient");
  //   if (result) {
  //     setUpdating_admitted_patient({
  //       patient: data.patient,
  //       admitted_patient_admission_date: formatDateToYYYYMMDD(
  //         data.admitted_patient_admission_date
  //       ),
  //       admitted_patient_bed_no: data.admitted_patient_bed_no,
  //       admitted_patient_beds_description:
  //         data.admitted_patient_beds_description,
  //       admitted_patient_contact: data.admitted_patient_contact,
  //       admitted_patient_department: data.admitted_patient_department,
  //       admitted_patient_instructions: data.admitted_patient_instructions,
  //     });
  //   }
  //   // reset();
  // };

  const handle_edit_patiend_bed_deletion = (data) => {
    let result = window.confirm("Are you sure you want to admit the patient");
    if (result) {
      setDeleting_admitted_patient(data.patient);
    }
    // reset();
  };
  // RETRIEVING ADMITTED PATIENTS OF THIS DEPARTMENT (WARD)
  useEffect(() => {
    if (department_name) {
      axios
        .get(
          "http://localhost:8000/allikhwa-hms/admitted-patients/" +
            department_name.toUpperCase()
        )
        .then((res) => {
          setfillFreeBedsPatients(res.data);
          setrerender_admitted_patients(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [department_name, rerender_admitted_patients]);
  // UPDATING ADMITTED PAIENT
  // useEffect(() => {
  //   if (updating_admitted_patient) {
  //     axios
  //       .put(
  //         "http://localhost:8000/allikhwa-hms/admitted-patients/",
  //         updating_admitted_patient
  //       )
  //       .then((res) => {
  //         setUpdating_admitted_patient(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [updating_admitted_patient]);
  // DELETING PATIENT FROM DADMISSION BECAUSE THE PATIENT IS SUCCEFULLY TREATED
  useEffect(() => {
    if (deleting_admitted_patient) {
      axios
        .delete(
          "http://localhost:8000/allikhwa-hms/admitted-patients-deletion/" +
            deleting_admitted_patient
        )
        .then((res) => {
          // dispatch(successpopup(true));
          setDeleting_admitted_patient(false);
          setfillfreebeds_display_patient_details(false);
          setdisplay_edit_patient_bed_info(false);
          setrerender_admitted_patients(true);
          reset();
        })
        .catch((error) => {
          console.log(error);
          // dispatch(failurepopup(error.response.data));
        });
    }
  }, [deleting_admitted_patient]);

  return (
    <>
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
              CLOSE PATIENT DETAILS FORM
            </button>
            {/* <form onSubmit={handleSubmit(handle_edit_patiend_bed)}> */}
            <form>
              {/* <h1>Personal Information</h1> */}
              <div className="profile_label_input ">
                <label htmlFor="patient" className="profile_lanel_input_label">
                  Patient:
                </label>
                <input
                  {...register("patient")}
                  id="contact"
                  type="text"
                  value={display_edit_patient_bed_info.patient.patient_UID}
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
              {/* <input
                type="submit"
                className="admin_buttons_add_update_from_add_update_form"
                value="UPDATE"
                style={{
                  margin: "10px 25% 20px 25%",
                  width: "50%",
                }}
              /> */}
              <button
                type="button"
                className="admin_buttons_add_update_from_add_update_form"
                style={{
                  margin: "10px 25% 20px 25%",
                  width: "50%",
                }}
                onClick={handleSubmit(handle_edit_patiend_bed_deletion)}
              >
                DELETE
              </button>
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
                      {/* <h2
                        className="fillfreebeds_h2"
                        style={{ padding: "2px", fontSize: "20px" }}
                      > */}
                      <div
                        className="fillfreebeds_edit_icon"
                        style={{ width: "60px" }}
                        onClick={() => {
                          setdisplay_edit_patient_bed_info(
                            fillfreebeds_display_patient_details,
                            setValue(
                              "admitted_patient_admission_date",
                              fillfreebeds_display_patient_details.admitted_patient_admission_date
                            ),
                            setValue(
                              "admitted_patient_bed_no",
                              fillfreebeds_display_patient_details.admitted_patient_bed_no
                            ),
                            setValue(
                              "admitted_patient_beds_description",
                              fillfreebeds_display_patient_details.admitted_patient_beds_description
                            ),
                            setValue(
                              "admitted_patient_contact",
                              fillfreebeds_display_patient_details.admitted_patient_contact
                            ),
                            setValue(
                              "admitted_patient_instructions",
                              fillfreebeds_display_patient_details.admitted_patient_instructions
                            ),
                            setValue(
                              "admitted_patient_department",
                              fillfreebeds_display_patient_details.admitted_patient_department
                            )
                          );
                          fillfreebeds_table_details_beds.current?.scrollIntoView(
                            { behavior: "smooth" }
                          );
                        }}
                      >
                        EDIT
                        <BiEdit className="fillfree_edit_icon_inedit" />
                      </div>

                      {/* </h2> */}
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
                    <td>Patient ID</td>
                    <td>
                      {fillfreebeds_display_patient_details.patient.patient_UID}
                    </td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>
                      {" "}
                      {
                        fillfreebeds_display_patient_details.patient
                          .patient_name
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Beds No:</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.admitted_patient_bed_no
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Patient Beds Descriptions</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.admitted_patient_beds_description
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
                    <td>Admission Date</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.admitted_patient_admission_date
                      }
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
                        fillfreebeds_display_patient_details.admitted_patient_contact
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
                        fillfreebeds_display_patient_details.admitted_patient_department
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Patient Instructions</td>
                    <td>
                      {
                        fillfreebeds_display_patient_details.admitted_patient_instructions
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
              {/* <th>PID</th> */}
              <th>Patient Name</th>
              <th>Age</th>
              <th>Admission Date</th>
              <th>Contact</th>
              <th>Bed No</th>
              <th>Details</th>
            </tr>
          </thead>

          {fillFreeBedsPatients ? (
            fillFreeBedsPatients.map((patient, id) => {
              return (
                <tbody>
                  <tr key={id}>
                    {/* <td>{patient.patient_UID}</td> */}
                    <td>{patient.patient.patient_name}</td>
                    <td>{patient.patient.patient_age}</td>
                    <td>{patient.admitted_patient_admission_date}</td>
                    <td>{patient.admitted_patient_contact}</td>
                    <td>{patient.admitted_patient_bed_no}</td>
                    {/* <td>{patient.doctor}</td> */}
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

export default FillFreeBeds;

// import { useEffect, useRef, useState } from "react";
// import "./FillFreeBeds.css";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// // import Medicines from "./Medicines";
// // importing icons
// import { BsQuestionDiamondFill } from "react-icons/bs";
// import { BiEdit } from "react-icons/bi";
// import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";

// // function medicines
// import { useFieldArray } from "react-hook-form";
// import Medicines from "./Medicines";

// function FillFreeBeds(props) {
//   console.log(props);
//   console.log(props.department_name);
//   const [fillFreeBedsPatients, setfillFreeBedsPatients] = useState();
//   const [fillFreeBedsPatients01, setfillFreeBedsPatients01] = useState();
//   const [
//     fillfreebeds_display_patient_details,
//     setfillfreebeds_display_patient_details,
//   ] = useState(false);
//   const [display_edit_patient_bed_info, setdisplay_edit_patient_bed_info] =
//     useState(false);
//   const fillfreebeds_close_pat_details = useRef();
//   const fillfreebeds_table_details_beds = useRef();
//   let x = 0;

//   const fillfreebeds_validation_schema = Yup.object().shape({
//     // Sign Up Form Validation
//     bed_no: Yup.number()
//       .typeError("Bed No is required and must be a number")
//       .min(1, "Beds should not be less than one ")
//       .max(
//         props.total_beds,
//         "Beds must not be greater than " + props.total_beds
//       )
//       .required("Bed No is Required!"),
//     PID: Yup.number("PID should be Number").required("PID is Required"),
//     name: Yup.string()
//       .max(50, "Must be less than 50 characters")
//       .required("Patient Name is Required"),
//     email: Yup.string().email("Enter a valid email address"),
//     contact: Yup.string()
//       .max(14, "Must be 14 characters")
//       .min(14, "Must be 14 characters")
//       .required("Contact is Required"),
//     age: Yup.string()
//       .min(0, "Age should not be Negative")
//       .max(150, "Age must be less than 150 years")
//       .required("Age is Required"),
//     admitted_status: Yup.string()
//       .max(50, "Must be 50 characters or less")
//       .required("Job category is Required"),
//     date: Yup.date("Date is required")
//       .typeError("Date is required")
//       .min(
//         new Date().toISOString().split("T")[0],
//         "Date should not be less than the current Date!"
//       )
//       .max(
//         // This date as 10 years ahead  to the current date
//         // new Date().getFullYear() +
//         //   10 +
//         //   "-" +
//         //   Number(new Date().getMonth() + 1) +
//         //   "-" +
//         // new Date().getDate(),
//         new Date().toISOString().split("T")[0],
//         "Date should not be greater than the current Date!"
//       )
//       .required("Date is Required"),
//     department: Yup.string()
//       .max(20, "Must be 20 characters or less")
//       .required("Department is Required"),
//     city: Yup.string()
//       .max(50, "Must be 50 characters or less")
//       .required("Job title is Required"),
//     doctor: Yup.string()
//       .max(30, "Must be less than 30 characters!")
//       .required("Job category is Required"),
//     medicine: Yup.string().required("Medicines is Required"),
//     instructions: Yup.string().required("Instructions is Required"),
//     patient_beds_description: Yup.string()
//       .required("Description is Required")
//       .min(100, "Minimum characters should be 100"),
//     // appointments: Yup.string() // the appointment should be having a separate form for uploading or editing data because the appoitments is made by doctors there it need more fields in future that is why i will add it in future fillfreebeds.js
//     //   .max(20, "Must be 20 characters or less")
//     //   .required("Department is Required"),
//   });

//   const {
//     control,
//     reset,
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm({
//     mode: "onBlur",
//     resolver: yupResolver(fillfreebeds_validation_schema),
//   });

//   const handle_edit_patiend_bed = (data) => {
//     console.log(data);
//     alert(JSON.stringify(data));
//     console.log(data);
//     reset();
//   };

//   useEffect(() => {
//     if (props.department_name) {
//       axios
//         .get(
//           "http://localhost:8000/allikhwa-hms/referred-to-admission/" +
//             props.department_name.toUpperCase()
//         )
//         .then((res) => {
//           setfillFreeBedsPatients01(res.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, [props.department_name]);

//   // FETCHING PATIENTS ON THE BASIS OF REFERRED TO ADMISSION
//   useEffect(() => {
//     // we will fetch patient on the basis of UID and DOCTOR name but we will fetch patients on the basis of only patient_UID because it is unique and we only need it
//     if (fillFreeBedsPatients01) {
//       try {
//         const fetchPatients = async () => {
//           const responses = await Promise.all(
//             fillFreeBedsPatients01.map((uuid) => {
//               return axios.get(
//                 "http://localhost:8000/allikhwa-hms/patients/" +
//                   uuid.patient_UID
//                 // { params: uuid }
//               );
//             })
//           );
//           const patients = responses.map((patient) => patient.data);
//           const arrayOfObjects = [].concat(...patients);
//           // console.log(arrayOfObjects);
//           setfillFreeBedsPatients(arrayOfObjects);
//           // setrerendertwo_axios_gets(false);
//         };
//         fetchPatients();
//       } catch (error) {
//         console.log(error);
//       } // rerendertwo_axios_gets
//     }
//   }, [fillFreeBedsPatients01]);
//   // usefieldarray
//   // let defaultValues = {
//   //   medicines: [{ medicine: "" }],
//   // };

//   // const { fields, append, remove } = useFieldArray({
//   //   control,
//   //   name: "medicines",
//   // });

//   return (
//     <>
//       {display_edit_patient_bed_info && (
//         <>
//           <div
//             ref={fillfreebeds_table_details_beds} // this ref is for ecrolling to this div element from edit details scrollintoview
//             className="profile_information_all"
//             style={{
//               borderRadius: "8px",
//               boxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
//               webkitboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
//               mozboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
//             }}
//           >
//             <button
//               className="admin_buttons_add_update_from_add_update_form"
//               onClick={() => {
//                 setdisplay_edit_patient_bed_info(false);
//               }}
//               style={{
//                 margin: "10px auto",
//                 padding: "0 10px",
//                 backgroundColor: "red",
//                 width: "fit-content",
//               }}
//             >
//               CLOSE PATIENT DETAILS FORM
//             </button>
//             <form onSubmit={handleSubmit(handle_edit_patiend_bed)}>
//               {/* <h1>Personal Information</h1> */}
//               <div className="profile_label_input ">
//                 <label htmlFor="bed_no" className="profile_lanel_input_label">
//                   Bed No:
//                 </label>
//                 <input
//                   id="bed_no"
//                   type="text"
//                   {...register("bed_no")}
//                   defaultValue={fillfreebeds_display_patient_details.bed_no}
//                   placeholder="Enter Beds No "
//                 ></input>
//                 <p className="pForForm">{errors.bed_no?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label htmlFor="PID" className="profile_lanel_input_label">
//                   {" "}
//                   PID:
//                 </label>
//                 <input
//                   {...register("PID")}
//                   id="contact"
//                   type="text"
//                   defaultValue={fillfreebeds_display_patient_details.PID}
//                   placeholder="Enter Patient ID Given By Hospital"
//                 ></input>
//                 <p className="pForForm">{errors.PID?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label htmlFor="name" className="profile_lanel_input_label">
//                   Name:
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   {...register("name")}
//                   defaultValue={fillfreebeds_display_patient_details.name}
//                   placeholder="Enter Name of the patient"
//                 ></input>
//                 <p className="pForForm">{errors.name?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <span>
//                   <p>
//                     <label htmlFor="patient_beds_description">
//                       Your Regards:
//                     </label>
//                   </p>
//                   <p>Write a Short Introduction About Patient:</p>
//                   <p className="pForForm">
//                     {errors.patient_beds_description?.message}
//                   </p>
//                 </span>
//                 <div>
//                   <div
//                     style={{
//                       margin: "10px 0",
//                       display: "flex",
//                       flexDirection: "row",
//                     }}
//                   >
//                     <select
//                       // {...register("beds_description")}
//                       defaultValue={"Normal text"}
//                       style={{
//                         fontSize: "15px",
//                         backgroundColor: "white",
//                         border: "1px solid rgba(0, 0, 0, 0.199)",
//                         borderRadius: "4px",
//                         padding: "10px",
//                         marginRight: "5px",
//                       }}
//                     >
//                       <option>Normal text</option>
//                       <option>Bold text</option>
//                       <option>Italix text</option>
//                     </select>
//                     <span
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: "900",
//                         border: "1px solid rgba(0, 0, 0, 0.199)",
//                         borderRadius: "4px",
//                         padding: "7px 10px ",
//                         marginRight: "5px",
//                       }}
//                     >
//                       B
//                     </span>
//                     <span
//                       style={{
//                         fontSize: "15px",
//                         fontWeight: "900",
//                         border: "1px solid rgba(0, 0, 0, 0.199)",
//                         borderRadius: "4px",
//                         padding: "7px 10px",
//                         marginRight: "5px",
//                         fontFamily: "serif",
//                       }}
//                     >
//                       <i>I</i>
//                     </span>

//                     <AiOutlineOrderedList
//                       style={{
//                         border: "1px solid rgba(0, 0, 0, 0.199)",
//                         borderRadius: "4px",
//                         padding: "10px",
//                         marginRight: "5px",
//                       }}
//                     />
//                     <AiOutlineUnorderedList
//                       style={{
//                         border: "1px solid rgba(0, 0, 0, 0.199)",
//                         borderRadius: "4px",
//                         padding: "10px",
//                         marginRight: "5px",
//                       }}
//                     />
//                   </div>
//                   <textarea
//                     {...register("patient_beds_description")}
//                     id="patient_beds_description"
//                     name="patient_beds_description"
//                     placeholder="Your Patient Description!"
//                     rows="3"
//                     cols="60"
//                     // defaultValue={
//                     //   fillfreebeds_display_patient_details.beds_description
//                     // }
//                   />
//                 </div>
//               </div>
//               <div className="profile_label_input ">
//                 <label htmlFor="email" className="profile_lanel_input_label">
//                   Email:
//                 </label>
//                 <input
//                   {...register("email")}
//                   id="email"
//                   type="text"
//                   defaultValue={fillfreebeds_display_patient_details.email}
//                   placeholder="Enter Free Available Beds"
//                 ></input>
//                 <p className="pForForm">{errors.email?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label htmlFor="contact" className="profile_lanel_input_label">
//                   {" "}
//                   Contact:
//                 </label>
//                 <input
//                   {...register("contact")}
//                   id="contact"
//                   type="text"
//                   defaultValue={fillfreebeds_display_patient_details.contact}
//                   placeholder="Enter Contact Information of Patient"
//                 ></input>
//                 <p className="pForForm">{errors.contact?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label htmlFor="age" className="profile_lanel_input_label">
//                   {" "}
//                   age:
//                 </label>
//                 <input
//                   {...register("age")}
//                   id="age"
//                   type="text"
//                   defaultValue={fillfreebeds_display_patient_details.age}
//                   placeholder="Enter Patient Age"
//                 ></input>
//                 <p className="pForForm">{errors.age?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label
//                   htmlFor="admitted_status"
//                   className="profile_lanel_input_label"
//                 >
//                   {" "}
//                   Admitted_status:
//                 </label>
//                 <input
//                   {...register("admitted_status")}
//                   id="admitted_status"
//                   type="text"
//                   defaultValue={
//                     fillfreebeds_display_patient_details.admitted_status
//                   }
//                   placeholder="Enter Patient Admitted Status"
//                 ></input>
//                 <p className="pForForm">{errors.admitted_status?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label htmlFor="date" className="profile_lanel_input_label">
//                   {" "}
//                   Date:
//                 </label>
//                 <input
//                   {...register("date")}
//                   id="date"
//                   type="date"
//                   defaultValue={fillfreebeds_display_patient_details.date}
//                   placeholder="Enter Patient Admission Date"
//                 ></input>
//                 <p className="pForForm">{errors.date?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label
//                   htmlFor="department"
//                   className="profile_lanel_input_label"
//                 >
//                   {" "}
//                   Department:
//                 </label>
//                 <input
//                   {...register("department")}
//                   id="department"
//                   type="text"
//                   defaultValue={fillfreebeds_display_patient_details.department}
//                   placeholder="Enter Patient Department"
//                 ></input>
//                 <p className="pForForm">{errors.department?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label htmlFor="city" className="profile_lanel_input_label">
//                   {" "}
//                   City:
//                 </label>
//                 <input
//                   {...register("city")}
//                   id="contact"
//                   type="text"
//                   defaultValue={fillfreebeds_display_patient_details.city}
//                   placeholder="Enter Patient City"
//                 ></input>
//                 <p className="pForForm">{errors.city?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label htmlFor="doctor" className="profile_lanel_input_label">
//                   {" "}
//                   Doctor:
//                 </label>
//                 <input
//                   {...register("doctor")}
//                   id="doctor"
//                   type="text"
//                   defaultValue={fillfreebeds_display_patient_details.doctor}
//                   placeholder="Enter Doctor Name For Patient For Appointments"
//                 ></input>
//                 <p className="pForForm">{errors.doctor?.message}</p>
//               </div>
//               {/* <Medicines register={register} /> */}
//               {/* <div className="fillfreebeds_dynamic_field_medicine">
//               {fields.map((field, index) => (
//                 <div key={field.id}>
//                   <button onClick={() => remove(index)}>Remove Medicine</button>
//                   <input
//                     // name={fieldArray.name}
//                     value={medicines.index[index]}
//                     // onChange={medicines.handleChange("name", index)}
//                     // defaultValue={medicines}
//                     // defaultValue={}
//                     {...register(`medicines.$(index).medicine`)}
//                     placeholder="Enter the Medicine Name"
//                   />
//                 </div>
//               ))}
//               <p className="pForForm">{errors.medicines?.message}</p>
//               <button
//                 onClick={() => append({ medicine: "" })}
//                 style={{ display: "block", margin: "10px auto" }}
//               >
//                 Add Medicine
//               </button>
//             </div> */}

//               <div className="profile_label_input ">
//                 <label htmlFor="medicine" className="profile_lanel_input_label">
//                   {" "}
//                   Medicine:
//                 </label>
//                 <input
//                   {...register("medicine")}
//                   id="medicine"
//                   type="text"
//                   defaultValue={fillfreebeds_display_patient_details.medicine}
//                   placeholder="Enter Medicines Prescribed By Doctor"
//                 ></input>
//                 <p className="pForForm">{errors.medicine?.message}</p>
//               </div>
//               <div className="profile_label_input ">
//                 <label
//                   htmlFor="instructions"
//                   className="profile_lanel_input_label"
//                 >
//                   {" "}
//                   Instructions:
//                 </label>
//                 <input
//                   {...register("instructions")}
//                   id="instructions"
//                   type="text"
//                   defaultValue={
//                     fillfreebeds_display_patient_details.instructions
//                   }
//                   placeholder="Enter Instructions Given By Doctor"
//                 ></input>
//                 <p className="pForForm">{errors.instructions?.message}</p>
//               </div>
//               <input
//                 type="submit"
//                 className="admin_buttons_add_update_from_add_update_form"
//                 value="Submit Your Form"
//                 style={{
//                   margin: "10px 25% 20px 25%",
//                   width: "50%",
//                 }}
//               />
//             </form>
//           </div>
//         </>
//       )}

//       {/* patient bed information  */}
//       {fillfreebeds_display_patient_details && (
//         <div className="fillfreebeds_paatient_details">
//           <table
//             className="employee_GeneratedTable"
//             style={{ borderCollapse: "collapse" }}
//             ref={fillfreebeds_close_pat_details}
//           >
//             {fillfreebeds_display_patient_details && (
//               <>
//                 <tbody>
//                   <tr>
//                     <td style={{ border: "none" }}>
//                       {/* <h2
//                         className="fillfreebeds_h2"
//                         style={{ padding: "2px", fontSize: "20px" }}
//                       > */}
//                       <div
//                         className="fillfreebeds_edit_icon"
//                         onClick={() => {
//                           setdisplay_edit_patient_bed_info(
//                             fillfreebeds_display_patient_details
//                           );
//                           fillfreebeds_table_details_beds.current?.scrollIntoView(
//                             { behavior: "smooth" }
//                           );
//                         }}
//                       >
//                         EDIT
//                         <BiEdit className="fillfree_edit_icon_inedit" />
//                       </div>

//                       {/* </h2> */}
//                     </td>
//                     <td style={{ border: "none" }}>
//                       <button
//                         className="admin_buttons_add_update_from_add_update_form"
//                         onClick={() => {
//                           setfillfreebeds_display_patient_details(false);
//                         }}
//                         style={{ margin: " 0 30%", backgroundColor: "red" }}
//                       >
//                         CLOSE DETAILS
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>PID</td>
//                     <td>{fillfreebeds_display_patient_details.PID}</td>
//                   </tr>
//                   <tr>
//                     <td>Name</td>
//                     <td> {fillfreebeds_display_patient_details.name}</td>
//                   </tr>
//                   <tr>
//                     <td>Age</td>
//                     <td>{fillfreebeds_display_patient_details.age}</td>
//                   </tr>
//                   <tr>
//                     <td>Last Appointment Date</td>
//                     <td>{fillfreebeds_display_patient_details.date}</td>
//                   </tr>
//                   <tr>
//                     <td>Contact</td>
//                     <td>{fillfreebeds_display_patient_details.contact}</td>
//                   </tr>
//                   <tr>
//                     <td>City</td>
//                     <td> {fillfreebeds_display_patient_details.city}</td>
//                   </tr>
//                   <tr>
//                     <td>Department</td>
//                     <td>{fillfreebeds_display_patient_details.department}</td>
//                   </tr>
//                   <tr>
//                     <td>Admitted Status</td>
//                     <td>
//                       {fillfreebeds_display_patient_details.admitted_status}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Bed No</td>
//                     <td>{fillfreebeds_display_patient_details.bed_no}</td>
//                   </tr>
//                   <tr>
//                     <td>Patient Doctor</td>
//                     <td>{fillfreebeds_display_patient_details.doctor}</td>
//                   </tr>
//                   <tr>
//                     <td>Medicine</td>
//                     <td>{fillfreebeds_display_patient_details.medicine}</td>
//                   </tr>
//                   <tr>
//                     <td>Instructions</td>
//                     <td>{fillfreebeds_display_patient_details.instructions}</td>
//                   </tr>
//                 </tbody>
//               </>
//             )}
//           </table>
//           <table
//             className="employee_GeneratedTable employee_GeneratedTable_appontments_table"
//             style={{ borderCollapse: "collapse" }}
//           >
//             {fillfreebeds_display_patient_details &&
//               fillfreebeds_display_patient_details.appointments.map(
//                 (appointment, id) => {
//                   x = x + 1;
//                   return (
//                     <>
//                       <h2
//                         className="fillfreebeds_h2"
//                         style={{
//                           display: "block",
//                           margin: "40px auto 10px auto",
//                           width: "150px",
//                           backgroundColor: "#013737",
//                           color: "white",
//                         }}
//                       >
//                         APPOINTMENT NO {x}
//                       </h2>
//                       <tbody
//                         style={{
//                           boxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
//                           webkitboxShadow:
//                             "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
//                           mozboxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
//                         }}
//                       >
//                         <tr>
//                           <td>Appointment {id}</td>
//                           <td>{appointment.appointment}</td>
//                         </tr>
//                         <tr>
//                           <td>Date</td>
//                           <td>{appointment.date}</td>
//                         </tr>
//                         <tr>
//                           <td>Medicine</td>
//                           <td>{appointment.medicine}</td>
//                         </tr>
//                         <tr>
//                           <td>Instructions</td>
//                           <td>{appointment.instructions}</td>
//                         </tr>
//                         <tr>
//                           <td>Next Appointment Date</td>
//                           <td>{appointment.nextappointmentdate}</td>
//                         </tr>
//                       </tbody>
//                     </>
//                   );
//                 }
//               )}
//           </table>
//         </div>
//       )}
//       <div
//         className="fill_free_beds_html_table"
//         style={{ margin: "80px 5% 80px 5%" }}
//       >
//         <h2 className="fillfreebeds_h2">ADMITTED PATIENTS BED INFORMATION</h2>
//         <table
//           className="employee_GeneratedTable"
//           style={{ marginBottom: "50px" }}
//         >
//           <thead>
//             <tr>
//               {/* <th>PID</th> */}
//               <th>Patient Name</th>
//               <th>Age</th>
//               <th>Date</th>
//               <th>Contact</th>
//               <th>Beds No</th>
//               {/* <th>Doctor</th> */}
//               <th>Details</th>
//             </tr>
//           </thead>

//           {fillFreeBedsPatients ? (
//             fillFreeBedsPatients.map((patient, id) => {
//               return (
//                 <tbody>
//                   <tr key={id}>
//                     {/* <td>{patient.patient_UID}</td> */}
//                     <td>{patient.patient_name}</td>
//                     <td>{patient.patient_age}</td>
//                     <td>{patient.patient_eappointmentdate}</td>
//                     <td>{patient.patient_contact}</td>
//                     <td>{patient.patient_bedno}</td>
//                     {/* <td>{patient.doctor}</td> */}
//                     <td
//                       onClick={() => {
//                         setfillfreebeds_display_patient_details(patient);
//                         fillfreebeds_close_pat_details.current?.scrollIntoView({
//                           behavior: "smooth",
//                         });
//                       }}
//                     >
//                       <BsQuestionDiamondFill className="patient_details_edit_icon" />
//                     </td>
//                   </tr>
//                 </tbody>
//               );
//             })
//           ) : (
//             <h6>Loading ...</h6>
//           )}
//         </table>
//       </div>
//     </>
//   );
// }

// export default FillFreeBeds;
