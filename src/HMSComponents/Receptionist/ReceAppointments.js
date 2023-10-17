import "./RecemAppointments.css";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cd_open_close, cd_yess_no } from "../../Store/Store";

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
  const [show_patient_details, setshow_patient_details] = useState(false);
  const [physical_online_appointment, setphysical_online_appointment] =
    useState("");
  const [email_sms_phone, setemail_sms_phone] = useState("");
  useState("");
  const [newpatients_to_appoint, setnewpatients_to_appoint] = useState();
  const [newpatients_to_appoint_delete, setnewpatients_to_appoint_delete] =
    useState();
  const cd_yess_no_var = useSelector((state) => state.cd_yess_no);
  const dispatch = useDispatch();
  const prescription_show_patient_detail_rest_pres_form = useRef();

  const newpatient_to_appoint_schema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    patient_dis: Yup.string().required("Describe your problem"),
    age: Yup.number().required("Age is required").typeError("Age is required"),
    contact_num: Yup.number()
      .required("Contact Number is required")
      .typeError("Contact Number is required"),
    email: Yup.string().email("Enter Valid Email Address"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    doctor: Yup.string().required("Doctor is required"),
    address: Yup.string().max(
      100,
      "Adress should not be greater than 100 characters"
    ),
    date: Yup.date("Date is required")
      .typeError("Date is required")
      .required("Date is Required"),
    department: Yup.string()
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

  function Newpatient_to_appoint(data) {
    dispatch(cd_open_close(true));
    setnewpatients_to_appoint(data);
  }
  ////////////////////////
  useEffect(() => {
    axios
      .get("http://localhost:3100/newpatients")
      .then((res) => [setpatientData(res.data)])
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (newpatients_to_appoint && cd_yess_no_var) {
      const {
        physical_online_appointment: physical_online_appointment,
        email_sms_phone: email_sms_phone,
        ...restfor_appointments
      } = newpatients_to_appoint;
      console.log(restfor_appointments);
      axios
        .post("http://localhost:3100/appointments", {
          //  this sould be uploaded to patients for an appointment from eAppointments
          ...restfor_appointments,
        })
        .catch((error) => {
          console.log(error);
        });
      reset();
      dispatch(cd_yess_no(false));
    }
  }, [newpatients_to_appoint, cd_yess_no_var]);
  useEffect(() => {
    if (newpatients_to_appoint_delete && cd_yess_no_var) {
      axios
        .delete(
          "http://localhost:3100/newpatients/?PID=" +
            newpatients_to_appoint_delete
        )
        .catch((error) => {
          console.log(error);
        });
      dispatch(cd_yess_no(false));
    }
  }, [newpatients_to_appoint_delete, cd_yess_no_var]);
  return (
    <>
      <h2 className="fillfreebeds_h2">APPOINTMENT REQUESTS FROM WEB</h2>

      {show_patient_details && (
        <div
          ref={prescription_show_patient_detail_rest_pres_form} // this ref is for ecrolling to this div element from edit details scrollintoview
          className="profile_information_all"
          style={{
            borderRadius: "8px",
            margin: "10px auto 10px auto",
            boxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
            webkitboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
            mozboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
          }}
        >
          <h2 className="fillfreebeds_h2">
            Submit the Details for an Appointment with the Doctor or Update the
            Details
          </h2>
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
              <label htmlFor="PID" className="profile_lanel_input_label">
                PID:
              </label>
              <input
                {...register("PID")}
                id="contact"
                type="text"
                placeholder="Enter Patient ID Given By Hospital"
              ></input>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="name" className="profile_lanel_input_label">
                Name:
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Enter Name of the patient"
              ></input>
              <p className="pForForm">{errors.name?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="Age" className="profile_lanel_input_label">
                Age:
              </label>
              <input
                id="age"
                type="text"
                {...register("age")}
                placeholder="Enter Patient Age"
              ></input>
              <p className="pForForm">{errors.age?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="patient_dis"
                className="profile_lanel_input_label"
              >
                Write about your Problem!
              </label>
              <textarea
                name="patient_dis"
                id="patient_dis"
                rows="3"
                cols="5"
                {...register("patient_dis")}
                placeholder="Write about your problem"
                style={{
                  width: "73%",
                }}
              />
              <p className="pForForm ">{errors.patient_dis?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="doctor" className="profile_lanel_input_label">
                Doctor
              </label>
              <input
                id="age"
                type="text"
                {...register("doctor")}
                placeholder="Enter Patient Age"
              ></input>
              <p className="pForForm ">{errors.doctor?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="department" className="profile_lanel_input_label">
                Department:
              </label>
              <input
                {...register("department")}
                id="department"
                type="text"
                placeholder="Enter Patient Department"
              ></input>
              <p className="pForForm">{errors.department?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="contact_num"
                className="profile_lanel_input_label"
              >
                {" "}
                Contact:
              </label>
              <input
                {...register("contact_num")}
                id="contact_num"
                type="text"
                placeholder="Enter Contact Information of Patient"
              ></input>
              <p className="pForForm">{errors.contact_num?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="email" className="profile_lanel_input_label">
                Email:
              </label>
              <input
                {...register("email")}
                id="email"
                type="text"
                placeholder="Enter Free Available Beds"
              ></input>
              <p className="pForForm">{errors.email?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="country">Country:</label>
              <input
                id="country"
                type="text"
                {...register("country")}
                placeholder="Enter Patient Age"
              ></input>
              <p className="pForForm ">{errors.country?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="city">City:</label>
              <input
                id="city"
                type="text"
                {...register("city")}
                placeholder="Enter Patient Age"
              ></input>
              <p className="pForForm ">{errors.city?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="address" className="profile_lanel_input_label">
                {" "}
                Address:
              </label>
              <input
                {...register("address")}
                id="address"
                type="text"
                placeholder="Enter Patient Address"
              ></input>
              <p className="pForForm">{errors.address?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="date" className="profile_lanel_input_label">
                Date:
              </label>
              <input
                {...register("date")}
                id="date"
                type="date"
                placeholder="Enter Patient Admission Date"
              ></input>
              <p className="pForForm">{errors.date?.message}</p>
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
                        <td>{patdet.name}</td>
                        <td>{patdet.age}</td>
                        <td>{patdet.doctor}</td>
                        <td>{patdet.contact_num}</td>
                        <td>{patdet.city}</td>
                        <td>{patdet.date?.split("T")[0]}</td>
                        <td>
                          <span
                            style={{
                              fontSize: "25px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              dispatch(cd_open_close(true));
                              setnewpatients_to_appoint_delete(patdet.PID);
                            }}
                          >
                            <AiFillCloseCircle />
                          </span>
                        </td>
                        <td
                          onClick={() => {
                            setshow_patient_details(true);
                            setValue("name", patdet.name);
                            setValue("PID", patdet.PID);
                            setValue("city", patdet.city);
                            setValue("country", patdet.country);
                            setValue("doctor", patdet.doctor);
                            setValue("adress", patdet.address);
                            setValue("contact_num", patdet.contact_num);
                            setValue("age", patdet.age);
                            setValue("patient_dis", patdet.patient_dis);
                            setValue("date", patdet.date?.split("T")[0]);
                            setValue("email", patdet.email);
                            setphysical_online_appointment(
                              patdet.physical_online_appointment
                            );
                            setemail_sms_phone(patdet.email_sms_phone);
                            prescription_show_patient_detail_rest_pres_form.current?.scrollIntoView();
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
