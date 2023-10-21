import "./Appointment.css";
import NavBar from "./NavBar";
import ConfirmDialogue from "../../ForAll/ConfirmDialogue";
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cd_open_close, cd_yess_no } from "../../Store/Store";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Practice from "./Practice";

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
const countries = [
  {
    id: 1,
    name: "Afghanistan",
    currency: "AFN",
    phone: 93,
    capital: "Kabul",
    code: "AF",
    code3: "AFG",
    number: 4,
  },
  {
    id: 2,
    name: "South Africa",
    currency: "ZAR",
    phone: 27,
    capital: "Pretoria",
    code: "ZA",
    code3: "ZAF",
    number: 710,
  },
  {
    id: 3,
    name: "Albania",
    currency: "ALL",
    phone: 355,
    capital: "Tirana",
    code: "AL",
    code3: "ALB",
    number: 8,
  },
  {
    id: 4,
    name: "Germany",
    currency: "EUR",
    phone: 49,
    capital: "Berlin",
    code: "DE",
    code3: "DEU",
    number: 276,
  },
  {
    id: 5,
    name: "Andorra",
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

function Appointment() {
  const [doctor_names, setDoctor_names] = useState();
  const [isChecked_physical_appointment, setisChecked_physical_appointment] =
    useState(false);
  const [isChecked_online_appointment, setisChecked_online_appointment] =
    useState(false);
  const [appointment_new_patient_data, setappointment_new_patient_data] =
    useState();
  const dispatch = useDispatch();
  const cd_yess_no_var = useSelector((state) => state.cd_yess_no);
  const cd_open_close_var = useSelector((state) => state.cd_open_close);

  const handleChangePhysical = () => {
    setisChecked_physical_appointment(!isChecked_physical_appointment);
    if (isChecked_online_appointment) {
      setisChecked_online_appointment(!isChecked_online_appointment);
    }
  };

  const handleChangeOnline = () => {
    setisChecked_online_appointment(!isChecked_online_appointment);
    if (isChecked_physical_appointment) {
      setisChecked_physical_appointment(!isChecked_physical_appointment);
    }
  };

  const appointment_validation_schema = Yup.object().shape({
    // Sign Up Form Validation
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
    // doctor: Yup.string().required("Doctor is required"),
    patient_address: Yup.string().max(
      100,
      "Adress should not be greater than 100 characters"
    ),
    // postcode: Yup.number().typeError("Postcode must be a number"),
    patient_emailsmsphone: Yup.array()
      .min(1, "Please select atleast one of your choice")
      .typeError("Please select atleast one of your choice"),
    patient_physicalonlineappointment: Yup.array()
      .min(1, "Please select only one of your choice")
      .typeError("Please select only one of your choice"),
    patient_eappointmentdate: Yup.date(
      new Date().toISOString().split("T")[0],
      "Date is required"
    )
      .typeError("Date is required")
      .min(
        new Date().toISOString().split("T")[0],
        "Date should not be less than the current Date!"
      )
      .required("Date is Required"),
  });

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(appointment_validation_schema),
  });

  // this function is for formating date into YYY-MM-DDD format to properly send it to django backend in the 2023-10-19 date format
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handle_appointment_fun = (data) => {
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
      patient_emailsmsphone,
      patient_physicalonlineappointment,
      patient_doctor,
    } = data;

    setappointment_new_patient_data({
      patient_name: patient_name,
      patient_problem: patient_problem,
      patient_age: patient_age,
      patient_contact: patient_contact,
      patient_country: patient_country,
      patient_city: patient_city,
      patient_address: patient_address,
      patient_email: patient_email,
      patient_doctor,
      patient_eappointmentdate: formatDateToYYYYMMDD(patient_eappointmentdate),
      patient_emailsmsphone: patient_emailsmsphone[0],
      patient_physicalonlineappointment: patient_physicalonlineappointment[0],
    });
    dispatch(cd_open_close(true));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/allikhwa-hms/doctor-names/")
      .then((res) => {
        setDoctor_names(res.data);
      });
  }, []);
  useEffect(() => {
    if (cd_yess_no_var && appointment_new_patient_data) {
      reset();
      axios
        .post("http://localhost:8000/allikhwa-hms/e-appointments/", {
          ...appointment_new_patient_data,
          patient_UID: uuidv4(),
        })
        .then((res) => {
          console.log("runnnnnnnnnnnnnnnnnnnnn showwwwwwwwwwwwwwwwwww");
          setisChecked_physical_appointment(false);
          setisChecked_online_appointment(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(cd_yess_no(false));
    }
  }, [appointment_new_patient_data, cd_yess_no_var]);
  return (
    <>
      {/* <Practice /> */}
      {cd_open_close_var && <ConfirmDialogue />}
      <NavBar />
      <div className="donatetop">
        {/* the class statisticsonlineconsul has been taken from statistics .css file  */}
        <div
          className="statisticsonlineconsul"
          style={{ width: "fit-content", margin: "auto" }}
        >
          Appointment Services
        </div>
        <span>
          <div>WE ARE AT YOUR SERVICE</div>
          <div>USE THIS FORM ONLY FOR AN APPOINTMENT</div>
        </span>
        <p>
          After you submit the form, a representative will call you back with
          the information you’ll need to make an appointment. You may also speak
          with a representative directly Monday–Friday, 8:30 am to 5:00 pm EST
          by calling 0092 3334483486.{" "}
          <h4>
            ALL FIELDS ARE MANDATORY FOR YOUR APPOINTMENT PLEASE PROVIDE VALID
            INFORMATION.
          </h4>
          <br />
          <br />
          <h4 style={{ color: "red" }}>
            Please call 1122 if you are experiencing a medical emergency.
          </h4>
        </p>
        <h3 style={{ margin: "20px auto" }}>
          Submit Your Appointment Details:
        </h3>
        <form
          onSubmit={handleSubmit(handle_appointment_fun)}
          id="donationForm"
          className="donationformclass"
          style={{ overflow: "scroll" }}
        >
          <label htmlFor="patient_name">Name</label>
          <input
            id="patient_name"
            type="text"
            placeholder="Enter Your Name"
            {...register("patient_name")}
          />
          <p className="pForForm pForForm_appointment">
            {errors.patient_name?.message}
          </p>
          <label htmlFor="patient_problem">Write about your Problem!</label>
          <div>
            <textarea
              name="patient_problem"
              id="patient_problem"
              rows="3"
              cols="10"
              {...register("patient_problem")}
              placeholder="Write about your problem"
              style={{
                margin: "10px",
                width: "95%",
                maxWidth: "95%",
              }}
            />
          </div>
          <p className="pForForm pForForm_appointment">
            {errors.patient_problem?.message}
          </p>
          <label htmlFor="patient_age">Age</label>
          <input
            id="patient_age"
            name="patient_age"
            type="text"
            placeholder="Enter Your Age"
            {...register("patient_age")}
          />
          <p className="pForForm pForForm_appointment">{errors.age?.message}</p>
          <label htmlFor="patient_doctor">Choose Doctor</label>
          <select
            type="select"
            id="patient_doctor"
            name="patient_doctor"
            form="donationForm"
            {...register("patient_doctor")}
          >
            <option value={""} disabled selected>
              ..select an option..
            </option>
            {doctor_names &&
              doctor_names.map((doctor, id) => {
                return (
                  <option key={id} value={doctor.doctor_names}>
                    {doctor.doctor_names}
                  </option>
                );
              })}
          </select>
          <p className="pForForm pForForm_appointment">
            {errors.patient_doctor?.message}
          </p>
          <label htmlFor="patient_contact">Contact Number</label>
          <input
            id="patient_contact"
            name="patient_contact"
            type="text"
            placeholder="Enter Your Contact Number"
            {...register("patient_contact")}
          />
          <p className="pForForm pForForm_appointment">
            {errors.patient_contact?.message}
          </p>
          <label htmlFor="patient_email">Email</label>
          <input
            id="patient_email"
            type="patient_email"
            placeholder="Enter Your Email"
            {...register("empatient_emaill")}
          ></input>
          <p className="pForForm pForForm_appointment">
            {errors.patient_email?.message}
          </p>
          <label htmlFor="patient_country">Choose Country</label>
          <select
            type="select"
            id="patient_country"
            name="patient_country"
            form="donationForm"
            {...register("patient_country")}
          >
            <option value={""} disabled selected>
              ..select an option..
            </option>
            {countries.map((country, id) => {
              return (
                <option key={id} value={country.name}>
                  {country.name}
                </option>
              );
            })}
          </select>
          <p className="pForForm pForForm_appointment">
            {errors.patient_country?.message}
          </p>
          <label htmlFor="patient_city">Choose City</label>
          <select
            type="select"
            id="patient_city"
            name="patient_city"
            form="donationForm"
            {...register("patient_city")}
          >
            <option value={""} disabled selected>
              {" "}
              ..select an option..
            </option>
            {countries.map((country, id) => {
              return (
                <option key={id} value={country.capital}>
                  {country.capital.toUpperCase()}
                </option>
              );
            })}
          </select>
          <p className="pForForm pForForm_appointment">
            {errors.patient_city?.message}
          </p>

          <label htmlFor="patient_address">Address</label>
          <input
            id="patient_address"
            type="text"
            placeholder="Enter Your Address"
            {...register("patient_address")}
          />
          <p className="pForForm pForForm_appointment">
            {errors.patient_address?.message}
          </p>
          <label htmlFor="patient_eappointmentdate">
            Enter Date for an Appointment:
          </label>
          <input
            {...register("patient_eappointmentdate")}
            id="patient_eappointmentdate"
            type="date"
            placeholder="Enter Date For an Appointment"
          ></input>
          <p className="pForForm pForForm_appointment">
            {errors.patient_eappointmentdate?.message}
          </p>
          {/* 
          <label htmlFor="postcode">Postcode</label>
          <input
            id="postcode"
            type="text"
            placeholder="Enter Your Postcode"
            {...register("postcode")}
          ></input>
          <p className="pForForm pForForm_appointment">
            {errors.postcode?.message}date
          </p> */}

          <div className="emailingduringdonation">
            <h3>Control how you hear from us</h3>
            <p>
              We would like to contact you from time to time to keep you
              informed of All'Ikhwa projects, fundraising activities and
              appeals. We will not share your data and you can unsubscribe at
              any time.
            </p>
            <span>
              <label htmlFor="informingemail">
                May we contact you by email?*
              </label>
              <input
                type="checkbox"
                id="informingemail"
                name="patient_emailsmsphone"
                value="informemail"
                {...register("patient_emailsmsphone")}
              />
            </span>
            <span>
              <label htmlFor="informingsms"> May we contact you by SMS?*</label>
              <input
                type="checkbox"
                id="informingsms"
                name="patient_emailsmsphone"
                value="informsms"
                {...register("patient_emailsmsphone")}
              ></input>
            </span>
            <span>
              <label htmlFor="informingphone">
                May we contact you by Phone?*
              </label>
              <input
                type="checkbox"
                id="informingphone"
                name="patient_emailsmsphone"
                value="informphone"
                {...register("patient_emailsmsphone")}
              />
              <p className="pForForm pForForm_appointment">
                {errors.patient_emailsmsphone?.message}
              </p>
            </span>
          </div>
          <div className="emailingduringdonation">
            <h3>Please select one out of two</h3>
            <p>
              You will be contacted soon from our staff member within 24 hours
              but if we did not reached you, You can simply contact us through
              0092 3334483486
            </p>
            <span>
              <label htmlFor="physicalappointment">
                {" "}
                Physical Appointment{" "}
              </label>
              <input
                type="checkbox"
                id="physicalappointment"
                name="patient_physicalonlineappointment"
                value="physicalappointment"
                checked={isChecked_physical_appointment}
                {...register("patient_physicalonlineappointment")}
                onChange={handleChangePhysical}
              />
            </span>
            <span>
              <label htmlFor="patient_onlineappointment">
                Online Appointment
              </label>
              <input
                type="checkbox"
                id="patient_onlineappointment"
                name="patient_physicalonlineappointment"
                value="onlineappointment"
                checked={isChecked_online_appointment}
                {...register("patient_physicalonlineappointment")}
                onChange={handleChangeOnline}
              />
              <p className="pForForm pForForm_appointment">
                {errors.patient_physicalonlineappointment?.message}
              </p>
            </span>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Appointment;
