import "./Appointment.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRef } from "react";

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
  let ref1 = useRef();
  let ref2 = useRef();
  let valid = useRef(0);

  function physicalappointmentFun() {
    if (ref1.current.checked) {
      //   valid.current = valid.current + 1;
      console.log("clicked");
      //   console.log(valid.current);
      ref2.current.checked = false;
      //   if (valid.current >= 2) {
      //     ref2.current.checked = false;
      //     console.log("plz select only one!");
      //   }
      //   else ref1.current.checked = true;
    }
  }

  function onlineappointmentFun() {
    if (ref2.current.checked) {
      //   valid.current = valid.current + 1;
      console.log("clicked2");
      //   console.log(valid.current);
      ref1.current.checked = false;

      //   if (valid.current >= 2) {
      //     ref1.current.checked = false;
      //     console.log("plz select only one!");
      //   }
      //   else ref2.current.checked = true;
    }
  }

  return (
    <>
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
          <h4>Please call 1122 if you are experiencing a medical emergency.</h4>
        </p>
        <h3>Submit Your Appointment Details:</h3>
        <form id="donationForm" className="donationformclass">
          <label for="name">Name</label>
          <input id="name" type="text" placeholder="Enter Your Name" />
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="Enter Your Email"></input>
          <label for="city">Choose City</label>
          <select type="select" id="city" name="carlist" form="donationForm">
            <option value={""} disabled selected>
              {" "}
              ..select an option..
            </option>
            {countries.map((country, id) => {
              return (
                <option key={id} value={country.capital}>
                  {country.capital}
                </option>
              );
            })}
          </select>
          <label for="address">Address</label>
          <input id="address" type="text" placeholder="Enter Your Address" />
          <label for="postcode">Postcode</label>
          <input
            id="postcode"
            type="text"
            placeholder="Enter Your Postcode"
          ></input>
          <div className="emailingduringdonation">
            <h3>Control how you hear from us</h3>
            <p>
              We would like to contact you from time to time to keep you
              informed of All'Ikhwa projects, fundraising activities and
              appeals. We will not share your data and you can unsubscribe at
              any time.
            </p>
            <span>
              <label htmlfor="informingemail">
                {" "}
                May we contact you by email?*
              </label>
              <input
                type="checkbox"
                id="informingemail"
                name="informingemail"
                value="informemail"
              />
            </span>
            <span>
              <label htmlfor="informingsms"> May we contact you by SMS?*</label>
              <input
                type="checkbox"
                id="informingsms"
                name="informingsms"
                value="informsms"
              />
            </span>
            <span>
              <label htmlfor="informingphone">
                May we contact you by Phone?*
              </label>
              <input
                type="checkbox"
                id="informingphone"
                name="informimgphone"
                value="informphone"
              />
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
              <label htmlfor="physicalappointment">
                {" "}
                Physical Appointment{" "}
              </label>
              <input
                ref={ref1}
                type="checkbox"
                id="physicalappointment"
                name="physicalappointment"
                value="physicalappointment"
                onClick={physicalappointmentFun}
              />
            </span>
            <span>
              <label htmlfor="onlineappointment"> Online Appointment </label>
              <input
                ref={ref2}
                type="checkbox"
                id="onlineappointment"
                name="onlineappointment"
                value="onlineappointment"
                onClick={onlineappointmentFun}
              />
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
