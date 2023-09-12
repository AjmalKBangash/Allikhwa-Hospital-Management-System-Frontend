import "./DrPrescription.css";
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
  prescription_show_patient_detail_rest_pres_form,
  re_render_presc_upper_component,
  show_lab_test_form,
} from "../../Store/Store";

// icons
import { MdDetails } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaUserDoctor, FaPrescription } from "react-icons/fa6";

function DrPrescription() {
  const [patientData, setPatientData] = useState();
  const [drdashboard_showPatient_Details, setdrdashboard_showPatient_Details] =
    useState();
  const [go_to_prescription_state, setgo_to_prescription_state] = useState();
  // const [
  //   deletion_from_prescription_data_model,
  //   setdeletion_from_prescription_data_model,
  // ] = useState();
  const presc_ref_for_printing_component = useRef(null);
  const presc_ref_for_Rx_scrolltoview = useRef(null);
  const re_render_presc_upper_component_ver = useSelector(
    (state) => state.re_render_presc_upper_component
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3100/prescriptions?doctor=DrHassan")
      .then((res) => {
        // console.log(res.data);
        setPatientData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [re_render_presc_upper_component_ver]);
  // useEffect(() => {
  //   {
  //     deletion_from_prescription_data_model &&
  //       axios
  //         .delete(
  //           "http://localhost:3100/prescriptions?PID=" +
  //             deletion_from_prescription_data_model
  //         )
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   }
  // }, []);
  return (
    <>
      {/* details  */}
      <div>
        <h2 className="fillfreebeds_h2">PRESCRIPTION </h2>
        <div className="printing_component_prescription">
          <div>
            <Prescription
              data={go_to_prescription_state}
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
                <th>View</th>
                {/* <th>Done</th> */}
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
                      <td
                        onClick={() => {
                          setdrdashboard_showPatient_Details(patdet);
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

const Prescription = React.forwardRef((props, ref) => {
  const [from_prescription_to_patients, setfrom_prescription_to_patients] =
    useState(false);
  const [presc_print_refer_to_admission, setpresc_print_refer_to_admission] =
    useState(false);
  const [
    submission_before_reset_will_work,
    setsubmission_before_reset_will_work,
  ] = useState(false);
  const [show_lab_test_form, setshow_lab_test_form] = useState(false);
  const cd_yess_no_var = useSelector((state) => state.cd_yess_no);
  const prescription_show_patient_detail_rest_pres_form_var = useSelector(
    (state) => state.prescription_show_patient_detail_rest_pres_form
  );
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
  const {
    setValue,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(prescription_validation_schema),
  });

  function handle_edit_patiend_bed(data) {
    setfrom_prescription_to_patients(data);
    dispatch(cd_open_close(true));
    dispatch(re_render_presc_upper_component(true));
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
        .post("http://localhost:3100/patients", {
          ...from_prescription_to_patients,
          ...prescription_show_patient_detail_rest_pres_form_var,
        })
        .then((res) => {
          console.log(res);
          console.log("from posting");
        })
        .catch((error) => {
          console.log(error);
        });
      setsubmission_before_reset_will_work(true);
    }
  }, [from_prescription_to_patients, cd_yess_no_var]);
  useEffect(() => {
    if (from_prescription_to_patients && cd_yess_no_var) {
      axios
        .delete(
          "http://localhost:3100/prescription/?PID=" +
            from_prescription_to_patients.PID
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, [from_prescription_to_patients]);
  useEffect(() => {
    if (presc_print_refer_to_admission && cd_yess_no_var) {
      axios
        .post("http://localhost:3100/refferedtoadmission", {
          presc_print_refer_to_admission,
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [presc_print_refer_to_admission]);

  useEffect(() => {
    setValue("date", new Date().toISOString().split("T")[0]);
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit(handle_edit_patiend_bed)}
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
            setpresc_print_refer_to_admission(
              prescription_show_patient_detail_rest_pres_form_var.PID
            );
            dispatch(cd_open_close(true));
          }}
        >
          REFER TO ADMISSION
        </button>
      </div>
      {show_lab_test_form && <Test_from_dr_to_lab />}
    </>
  );
});

function Test_from_dr_to_lab() {
  const [data_for_lab, setdata_for_lab] = useState();
  const prescription_show_patient_detail_rest_pres_form_var = useSelector(
    (state) => state.prescription_show_patient_detail_rest_pres_form
  );
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
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tests",
  });

  function handle_lab_testFun(data) {
    setdata_for_lab(data);
    console.log("test formm");
    reset();
  }

  useEffect(() => {
    axios
      .post("http://localhost:3100/labtests", { ...data_for_lab })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
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
        <div className="profile_label_input ">
          <label className="profile_lanel_input_label">Patient Doctor:</label>
          <p>{prescription_show_patient_detail_rest_pres_form_var.doctor}</p>
        </div>
        <div className="profile_label_input ">
          <label className="profile_lanel_input_label">Date:</label>
          <input name="date" value={new Date().toISOString().split("T")[0]} />
        </div>
        <div className="profile_label_input ">
          <label className="profile_lanel_input_label">Time:</label>
          <input
            // value={new Date().toLocaleString("en-US", {
            //   timeFormat: "HH:mm:ss",
            // })}
            name="time"
            value={new Date().toLocaleTimeString()}
          />
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
        {/* </div> */}

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
