import "./RecemAppointments.css";
import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuidv4, validate } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  cd_open_close,
  cd_yess_no,
  recmappointment_patient_billing_price,
  submit_bill_price_work,
} from "../../Store/Store";
// Pricing Paper Started
import ReactToPrint from "react-to-print";
import { forwardRef } from "react";
import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";

// Icons
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDetails } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GiWorld } from "react-icons/gi";

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

function RecmAppointments() {
  const [newpatients_to_appoint, setnewpatients_to_appoint] = useState("");
  const [submit_true_for_print, setsubmit_true_for_print] = useState(false);
  const cd_yess_no_var = useSelector((state) => state.cd_yess_no);
  const pricing_ref_for_printing_component = useRef();
  const dispatch = useDispatch();

  const newpatient_to_appoint_schema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    patient_dis: Yup.string(),
    // .required("Describe your problem"),
    age: Yup.number().required("Age is required").typeError("Age is required"),
    contact_num: Yup.number()
      // .required("Contact Number is required")
      .typeError("Contact Number is required"),
    email: Yup.string().email("Enter Valid Email Address"),
    country: Yup.string(),
    // .required("Country is required"),
    city: Yup.string().required("City is required"),
    doctor: Yup.string().required("Doctor is required"),
    address: Yup.string().max(
      100,
      "Adress should not be greater than 100 characters"
    ),
    date: Yup.date("Date is required")
      .typeError("Date is required")
      .min(
        new Date().toISOString().split("T")[0],
        "Date should not be less than the current Date!"
      )
      .required("Date is Required"),
    department: Yup.string().max(20, "Must be 20 characters or less"),
    // .required("Department is Required"),
  });
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(newpatient_to_appoint_schema),
  });

  function Newpatient_to_appointFun(data) {
    dispatch(cd_open_close(true));
    setnewpatients_to_appoint(data);
  }
  useEffect(() => {
    if (newpatients_to_appoint && cd_yess_no_var) {
      axios
        .post("http://localhost:3100/appointments", {
          ...newpatients_to_appoint,
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(recmappointment_patient_billing_price(newpatients_to_appoint));
      setsubmit_true_for_print(true);
      dispatch(cd_yess_no(false));
      reset();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [newpatients_to_appoint, cd_yess_no_var]);
  useEffect(() => {
    if (newpatients_to_appoint && cd_yess_no_var) {
      axios
        .delete(
          "http://localhost:3100/newpatients/?PID=" + newpatients_to_appoint.PID
        )
        .catch((error) => {
          console.log(error);
        });
      dispatch(cd_yess_no(false));
    }
  }, [newpatients_to_appoint, cd_yess_no_var]);
  return (
    <>
      <h2 className="fillfreebeds_h2">MAKE AN APPOINTMENT</h2>
      <div className="printing_component_prescription">
        <div>
          <Prescription ref={pricing_ref_for_printing_component} />
        </div>
        <div
          onClick={() => {
            if (submit_true_for_print) {
              dispatch(submit_bill_price_work(true));
            }
          }}
        >
          <ReactToPrint
            trigger={() => (
              <button
                className="admin_buttons_add_update_from_add_update_form"
                style={{
                  margin: "10px 25% 10px 25%",
                  width: "50%",
                }}
              >
                PRINT THE ALL'IKHWA MEDICAL BILLS
              </button>
            )}
            content={() => pricing_ref_for_printing_component.current}
          />
        </div>
      </div>
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
        <h2 className="fillfreebeds_h2">
          Submit the Form for an Appointment with the Doctor
        </h2>
        <form onSubmit={handleSubmit(Newpatient_to_appointFun)}>
          <div
            className="profile_label_input"
            style={{ color: "red", fontSize: "14px" }}
          >
            Fields with * are compulsory!
          </div>
          <div className="profile_label_input ">
            <label htmlFor="PID" className="profile_lanel_input_label">
              PID:
            </label>
            <input
              {...register("PID")}
              id="contact"
              type="text"
              value={uuidv4()}
              placeholder="Enter Patient ID Given By Hospital"
            ></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="name" className="profile_lanel_input_label">
              Name:<span style={{ color: "red", margin: "0 4px" }}>*</span>
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
              Age:<span style={{ color: "red", margin: "0 4px" }}>*</span>
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
            <label htmlFor="patient_dis" className="profile_lanel_input_label">
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
              Doctor:<span style={{ color: "red", margin: "0 4px" }}>*</span>
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
            <label htmlFor="contact_num" className="profile_lanel_input_label">
              {" "}
              Contact:<span style={{ color: "red", margin: "0 4px" }}>*</span>
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
            <p className="pForForm ">{errors.email?.message}</p>
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
            <label htmlFor="city">
              City:<span style={{ color: "red", margin: "0 4px" }}>*</span>
            </label>
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
              Date:<span style={{ color: "red", margin: "0 4px" }}>*</span>
            </label>
            <input
              {...register("date")}
              id="date"
              type="date"
              placeholder="Enter Patient Admission Date"
            ></input>
            <p className="pForForm">{errors.date?.message}</p>
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
  );
}

export default RecmAppointments;

const Prescription = forwardRef((props, ref) => {
  const [
    recmappointment_patient_pricing_bills_data,
    setrecmappointment_patient_pricing_bills_data,
  ] = useState();
  const [print_warning, setprint_warning] = useState(false);
  const recmappointment_patient_billing_price_var = useSelector(
    (state) => state.recmappointment_patient_billing_price
  );
  const submit_bill_price_work_var = useSelector(
    (state) => state.submit_bill_price_work
  );
  const dispatch = useDispatch();
  // const bills_schema = Yup.array().of(
  //   Yup.object().shape({
  //     billname: Yup.string().required("Bill Name is required"),
  //     billprice: Yup.number().required("Medicine is Required!"),
  //   })
  // );

  const {
    control,
    reset,
    register,
    formState: { errors },
    handleSubmit,
    required,
  } = useForm({
    defaultValues: {
      bills: [{ billname: "", billprice: "" }],
    },
    mode: "onBlur",
    // resolver: yupResolver(bills_schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bills",
  });

  function handle_pricing_bill_Fun(data) {
    setprint_warning(true);
    if (submit_bill_price_work_var) {
      setrecmappointment_patient_pricing_bills_data({ ...data });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setprint_warning(false);
    }
  }

  let PID = recmappointment_patient_billing_price_var.PID;
  useEffect(() => {
    if (recmappointment_patient_pricing_bills_data && PID) {
      axios
        .post("http://localhost:3100/patientbills", {
          ...recmappointment_patient_pricing_bills_data,
          PID,
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(recmappointment_patient_billing_price(false));
      dispatch(submit_bill_price_work(false));
      reset();
    }
  }, [recmappointment_patient_pricing_bills_data]);
  return (
    <>
      <form
        onSubmit={handleSubmit(handle_pricing_bill_Fun)}
        className="recmAppointment_form"
      >
        <div className="appointment_pricing_top" ref={ref}>
          <div className="appointment_pricing_top_row01">
            <span style={{ position: "absolute" }}>
              <img src={AllikhwaLogo} className="presc_allikhwa_logo" />
            </span>
            <div
              style={{
                width: "fit-content",
                margin: "10px auto",
                color: "#fe4200",
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              ALL'IKHWA HOSPITAL PATIENT BILLS
            </div>
            <div
              style={{
                width: "fit-content",
                margin: "10px auto",
                fontSize: "15px",
                fontWeight: "400",
              }}
            >
              THIS IS A COMPUTER GENERSTED PRICING BILL OF HOSPITAL SERVICES TO
              PATIENTS!
            </div>
            <div
              style={{
                width: "fit-content",
                margin: "10px auto",
                fontSize: "15px",
                fontWeight: "400",
              }}
            >
              THIS BILL REQUIRES NO SIGNATURE
            </div>
          </div>
          <div className="appointment_pricing_top_row02">
            <div
              style={{
                borderRight: "2px solid #fe4200",
                padding: "10px",
                fontSize: "15px",
              }}
            >
              <div
                style={{
                  width: "fit-content",
                  margin: "10px auto",
                  color: "#fe4200",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                PATIENT INFO
              </div>
              <div className="appointment_pricing_top_row02_col01">
                NAME:&nbsp; &nbsp;{" "}
                {recmappointment_patient_billing_price_var.name}
              </div>
              <div className="appointment_pricing_top_row02_col01">
                Patiend ID:&nbsp;&nbsp;
                <div style={{ color: "#fe4200" }}>
                  {" "}
                  {recmappointment_patient_billing_price_var.PID}
                </div>
              </div>
              <div className="appointment_pricing_top_row02_col01">
                AGE:&nbsp; &nbsp;{" "}
                {recmappointment_patient_billing_price_var.age}
              </div>
              <div className="appointment_pricing_top_row02_col01">
                DOCTOR:&nbsp; &nbsp;{" "}
                {recmappointment_patient_billing_price_var.doctor}
              </div>
              <div className="appointment_pricing_top_row02_col01">
                DATE:&nbsp;&nbsp;
                {
                  recmappointment_patient_billing_price_var.date
                    ?.toISOString()
                    .split("T")[0]
                }
              </div>
            </div>
            <div
              style={{
                padding: "10px",
              }}
            >
              <div
                style={{
                  width: "fit-content",
                  margin: "10px auto",
                  color: "#fe4200",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                PRICING BILLS
              </div>
              {fields.map((field, index) => (
                <>
                  <div
                    className="appointment_pricing_top_row02_col02_dynamic_fields"
                    key={field.id}
                  >
                    <div>
                      <input
                        placeholder="Enter Bill Name"
                        {...register(`bills.${index}.billname`, {
                          required: "Bill Name is required",
                        })}
                      />
                      {/* <p className="pForForm">
                        {errors.bills?.[index]?.billname?.message}
                      </p> */}
                    </div>
                    <div>
                      <input
                        placeholder="Enter Bill Price"
                        {...register(`bills.${index}.billprice`, {
                          required: "Bill Price is required",
                        })}
                        // onChange={(e) => handle_price_change_bilsFun(e)}
                      />
                      {/* <p className="pForForm">
                        {errors.bills?.[index]?.billprice?.message}
                      </p> */}
                    </div>
                  </div>
                  <div>
                    {fields.length !== 1 && (
                      <button
                        className="pricing_button"
                        onClick={() => remove(index)}
                      >
                        Remove the Bill
                      </button>
                    )}
                    {fields.length - 1 === index && (
                      <button
                        className="pricing_button"
                        onClick={() => append({ billname: "", billprice: "" })}
                      >
                        Add another Bill
                      </button>
                    )}
                  </div>
                </>
              ))}
              {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
            </div>
          </div>
          <div className="recmAppointment_pricing_bills_footer">
            <div>
              <span
                style={{
                  color: "#013737",
                  fontWeight: "700",
                }}
              >
                OUR SERVICES:
              </span>
              <ul className="recmAppointment_pricing_bills_footer_ul">
                <li>Timely Response on Emergency</li>
                <li>We are Open 24/7</li>
                <li>Qualified Doctors</li>
                <li>Cooperative Staff</li>
                <li>Latest Technology</li>
              </ul>
            </div>
            <div>
              <div
                style={{
                  color: "#013737",
                  fontWeight: "700",
                }}
              >
                REACH US AT:
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  margin: "10px 0",
                }}
              >
                <GiWorld
                  style={{ margin: "3px 8px 0 0", position: "absolute" }}
                />
                <span style={{ marginLeft: "25px" }}>www.all'ikhwa.com</span>
              </div>
              <div>
                <GrMail style={{ margin: "0 10px 0 0" }} />
                allikhwahospital@gmail.com
              </div>
              <div>
                <BsFillTelephoneFill style={{ margin: "0 10px 0 0" }} />
                00923334483486
              </div>
            </div>
          </div>
        </div>
        <button
          className="admin_buttons_add_update_from_add_update_form"
          style={{
            margin: "20px 25% 10px 25%",
            width: "50%",
          }}
        >
          SUBMIT THE BILLS FOR PATIENT HISTORY IF NEEDED
        </button>
        {print_warning && (
          <p
            style={{
              color: "red",
              fontSize: "16px",
              padding: "8px",
              width: "15%",
              margin: "0 45% 0 45%",
            }}
          >
            Print the bill first*
          </p>
        )}
      </form>
    </>
  );
});
