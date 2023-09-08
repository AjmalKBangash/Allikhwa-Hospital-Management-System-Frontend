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

// function medicines
import { useFieldArray } from "react-hook-form";
import Medicines from "./Medicines";

// const App = () => {

// return (

//   );
// };

// export default App;

// import { useFieldArray } from "react-hook-form";

// function MedicineName({ index }) {
//   const [name, setName] = useState("");

//   const handleChange = (e) => {
//     setName(e.target.value);
//   };

//   return (
//     <div key={index}>
//       <input
//         type="text"
//         placeholder="Medicine Name"
//         value={name}
//         onChange={handleChange}
//       />
//       <button onClick={() => setName("")}>Remove</button>
//     </div>
//   );
// }

// function Medicines(props) {
//   const [medicines, addMedicine, removeMedicine] = useFieldArray({
//     name: "medicines",
//     defaultValue: [],
//   });

//   return (
//     <div>
//       {medicines.map((medicine, index) => (
//         <MedicineName register={register} key={index} index={index} />
//       ))}
//       <button onClick={addMedicine}>Add Medicine</button>
//     </div>
//   );
// }

// export default Medicines

// jjjjjjjjjjjjjjjjjj?

function FillFreeBeds(props) {
  const [fillFreeBedsPatients, setfillFreeBedsPatients] = useState();
  const [
    fillfreebeds_display_patient_details,
    setfillfreebeds_display_patient_details,
  ] = useState(false);
  const [display_edit_patient_bed_info, setdisplay_edit_patient_bed_info] =
    useState(false);
  const fillfreebeds_close_pat_details = useRef();
  const fillfreebeds_table_details_beds = useRef();
  let x = 0;

  const fillfreebeds_validation_schema = Yup.object().shape({
    // Sign Up Form Validation
    bed_no: Yup.number()
      .typeError("Bed No is required and must be a number")
      .min(1, "Beds should not be less than one ")
      .max(
        props.total_beds,
        "Beds must not be greater than " + props.total_beds
      )
      .required("Bed No is Required!"),
    PID: Yup.number("PID should be Number").required("PID is Required"),
    name: Yup.string()
      .max(50, "Must be less than 50 characters")
      .required("Patient Name is Required"),
    email: Yup.string().email("Enter a valid email address"),
    contact: Yup.string()
      .max(14, "Must be 14 characters")
      .min(14, "Must be 14 characters")
      .required("Contact is Required"),
    age: Yup.string()
      .min(0, "Age should not be Negative")
      .max(150, "Age must be less than 150 years")
      .required("Age is Required"),
    admitted_status: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Job category is Required"),
    date: Yup.date("Date is required")
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
    department: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Department is Required"),
    city: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Job title is Required"),
    doctor: Yup.string()
      .max(30, "Must be less than 30 characters!")
      .required("Job category is Required"),
    medicine: Yup.string().required("Medicines is Required"),
    instructions: Yup.string().required("Instructions is Required"),
    patient_beds_description: Yup.string()
      .required("Description is Required")
      .min(100, "Minimum characters should be 100"),
    // appointments: Yup.string() // the appointment should be having a separate form for uploading or editing data because the appoitments is made by doctors there it need more fields in future that is why i will add it in future fillfreebeds.js
    //   .max(20, "Must be 20 characters or less")
    //   .required("Department is Required"),
  });

  const {
    control,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(fillfreebeds_validation_schema),
  });

  const handle_edit_patiend_bed = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
    console.log(data);
    reset();
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:3100/admitted_patients?department=" +
          props.depart_name
      )
      .then((res) => {
        setfillFreeBedsPatients(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.depart_name]);

  // usefieldarray
  // let defaultValues = {
  //   medicines: [{ medicine: "" }],
  // };

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "medicines",
  // });

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
            <form onSubmit={handleSubmit(handle_edit_patiend_bed)}>
              {/* <h1>Personal Information</h1> */}
              <div className="profile_label_input ">
                <label htmlFor="bed_no" className="profile_lanel_input_label">
                  Bed No:
                </label>
                <input
                  id="bed_no"
                  type="text"
                  {...register("bed_no")}
                  defaultValue={fillfreebeds_display_patient_details.bed_no}
                  placeholder="Enter Beds No "
                ></input>
                <p className="pForForm">{errors.bed_no?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label htmlFor="PID" className="profile_lanel_input_label">
                  {" "}
                  PID:
                </label>
                <input
                  {...register("PID")}
                  id="contact"
                  type="text"
                  defaultValue={fillfreebeds_display_patient_details.PID}
                  placeholder="Enter Patient ID Given By Hospital"
                ></input>
                <p className="pForForm">{errors.PID?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label htmlFor="name" className="profile_lanel_input_label">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  defaultValue={fillfreebeds_display_patient_details.name}
                  placeholder="Enter Name of the patient"
                ></input>
                <p className="pForForm">{errors.name?.message}</p>
              </div>
              <div className="profile_label_input ">
                <span>
                  <p>
                    <label htmlFor="patient_beds_description">
                      Your Regards:
                    </label>
                  </p>
                  <p>Write a Short Introduction About Patient:</p>
                  <p className="pForForm">
                    {errors.patient_beds_description?.message}
                  </p>
                </span>
                <div>
                  <div
                    style={{
                      margin: "10px 0",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <select
                      // {...register("beds_description")}
                      defaultValue={"Normal text"}
                      style={{
                        fontSize: "15px",
                        backgroundColor: "white",
                        border: "1px solid rgba(0, 0, 0, 0.199)",
                        borderRadius: "4px",
                        padding: "10px",
                        marginRight: "5px",
                      }}
                    >
                      <option>Normal text</option>
                      <option>Bold text</option>
                      <option>Italix text</option>
                    </select>
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "900",
                        border: "1px solid rgba(0, 0, 0, 0.199)",
                        borderRadius: "4px",
                        padding: "7px 10px ",
                        marginRight: "5px",
                      }}
                    >
                      B
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "900",
                        border: "1px solid rgba(0, 0, 0, 0.199)",
                        borderRadius: "4px",
                        padding: "7px 10px",
                        marginRight: "5px",
                        fontFamily: "serif",
                      }}
                    >
                      <i>I</i>
                    </span>

                    <AiOutlineOrderedList
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.199)",
                        borderRadius: "4px",
                        padding: "10px",
                        marginRight: "5px",
                      }}
                    />
                    <AiOutlineUnorderedList
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.199)",
                        borderRadius: "4px",
                        padding: "10px",
                        marginRight: "5px",
                      }}
                    />
                  </div>
                  <textarea
                    {...register("patient_beds_description")}
                    id="patient_beds_description"
                    name="patient_beds_description"
                    placeholder="Your Patient Description!"
                    rows="3"
                    cols="60"
                    // defaultValue={
                    //   fillfreebeds_display_patient_details.beds_description
                    // }
                  />
                </div>
              </div>
              <div className="profile_label_input ">
                <label htmlFor="email" className="profile_lanel_input_label">
                  Email:
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="text"
                  defaultValue={fillfreebeds_display_patient_details.email}
                  placeholder="Enter Free Available Beds"
                ></input>
                <p className="pForForm">{errors.email?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label htmlFor="contact" className="profile_lanel_input_label">
                  {" "}
                  Contact:
                </label>
                <input
                  {...register("contact")}
                  id="contact"
                  type="text"
                  defaultValue={fillfreebeds_display_patient_details.contact}
                  placeholder="Enter Contact Information of Patient"
                ></input>
                <p className="pForForm">{errors.contact?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label htmlFor="age" className="profile_lanel_input_label">
                  {" "}
                  age:
                </label>
                <input
                  {...register("age")}
                  id="age"
                  type="text"
                  defaultValue={fillfreebeds_display_patient_details.age}
                  placeholder="Enter Patient Age"
                ></input>
                <p className="pForForm">{errors.age?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label
                  htmlFor="admitted_status"
                  className="profile_lanel_input_label"
                >
                  {" "}
                  Admitted_status:
                </label>
                <input
                  {...register("admitted_status")}
                  id="admitted_status"
                  type="text"
                  defaultValue={
                    fillfreebeds_display_patient_details.admitted_status
                  }
                  placeholder="Enter Patient Admitted Status"
                ></input>
                <p className="pForForm">{errors.admitted_status?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label htmlFor="date" className="profile_lanel_input_label">
                  {" "}
                  Date:
                </label>
                <input
                  {...register("date")}
                  id="date"
                  type="date"
                  defaultValue={fillfreebeds_display_patient_details.date}
                  placeholder="Enter Patient Admission Date"
                ></input>
                <p className="pForForm">{errors.date?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label
                  htmlFor="department"
                  className="profile_lanel_input_label"
                >
                  {" "}
                  Department:
                </label>
                <input
                  {...register("department")}
                  id="department"
                  type="text"
                  defaultValue={fillfreebeds_display_patient_details.department}
                  placeholder="Enter Patient Department"
                ></input>
                <p className="pForForm">{errors.department?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label htmlFor="city" className="profile_lanel_input_label">
                  {" "}
                  City:
                </label>
                <input
                  {...register("city")}
                  id="contact"
                  type="text"
                  defaultValue={fillfreebeds_display_patient_details.city}
                  placeholder="Enter Patient City"
                ></input>
                <p className="pForForm">{errors.city?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label htmlFor="doctor" className="profile_lanel_input_label">
                  {" "}
                  Doctor:
                </label>
                <input
                  {...register("doctor")}
                  id="doctor"
                  type="text"
                  defaultValue={fillfreebeds_display_patient_details.doctor}
                  placeholder="Enter Doctor Name For Patient For Appointments"
                ></input>
                <p className="pForForm">{errors.doctor?.message}</p>
              </div>
              {/* <Medicines register={register} /> */}
              {/* <div className="fillfreebeds_dynamic_field_medicine">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <button onClick={() => remove(index)}>Remove Medicine</button>
                  <input
                    // name={fieldArray.name}
                    value={medicines.index[index]}
                    // onChange={medicines.handleChange("name", index)}
                    // defaultValue={medicines}
                    // defaultValue={}
                    {...register(`medicines.$(index).medicine`)}
                    placeholder="Enter the Medicine Name"
                  />
                </div>
              ))}
              <p className="pForForm">{errors.medicines?.message}</p>
              <button
                onClick={() => append({ medicine: "" })}
                style={{ display: "block", margin: "10px auto" }}
              >
                Add Medicine
              </button>
            </div> */}

              <div className="profile_label_input ">
                <label htmlFor="medicine" className="profile_lanel_input_label">
                  {" "}
                  Medicine:
                </label>
                <input
                  {...register("medicine")}
                  id="medicine"
                  type="text"
                  defaultValue={fillfreebeds_display_patient_details.medicine}
                  placeholder="Enter Medicines Prescribed By Doctor"
                ></input>
                <p className="pForForm">{errors.medicine?.message}</p>
              </div>
              <div className="profile_label_input ">
                <label
                  htmlFor="instructions"
                  className="profile_lanel_input_label"
                >
                  {" "}
                  Instructions:
                </label>
                <input
                  {...register("instructions")}
                  id="instructions"
                  type="text"
                  defaultValue={
                    fillfreebeds_display_patient_details.instructions
                  }
                  placeholder="Enter Instructions Given By Doctor"
                ></input>
                <p className="pForForm">{errors.instructions?.message}</p>
              </div>
              <input
                type="submit"
                className="admin_buttons_add_update_from_add_update_form"
                value="Submit Your Form"
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
                      {/* <h2
                        className="fillfreebeds_h2"
                        style={{ padding: "2px", fontSize: "20px" }}
                      > */}
                      <div
                        className="fillfreebeds_edit_icon"
                        onClick={() => {
                          setdisplay_edit_patient_bed_info(
                            fillfreebeds_display_patient_details
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
                    <td>PID</td>
                    <td>{fillfreebeds_display_patient_details.PID}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td> {fillfreebeds_display_patient_details.name}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{fillfreebeds_display_patient_details.age}</td>
                  </tr>
                  <tr>
                    <td>Last Appointment Date</td>
                    <td>{fillfreebeds_display_patient_details.date}</td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>{fillfreebeds_display_patient_details.contact}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td> {fillfreebeds_display_patient_details.city}</td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>{fillfreebeds_display_patient_details.department}</td>
                  </tr>
                  <tr>
                    <td>Admitted Status</td>
                    <td>
                      {fillfreebeds_display_patient_details.admitted_status}
                    </td>
                  </tr>
                  <tr>
                    <td>Bed No</td>
                    <td>{fillfreebeds_display_patient_details.bed_no}</td>
                  </tr>
                  <tr>
                    <td>Patient Doctor</td>
                    <td>{fillfreebeds_display_patient_details.doctor}</td>
                  </tr>
                  <tr>
                    <td>Medicine</td>
                    <td>{fillfreebeds_display_patient_details.medicine}</td>
                  </tr>
                  <tr>
                    <td>Instructions</td>
                    <td>{fillfreebeds_display_patient_details.instructions}</td>
                  </tr>
                </tbody>
              </>
            )}
          </table>
          <table
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
          </table>
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
              <th>PID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Date</th>
              <th>Contact</th>
              <th>Beds No</th>
              <th>Doctor</th>
              <th>Details</th>
            </tr>
          </thead>

          {fillFreeBedsPatients ? (
            fillFreeBedsPatients.map((patient, id) => {
              return (
                <tbody>
                  <tr key={id}>
                    <td>{patient.PID}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.date}</td>
                    <td>{patient.contact}</td>
                    <td>{patient.bed_no}</td>
                    <td>{patient.doctor}</td>
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
