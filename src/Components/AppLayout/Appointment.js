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
    name: Yup.string().required("Name is Required"),
    patient_dis: Yup.string().required("Describe your problem"),
    age: Yup.number().required("Age is required").typeError("Age is required"),
    contact_num: Yup.number()
      .required("Contact Number is required")
      .typeError("Contact Number is required"),
    email: Yup.string().email("Enter Valid Email Address"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    // doctor: Yup.string().required("Doctor is required"),
    address: Yup.string().max(
      100,
      "Adress should not be greater than 100 characters"
    ),
    // postcode: Yup.number().typeError("Postcode must be a number"),
    email_sms_phone: Yup.array()
      .min(1, "Please select atleast one of your choice")
      .typeError("Please select atleast one of your choice"),
    physical_online_appointment: Yup.array()
      .min(1, "Please select only one of your choice")
      .typeError("Please select only one of your choice"),
    date: Yup.date(new Date().toISOString().split("T")[0], "Date is required")
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

  const handle_appointment_fun = (data) => {
    setappointment_new_patient_data(data);
    dispatch(cd_open_close(true));
  };
  // if (cd_yess_no_var) {
  //   console.log("resett");
  // }

  useEffect(() => {
    if (cd_yess_no_var && appointment_new_patient_data) {
      reset();
      console.log("rest and upload");
      axios
        .post("http://localhost:3100/newpatients", {
          ...appointment_new_patient_data,
          PID: uuidv4(),
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            {...register("name")}
          />
          <p className="pForForm pForForm_appointment">
            {errors.name?.message}
          </p>
          <label htmlFor="patient_dis">Write about your Problem!</label>
          <div>
            <textarea
              name="patient_dis"
              id="patient_dis"
              rows="3"
              cols="10"
              {...register("patient_dis")}
              placeholder="Write about your problem"
              style={{
                margin: "10px",
                width: "96%",
              }}
            />
          </div>
          <p className="pForForm pForForm_appointment">
            {errors.patient_dis?.message}
          </p>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="text"
            placeholder="Enter Your Contact Number"
            {...register("age")}
          />
          <p className="pForForm pForForm_appointment">{errors.age?.message}</p>
          <label htmlFor="doctor">Choose Doctor</label>
          <select
            type="select"
            id="doctor"
            name="doctor"
            form="donationForm"
            {...register("doctor")}
          >
            <option value={""} disabled selected>
              ..select an option..
            </option>
            {doctors_from_backend.map((doctor, id) => {
              return (
                <option key={id} value={doctor.name}>
                  {doctor.name}
                </option>
              );
            })}
          </select>
          <p className="pForForm pForForm_appointment">
            {errors.doctor?.message}
          </p>
          <label htmlFor="contact_num">Contact Number</label>
          <input
            id="contact_num"
            name="contact_num"
            type="text"
            placeholder="Enter Your Contact Number"
            {...register("contact_num")}
          />
          <p className="pForForm pForForm_appointment">
            {errors.contact_num?.message}
          </p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter Your Email"
            {...register("email")}
          ></input>
          <p className="pForForm pForForm_appointment">
            {errors.email?.message}
          </p>
          <label htmlFor="city">Choose Country</label>
          <select
            type="select"
            id="country"
            name="country"
            form="donationForm"
            {...register("country")}
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
            {errors.country?.message}
          </p>
          <label htmlFor="city">Choose City</label>
          <select
            type="select"
            id="city"
            name="city"
            form="donationForm"
            {...register("city")}
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
            {errors.city?.message}
          </p>

          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Enter Your Address"
            {...register("address")}
          />
          <p className="pForForm pForForm_appointment">
            {errors.address?.message}
          </p>
          <label htmlFor="date">Enter Date for an Appointment:</label>
          <input
            {...register("date")}
            id="date"
            type="date"
            placeholder="Enter Date For an Appointment"
          ></input>
          <p className="pForForm pForForm_appointment">
            {errors.date?.message}
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
            {errors.postcode?.message}
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
                {" "}
                May we contact you by email?*
              </label>
              <input
                type="checkbox"
                id="informingemail"
                name="email_sms_phone"
                value="informemail"
                {...register("email_sms_phone")}
              />
            </span>
            <span>
              <label htmlFor="informingsms"> May we contact you by SMS?*</label>
              <input
                type="checkbox"
                id="informingsms"
                name="email_sms_phone"
                value="informsms"
                {...register("email_sms_phone")}
              ></input>
            </span>
            <span>
              <label htmlFor="informingphone">
                May we contact you by Phone?*
              </label>
              <input
                type="checkbox"
                id="informingphone"
                name="email_sms_phone"
                value="informphone"
                {...register("email_sms_phone")}
              />
              <p className="pForForm pForForm_appointment">
                {errors.email_sms_phone?.message}
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
                name="physical_online_appointment"
                value="physicalappointment"
                checked={isChecked_physical_appointment}
                {...register("physical_online_appointment")}
                onChange={handleChangePhysical}
              />
              <p className="pForForm pForForm_appointment">
                {errors.physicalappointment?.message}
              </p>
            </span>
            <span>
              <label htmlFor="onlineappointment"> Online Appointment </label>
              <input
                type="checkbox"
                id="onlineappointment"
                name="physical_online_appointment"
                value="onlineappointment"
                checked={isChecked_online_appointment}
                {...register("physical_online_appointment")}
                onChange={handleChangeOnline}
              />
              <p className="pForForm pForForm_appointment">
                {errors.physical_online_appointment?.message}
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
