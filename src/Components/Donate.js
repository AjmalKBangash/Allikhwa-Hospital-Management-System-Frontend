import "./Donate.css";
import NavBar from "./AppLayout/NavBar";
import Footer from "./AppLayout/Footer";

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

function Donate() {
  return (
    <>
      <NavBar />
      <div className="donatetop">
        {/* the class statisticsonlineconsul has been taken from statistics .css file  */}
        <div
          className="statisticsonlineconsul"
          style={{ width: "fit-content", margin: "auto auto 10px auto" }}
        >
          Donation{" "}
        </div>
        {/* the class statisticsonlineconsul has been taken from statistics .css file  */}
        <div
          className="statisticsonlineconsul"
          style={{
            width: "fit-content",
            height: "fir-content",
            margin: "auto auto 10px auto",
            backgroundColor: "black",
            color: "white",
            padding: "50px",
            boxSizing: "border-box",
          }}
        >
          Giving a little is better than not giving at all!
          <br />
          <span
            style={{
              color: "#fe4200",
              fontSize: "12px",
            }}
          >
            By Jennefer Bets
          </span>
        </div>
        {/* <img
          src={
            "https://cf.ltkcdn.net/charity/images/std/266980-800x600r1-fundraising-quotes.webp"
          }
          style={{
            border: "4px solid #fe4200",
            // height: "400px",
            margin: " 0 0 0 7%",
          }}
        /> */}
        <span>
          <div>WE VALUE YOUR DONATION</div>
          <div>THROUGH YOUR DONATION WE SERVE HUMANITY</div>
        </span>
        <p>
          Your donation is a gift for charity, humanitarian aid, or to benefit a
          cause. Your donation may take various forms, including money, alms,
          services, or goods such as clothing, toys, food, or vehicles. Your
          donation may satisfy medical needs such as blood or organs for
          transplant. Which we are in severe need due to currently evolving
          number of patients.
        </p>
        <h3 style={{ margin: "10px auto" }}>Fill Your Donation Form</h3>
        <form id="donationForm" className="donationformclass">
          <label for="name">Name</label>
          <input id="name" type="text" placeholder="Enter Your Name" />
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="Enter Your Email"></input>
          <label for="country">Choose Country:</label>
          <select
            type="select"
            id="country"
            name="countrylist"
            form="donationForm"
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
          <label for="city">Choose City</label>
          <select type="select" id="city" name="carlist" form="donationForm">
            <option value={""} disabled selected>
              {" "}
              ..select an option..
            </option>
            {countries.map((country, id) => {
              return (
                <option key={id} value={country.name}>
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
            {/* <input type="submit" value="Submit" /> */}
          </div>
          <div className="finalstepduringdonation">
            <h3>Complete Your Payment</h3>
            <p>
              You can complete your payment by contacting with one of our staff
              member or you ca directly deposit your money through your
              easypaisa account or your band debit cards. We accept following
              debit cards.
              <ul>
                <li>Faysal Bank Platinum Debit Card</li>
                <li>Allied Cash Shop Sapphire 200 Visa Debit Card</li>
                <li>Meezan Titanium Debit Card</li>
                <li>Allied PayPak Assan Debit Card</li>
                <li>BOP MasterCard Debit Card – Platinum</li>
              </ul>
            </p>
            <label for="Price">Price</label>
            <input id="Price" type="text" placeholder="Enter Your Price" />
            <label for="creditordebitcard">credit or debit card</label>
            <input
              id="creditordebitcard"
              type="creditordebitcard"
              placeholder="Enter Your credit or debit card num"
            ></input>
          </div>
          <button type="submit">Donate</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
export default Donate;
