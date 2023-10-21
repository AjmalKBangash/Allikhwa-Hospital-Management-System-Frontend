import "./RecemAppointments.css";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cd_open_close, cd_yess_no } from "../../Store/Store";
import { v4 as uuidv4 } from "uuid";

// Icons
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDetails } from "react-icons/md";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";

const doctors_from_backend = [
  {
    id: 1,
    name: "Hassan Khan",
    currency: "AFN",
    phone: 93,
    capital: "Kabul",
    code: "AF",
    code3: "AFG",
    number: 4,
  },
  {
    id: 2,
    name: "Maaz Khan Bangash",
    currency: "ZAR",
    phone: 27,
    capital: "Pretoria",
    code: "ZA",
    code3: "ZAF",
    number: 710,
  },
  {
    id: 3,
    name: "Husnain Bangash",
    currency: "ALL",
    phone: 355,
    capital: "Tirana",
    code: "AL",
    code3: "ALB",
    number: 8,
  },
  {
    id: 4,
    name: "Adnan Khan Bangash",
    currency: "EUR",
    phone: 49,
    capital: "Berlin",
    code: "DE",
    code3: "DEU",
    number: 276,
  },
  {
    id: 5,
    name: "Dr.Dur Kamil Bangash",
    currency: "EUR",
    phone: 376,
    capital: "Andorra la Vella",
    code: "AD",
    code3: "AND",
    number: 20,
  },
  {
    id: 6,
    name: "Angola",
    currency: "AOA",
    phone: 244,
    capital: "Luanda",
    code: "AO",
    code3: "AGO",
    number: 24,
  },
];

