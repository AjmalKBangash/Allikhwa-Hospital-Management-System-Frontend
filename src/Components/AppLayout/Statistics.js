import { div } from "@mui/material";
import "./Statistics.css";
import { FaBed } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { BsArrowRight } from "react-icons/bs";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

function Statistics() {
  return (
    <>
      {" "}
      <Link to={"/Appointment"} className="linkk">
        <div className="statisticsonlineconsul">
          FOR <span style={{ color: "#fe4200" }}>ONLINE CONSULTATION</span>{" "}
          REFER TO OUR STAFF
          <span className="statisticsonlineconsularrow">&#8594;</span>
        </div>
      </Link>
      <Link to={"/Appointment"} className="linkk">
        <div className="statisticsonlineconsul">
          FOR AN <span style={{ color: "#fe4200" }}>APPOINTMENT</span> AND
          QUERIES
          <span className="statisticsonlineconsularrow">&#8594;</span>
        </div>
      </Link>
      <div className="backgImageStatistics">
        <div className="statiscsIcons">
          <BsFillPersonPlusFill className="statIcons" />
          <p>
            <h1>
              <CountUp start={0} end={4231} duration={8} />
            </h1>
            Patients Treated
          </p>
        </div>
        <div className="statiscsIcons">
          <FaUserDoctor className="statIcons" />
          <p>
            <h1>
              {" "}
              <CountUp start={0} end={875} duration={8} />
            </h1>
            Surgeries performed
          </p>
        </div>
        <div className="statiscsIcons">
          <FcDepartment className="statIcons" duration={8} />
          <p>
            <h1>
              {" "}
              <CountUp start={0} end={18} duration={8} />
            </h1>
            Departments
          </p>
        </div>
        <div className="statiscsIcons">
          <FaBed className="statIcons" />
          <p>
            <h1>
              <CountUp start={0} end={321} />
            </h1>
            Patients Beds
          </p>
        </div>
      </div>
      <h1 style={{ margin: "15px auto 15px auto" }}>Follow Locations</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52905.45190309993!2d71.37550657096216!3d34.02871458011063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d91190684dcbbd%3A0x29dc2f197eb30b0e!2sRegi%20Model%20Town%2C%20Peshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1691669434721!5m2!1sen!2s"
        style={{
          width: "100%",
          height: "450px",
          style: "border:0;",
          allowfullscreen: "",
          loading: "lazy",
          referrerpolicy: "no-referrer-when-downgrade",
          margin: "auto",
        }}
      ></iframe>
    </>
  );
}

export default Statistics;
