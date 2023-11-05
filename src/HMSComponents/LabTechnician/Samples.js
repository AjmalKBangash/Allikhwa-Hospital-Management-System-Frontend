import "./Samples.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Icons
import { MdDetails } from "react-icons/md";
import { RiMicroscopeFill } from "react-icons/ri";

//This is the page for new labtests
function Samples() {
  const [lab_new_samples, setlab_new_samples] = useState();
  const [_showPatient_Details, set_showPatient_Details] = useState(false);
  const [data_for_lab_test_result, setdata_for_lab_test_result] =
    useState(false);
  const [data_lab_test_result, setdata_lab_test_result] = useState();
  const [rerender_uuids_forlabtests, setrerender_uuids_forlabtests] =
    useState(false);
  const detail_column_patient_list = useRef();

  const prescription_validation_schema = Yup.object().shape({
    // Sign Up Form Validation
    date: Yup.string().required("Date is Required!"),
    // time: Yup.string().required("Time is required!"),
    tests: Yup.array().of(
      Yup.object().shape({
        testdetails: Yup.string().required("Test Details is required!"),
        testdescription: Yup.string().required("Test Discription is required!"),
      })
    ),
  });

  const {
    control,
    setValue,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(prescription_validation_schema),
    defaultValues: {
      tests: [{ testdetails: "", testdescription: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tests",
  });
  // function formatDateToYYYYMMDD(date) {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // }
  let listt = [];
  function handle_lab_test_result(data) {
    data.tests.map((test, index) => {
      listt.push(test.testdetails, test.testdescription);
    });
    const result = listt.join(" > ");
    console.log(result, data.date);
    const answer = window.confirm(
      "Are you sure you want to submit test resultg along with deleting patient from list?"
    );
    if (answer) {
      setdata_lab_test_result({
        patient: data_for_lab_test_result.patient_UID,
        patient_tests: result,
        patient_testdate: data.date,
      });
    }
  }

  // UUIDS FOR OF LAB TESTS PATIENTS
  useEffect(() => {
    axios
      .get("http://localhost:8000/allikhwa-hms/uuids-for-lab-tests/")
      .then((res) => {
        setlab_new_samples(res.data);
        setrerender_uuids_forlabtests(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rerender_uuids_forlabtests]);

  // LAB TESTS OF PATIENTS
  useEffect(() => {
    if (data_lab_test_result) {
      axios
        .post(
          "http://localhost:8000/allikhwa-hms/patient-lab-tests/",
          data_lab_test_result
        )
        .then((res) => {
          // console.log(res.data);
          // reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data_lab_test_result]);
  useEffect(() => {
    if (data_lab_test_result) {
      axios
        .delete(
          "http://localhost:8000/allikhwa-hms/uuids-for-lab-tests/" +
            data_for_lab_test_result.patient_UID
        )
        .then((res) => {
          //   dispatch(prescription_show_patient_detail_rest_pres_form(false));
          setdata_for_lab_test_result(false);
          setrerender_uuids_forlabtests(true);
          set_showPatient_Details(false);

          reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data_lab_test_result]);
  return (
    <div style={{ width: "95%", margin: "0 auto" }}>
      <div>
        <h2 className="fillfreebeds_h2">PATIENT DATA FOR LAB TEST </h2>
        <form
          onSubmit={handleSubmit(handle_lab_test_result)}
          id="test_result_form"
          className="handle_lab_test_result_form"
        >
          {/* <div className="presc_third presc_1234"> */}
          <h2 className="fillfreebeds_h2">PATIENT LAB TEST FORM</h2>
          <div className="profile_label_input prescription_editing_to_form_of_patient">
            <div>Patient ID:</div>
            <div style={{ width: "70%" }}>
              {data_for_lab_test_result?.patient_UID}
            </div>
          </div>
          <div className="profile_label_input prescription_editing_to_form_of_patient">
            <div>Name:</div>
            <div style={{ width: "70%" }}>
              {data_for_lab_test_result?.patient_name}
            </div>
          </div>
          <div className="profile_label_input prescription_editing_to_form_of_patient">
            <div>Age:</div>
            <div style={{ width: "70%" }}>
              {data_for_lab_test_result?.patient_age}
            </div>
          </div>
          <div className="profile_label_input prescription_editing_to_form_of_patient">
            <label htmlFor="date" className="profile_lanel_input_label">
              Date:
            </label>
            <input
              {...register("date")}
              id="date"
              type="date"
              placeholder="Enter Patient Test Date"
            ></input>
            <p className="pForForm">{errors.date?.message}</p>
          </div>
          {/* <div className="profile_label_input prescription_editing_to_form_of_patient">
            <label htmlFor="date" className="profile_lanel_input_label">
              Time:
            </label>
            <input
              {...register("time")}
              id="time"
              type="time"
              placeholder="Enter Patient Test Time"
            ></input>
            <p className="pForForm">{errors.time?.message}</p>
          </div> */}

          {fields.map((field, index) => (
            <div
              className="appointment_pricing_top_row02_col02_dynamic_fields"
              key={field.id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label
                  htmlFor={`tests.${index}.testdetails`}
                  className="profile_lanel_input_label"
                >
                  Prescribed Test Details:
                </label>
                <textarea
                  cols="30"
                  rows="3"
                  placeholder="Enter Patient Test Details"
                  {...register(`tests.${index}.testdetails`)}
                  style={{ maxWidth: "70%" }}
                ></textarea>
                {errors.tests &&
                  errors.tests[index] &&
                  errors.tests[index].testdetails && (
                    <p className="pForForm">
                      {errors.tests[index].testdetails.message}
                    </p>
                  )}
              </div>
              <div className="profile_label_input prescription_editing_to_form_of_patient">
                <label
                  htmlFor={`tests.${index}.testdescription`}
                  className="profile_lanel_input_label"
                >
                  Test Description:
                </label>
                <textarea
                  cols="30"
                  rows="3"
                  placeholder="Enter your Instructions for patient to follow"
                  {...register(`tests.${index}.testdescription`)}
                  style={{ maxWidth: "70%" }}
                ></textarea>
                {errors.tests &&
                  errors.tests[index] &&
                  errors.tests[index].testdescription && (
                    <p className="pForForm">
                      {errors.tests[index].testdescription.message}
                    </p>
                  )}
              </div>
              <div>
                {fields.length !== 1 && (
                  <button
                    className="pricing_button"
                    onClick={() => remove(index)}
                  >
                    Remove the Test Details:
                  </button>
                )}
                {fields.length - 1 === index && (
                  <button
                    className="pricing_button"
                    onClick={() =>
                      append({ testdetails: "", testdescription: "" })
                    }
                  >
                    Add Another Test Details:
                  </button>
                )}
              </div>
            </div>
          ))}
          {/* </div> */}
          <input
            type="submit"
            className="admin_buttons_add_update_from_add_update_form"
            value="SUBMIT THE TEST RESULT"
            style={{
              margin: "10px 25% 10px 25%",
              width: "50%",
            }}
          />
        </form>
        {_showPatient_Details && (
          <div
            className="drappointments_patient_details"
            style={{ padding: "2px 10px", width: "80%", position: "relative" }}
          >
            <div
              className="col2indocdetails"
              style={{ margin: "20px auto 20px auto", width: "95%" }}
              ref={detail_column_patient_list}
            >
              <h2 className="fillfreebeds_h2">PATIENT DATA </h2>
              <h2
                className="fillfreebeds_h2"
                style={{
                  position: "absolute",
                  top: "0%",
                  right: "2%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  set_showPatient_Details(false);
                }}
              >
                &#10060;
              </h2>
              <h2
                className="fillfreebeds_h2 patient_details_edit_icon"
                style={{
                  position: "absolute",
                  top: "0%",
                  left: "2%",
                }}
                onClick={() => {
                  setdata_for_lab_test_result(_showPatient_Details);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                <RiMicroscopeFill />
              </h2>

              <table className="employee_GeneratedTable">
                <tbody>
                  <tr>
                    <td>PID</td>
                    <td>{_showPatient_Details.patient_UID}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td> {_showPatient_Details.patient_name}</td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>{_showPatient_Details.patient_department}</td>
                  </tr>
                  <tr>
                    <td>Last Appointment Date</td>
                    <td>{_showPatient_Details.patient_eappointmentdate}</td>
                  </tr>
                  <tr>
                    <td>Tests to be done</td>
                    <td>{_showPatient_Details.patient_tests}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="drappointments_patient_details">
        <h2 className="fillfreebeds_h2">PATIENT DATA </h2>
        <div className="drappointments_patient_list">
          <table class="patient_GeneratedTable_details">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Patient ID</th>
                <th>Patient Department</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {lab_new_samples ? (
                lab_new_samples.map((patsam, id) => {
                  return (
                    <tr key={id}>
                      <td>{patsam.patient_name}</td>
                      <td>{patsam.patient_UID}</td>
                      <td>{patsam.patient_department}</td>
                      <td
                        onClick={() => {
                          set_showPatient_Details(patsam);
                          detail_column_patient_list.current?.scrollIntoView({
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
    </div>
  );
}

export default Samples;
