import { div } from "@mui/material";
import "./Statistics.css";
import { FaBed } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { BsArrowRight } from "react-icons/bs";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const news = [
  {
    id: 1,
    title:
      "Massachusetts General Hospital Launches First-of-its-Kind Center for Clinical Transplant Tolerance",
  },
  {
    id: 2,
    title:
      "Research Spotlight: Race-Based Differences in ST Elevation Myocardial Infarction (STEMI) Process Metrics ",
  },
  {
    id: 3,
    title:
      "Massachusetts General Hospital Launches First-of-its-Kind Center for Clinical Transplant Tolerance",
  },
  {
    id: 4,
    title:
      "Massachusetts General Hospital Launches First-of-its-Kind Center for Clinical Transplant Tolerance",
  },
  {
    id: 5,
    title:
      "Massachusetts General Hospital Launches First-of-its-Kind Center for Clinical Transplant Tolerance",
  },
  {
    id: 6,
    title:
      "Massachusetts General Hospital Launches First-of-its-Kind Center for Clinical Transplant Tolerance",
  },
  {
    id: 7,
    title:
      "Research Spotlight: Race-Based Differences in ST Elevation Myocardial Infarction (STEMI) Process Metrics ",
  },
];

function Statistics() {
  return (
    <>
      <div className="statisticsfirstportionofnewsandappointment">
        <div className="consltationinstatistics">
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
        </div>
        <div>
          <h1
            style={{ borderRadius: "2px", fontSize: "20px", color: "#fe4200" }}
          >
            FEATURED&nbsp;&nbsp;&nbsp;&nbsp; News/Events/Stories
          </h1>

          <div className="newsandstoriesinstatistics">
            <marquee
              scrolldelay="5"
              direction="down"
              height="300"
              scrollamount="2"
            >
              {news.map((title, id) => {
                return (
                  <div
                    key={id}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <h3 style={{ marginBottom: "10px", fontSize: "15px" }}>
                      {title.title}
                    </h3>
                    <h6 style={{ color: "#fe4200" }}>11 August 2023</h6>
                  </div>
                );
              })}
            </marquee>
          </div>
        </div>
      </div>
      <div className="backgImageStatistics">
        <div className="statiscsIcons">
          <BsFillPersonPlusFill className="statIcons" />
          <p>
            <h2>
              <CountUp start={0} end={4231} duration={8} />
            </h2>
            Patients Treated
          </p>
        </div>
        <div className="statiscsIcons">
          <FaUserDoctor className="statIcons" />
          <p>
            <h2>
              {" "}
              <CountUp start={0} end={875} duration={8} />
            </h2>
            Surgeries performed
          </p>
        </div>
        <div className="statiscsIcons">
          <FcDepartment className="statIcons" duration={8} />
          <p>
            <h2>
              {" "}
              <CountUp start={0} end={18} duration={8} />
            </h2>
            Departments
          </p>
        </div>
        <div className="statiscsIcons">
          <FaBed className="statIcons" />
          <p>
            <h2>
              <CountUp start={0} end={321} />
            </h2>
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