function ReceAppointments() {
  const [patientData, setpatientData] = useState();
  const [render_getmethod_on_deletion, setrender_getmethod_on_deletion] =
    useState(false);
  const [show_patient_details, setshow_patient_details] = useState(false);
  const [physical_online_appointment, setphysical_online_appointment] =
    useState("");
  const [email_sms_phone, setemail_sms_phone] = useState("");
  useState("");
  const [patient_UIDD, setpatient_UID] = useState("");
  useState("");
  const [newpatients_to_appoint, setnewpatients_to_appoint] = useState();
  const [newpatients_to_appoint_delete, setnewpatients_to_appoint_delete] =
    useState();
  const [uuids_for_appointment, setuuids_for_appointment] = useState();
  const [DeletionAppointment, setDeletionAppointment] = useState(false);
  const cd_yess_no_var = useSelector((state) => state.cd_yess_no);
  const dispatch = useDispatch();

  const newpatient_to_appoint_schema = Yup.object().shape({
    patient_UID: Yup.string().required("Patient ID is required"),
    patient_name: Yup.string().required("Name is Required"),
    patient_problem: Yup.string().required("Describe your problem"),
    patient_age: Yup.number()
      .required("Age is required")
      .typeError("Age is required"),
    patient_contact: Yup.number()
      .required("Contact Number is required")
      .typeError("Contact Number is required"),
    patient_email: Yup.string().email("Enter Valid Email Address"),
    patient_country: Yup.string().required("Country is required"),
    patient_city: Yup.string().required("City is required"),
    patient_doctor: Yup.string().required("Doctor is required"),
    patient_address: Yup.string().max(
      100,
      "Adress should not be greater than 100 characters"
    ),
    patient_eappointmentdate: Yup.date("Date is required")
      .typeError("Date is required")
      .required("Date is Required"),
    patient_department: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Department is Required"),
  });
  const {
    setValue,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(newpatient_to_appoint_schema),
  });

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function Newpatient_to_appoint(data) {
    dispatch(cd_open_close(true));
    let {
      patient_name,
      patient_problem,
      patient_age,
      patient_contact,
      patient_country,
      patient_city,
      patient_address,
      patient_email,
      patient_eappointmentdate,
      patient_doctor,
      patient_department,
    } = data;

    setnewpatients_to_appoint({
      // emailsms_phone and other physical_online fielda is not registered with react hook form so that will never be traaced and send to the stste
      patient_name: patient_name,
      patient_problem: patient_problem,
      patient_age: patient_age,
      patient_contact: patient_contact,
      patient_country: patient_country,
      patient_city: patient_city,
      patient_address: patient_address,
      patient_email: patient_email,
      patient_doctor: patient_doctor,
      patient_eappointmentdate: formatDateToYYYYMMDD(patient_eappointmentdate),
      patient_department: patient_department,
      patient_UID: patient_UIDD,
      // patient_NID: "",
      // patient_bloodgrp: "",
    });
    setuuids_for_appointment({
      patient_UID: patient_UIDD,
      patient_eappointmentdate: formatDateToYYYYMMDD(patient_eappointmentdate),
    });
  }

  ////////////////////////
  useEffect(() => {
    axios
      .get("http://localhost:8000/allikhwa-hms/e-appointments/")
      .then((res) => setpatientData(res.data))
      .catch((error) => {
        console.log(error);
      });
    setrender_getmethod_on_deletion(false);
  }, [render_getmethod_on_deletion]);
  useEffect(() => {
    if (newpatients_to_appoint && cd_yess_no_var) {
      axios
        .post(
          "http://localhost:8000/allikhwa-hms/patients/",
          //  this sould be uploaded to patients for an appointment from eAppointments
          // keep in mind while uploading data must check that you are sending data in the key value json format
          // and
          newpatients_to_appoint
        )
        .then((res) => {
          setnewpatients_to_appoint_delete(patient_UIDD);
          setDeletionAppointment(true);
        })
        .catch((error) => {
          console.log(error);
        });
      reset();
      setshow_patient_details(false);
      dispatch(cd_yess_no(false));
    }
  }, [newpatients_to_appoint, cd_yess_no_var]);
  useEffect(() => {
    if (newpatients_to_appoint && cd_yess_no_var) {
      axios
        .post(
          "http://localhost:8000/allikhwa-hms/uuids-for-appointments/",
          uuids_for_appointment
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, [uuids_for_appointment, cd_yess_no_var]);
  useEffect(() => {
    if (newpatients_to_appoint_delete && DeletionAppointment) {
      axios
        .delete(
          "http://localhost:8000/allikhwa-hms/e-appointments/" +
            newpatients_to_appoint_delete
        )
        .catch((error) => {
          console.log(error);
        });
      setrender_getmethod_on_deletion(true);
      setDeletionAppointment(false);
      setnewpatients_to_appoint_delete(false);
    }
  }, [newpatients_to_appoint_delete, DeletionAppointment]);
  return (
    <>
      <h2 className="fillfreebeds_h2">APPOINTMENT REQUESTS FROM WEB</h2>

      {show_patient_details && (
        <div
          className="profile_information_all"
          style={{
            borderRadius: "8px",
            margin: "10px auto 10px auto",
            boxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
            webkitboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
            mozboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
          }}
        >
          <h2 className="fillfreebeds_h2">SUBMIT FOR AN APPOINTMENT</h2>
          <h2
            className="fillfreebeds_h2"
            style={{
              position: "absolute",
              top: "0%",
              right: "2%",
              cursor: "pointer",
            }}
            onClick={() => setshow_patient_details(false)}
          >
            &#10060;
          </h2>
          <form onSubmit={handleSubmit(Newpatient_to_appoint)}>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_UID"
                className="profile_lanel_input_label"
              >
                PID:
              </label>
              <input
                name="patient_UID"
                {...register("patient_UID")}
                defaultValue={patient_UIDD}
                id="patient_UID"
                type="text"
                placeholder="Enter Patient ID Given By Hospital"
              ></input>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_name"
                className="profile_lanel_input_label"
              >
                Name:
              </label>
              <input
                id="patient_name"
                type="text"
                {...register("patient_name")}
                placeholder="Enter Name of the patient"
              ></input>
              <p className="pForForm">{errors.patient_name?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_age"
                className="profile_lanel_input_label"
              >
                Age:
              </label>
              <input
                id="patient_age"
                type="text"
                {...register("patient_age")}
                placeholder="Enter Patient Age"
              ></input>
              <p className="pForForm">{errors.patient_age?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_problem"
                className="profile_lanel_input_label"
              >
                Write about your Problem!
              </label>
              <textarea
                name="patient_problem"
                id="patient_problem"
                rows="3"
                cols="5"
                {...register("patient_problem")}
                placeholder="Write about your problem"
                style={{
                  width: "73%",
                }}
              />
              <p className="pForForm ">{errors.patient_problem?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_doctor"
                className="profile_lanel_input_label"
              >
                Doctor
              </label>
              <input
                id="patient_doctor"
                type="text"
                {...register("patient_doctor")}
                placeholder="Enter Doctor for Patient"
              ></input>
              <p className="pForForm ">{errors.patient_doctor?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_department"
                className="profile_lanel_input_label"
              >
                Department:
              </label>
              <input
                {...register("patient_department")}
                id="patient_department"
                type="text"
                placeholder="Enter Patient Department"
              ></input>
              <p className="pForForm">{errors.patient_department?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_contact"
                className="profile_lanel_input_label"
              >
                {" "}
                Contact:
              </label>
              <input
                {...register("patient_contact")}
                id="patient_contact "
                type="text"
                placeholder="Enter Contact Information of Patient"
              ></input>
              <p className="pForForm">{errors.patient_contact?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_email"
                className="profile_lanel_input_label"
              >
                Email:
              </label>
              <input
                {...register("patient_email")}
                id="patient_email"
                type="text"
                placeholder="Enter Your Email Address"
              ></input>
              <p className="pForForm">{errors.patient_email?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="patient_country">Country:</label>
              <input
                id="patient_country"
                type="text"
                {...register("patient_country")}
                placeholder="Enter Patient Country"
              ></input>
              <p className="pForForm ">{errors.patient_country?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="patient_city">City:</label>
              <input
                id="patient_city"
                type="text"
                {...register("patient_city")}
                placeholder="Enter Patient City"
              ></input>
              <p className="pForForm ">{errors.patient_city?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_address"
                className="profile_lanel_input_label"
              >
                {" "}
                Address:
              </label>
              <input
                {...register("patient_address")}
                id="patient_address"
                type="text"
                placeholder="Enter Patient Address"
              ></input>
              <p className="pForForm">{errors.patient_address?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_eappointmentdate"
                className="profile_lanel_input_label"
              >
                Date:
              </label>
              <input
                {...register("patient_eappointmentdate")}
                id="patient_eappointmentdate"
                type="date"
                placeholder="Enter Patient Appointment Date Apponted by the patient"
              ></input>
              <p className="pForForm">
                {errors.patient_eappointmentdate?.message}
              </p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="email_sms_phone"
                className="profile_lanel_input_label"
              >
                Patient Hearing:
              </label>
              <input
                // {...register("email_sms_phone")}
                value={email_sms_phone}
                id="email_sms_phone"
                type="text"
                placeholder="Enter Patient Hearing"
              ></input>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="physical_online_appointment"
                className="profile_lanel_input_label"
              >
                Patient Appearance:
              </label>
              <input
                // {...register("physical_online_appointment")}
                value={physical_online_appointment}
                id="physical_online_appointment"
                type="text"
                placeholder="Enter Patient Appointment Appearance"
              ></input>
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
      )}

      {/* ///////////////////////////////////////////////////////// */}
      <div className="rec_e_appointments_top">
        <div className="drappointments_patient_details">
          <div
            className="drappointments_patient_list"
            style={{ padding: "20px" }}
          >
            <h2 className="fillfreebeds_h2" style={{ marginTop: "0px" }}>
              PATIENT INFORMATION TABLE
            </h2>{" "}
            <table class="patient_GeneratedTable_details">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Doctor</th>
                  <th>Contact Num</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Delete</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {patientData ? (
                  patientData.map((patdet, id) => {
                    return (
                      <tr key={id}>
                        <td>{patdet.patient_name}</td>
                        <td>{patdet.patient_age}</td>
                        <td>{patdet.patient_doctor}</td>
                        <td>{patdet.patient_contact}</td>
                        <td>{patdet.patient_city}</td>
                        {/* <td>{patdet.date?.split("T")[0]}</td> */}
                        <td>{patdet.patient_eappointmentdate}</td>
                        <td>
                          <span
                            style={{
                              fontSize: "25px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              // dispatch(cd_open_close(true));
                              const result = window.confirm(
                                "Are you sure you want to delete an appointment?"
                              );
                              if (result) {
                                setDeletionAppointment(result);
                              }

                              setnewpatients_to_appoint_delete(
                                patdet.patient_UID
                              );
                            }}
                          >
                            <AiFillCloseCircle />
                          </span>
                        </td>
                        <td
                          onClick={() => {
                            setshow_patient_details(true);
                            setValue("patient_name", patdet.patient_name);
                            // setValue("PID", patdet.patient_UID); we are commenting it because we want to no one can generate it,
                            setpatient_UID(patdet.patient_UID);
                            setValue("patient_city", patdet.patient_city);
                            setValue("patient_country", patdet.patient_country);
                            setValue("patient_doctor", patdet.patient_doctor);
                            setValue("patient_address", patdet.patient_address);
                            setValue("patient_contact", patdet.patient_contact);
                            setValue("patient_age", patdet.patient_age);
                            setValue("patient_problem", patdet.patient_problem);
                            // setValue("date", patdet.date?.split("T")[0]);
                            setValue(
                              "patient_eappointmentdate",
                              patdet.patient_eappointmentdate
                            );
                            setValue("patient_email", patdet.patient_email);
                            setphysical_online_appointment(
                              patdet.patient_physicalonlineappointment
                            );
                            setemail_sms_phone(patdet.patient_emailsmsphone);
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
      </div>
    </>
  );
}

export default ReceAppointments;
