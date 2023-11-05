import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function PatComplaints() {
  const [data_of_patient_appointments, setdata_of_patient_appointments] =
    useState();
  const [patient_complaint_data, setpatient_complaint_data] = useState();

  const newpatient_complaint_schema = Yup.object().shape({
    patient_complaints: Yup.string()
      .required("Complaint is required")
      .min(150, "Complaint should not be less than 150 characters"),
  });
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(newpatient_complaint_schema),
  });
  function handle_patient_complaint(data) {
    let confirmm = window.confirm("Are you sure you want to fire a Complaint!");
    if (confirmm) {
      setpatient_complaint_data(data);
    }
  }
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/patients/31feb58e-8044-4cfc-b528-24829165eef4"
      )
      .then((res) => {
        setdata_of_patient_appointments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (patient_complaint_data) {
      axios
        .post("http://localhost:8000/allikhwa-hms/patient-complaints/", {
          ...patient_complaint_data,
          patient: data_of_patient_appointments.patient_UID,
        })
        .then((res) => {
          setpatient_complaint_data(false);
          reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [patient_complaint_data]);
  return (
    <>
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
        <h2 className="fillfreebeds_h2">FIRE A COMPLAINT</h2>
        <form onSubmit={handleSubmit(handle_patient_complaint)}>
          <div className="profile_label_input ">
            <label htmlFor="PID" className="profile_lanel_input_label">
              PID:
            </label>
            <p>{data_of_patient_appointments?.patient_UID}</p>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="name" className="profile_lanel_input_label">
              Name:
            </label>
            <p>{data_of_patient_appointments?.patient_name}</p>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="Age" className="profile_lanel_input_label">
              Age:
            </label>
            <p>{data_of_patient_appointments?.patient_age}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="patient_complaints"
              className="profile_lanel_input_label"
            >
              Write about your Complaint!
            </label>
            <textarea
              name="patient_complaints"
              id="patient_dis"
              rows="3"
              cols="5"
              {...register("patient_complaints")}
              placeholder="Write about your problem"
              style={{
                maxWidth: "80%",
                padding: "5px",
              }}
            />
            <p className="pForForm ">{errors.patient_complaints?.message}</p>
          </div>
          <input
            type="submit"
            className="admin_buttons_add_update_from_add_update_form"
            value="Submit Your Complaint"
            style={{
              margin: "10px 25% 20px 25%",
              width: "50%",
            }}
          />
        </form>
      </div>
    </>
  );
}

export default PatComplaints;
