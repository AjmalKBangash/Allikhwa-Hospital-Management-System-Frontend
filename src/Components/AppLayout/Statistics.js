import { div } from "@mui/material";
import "./Statistics.css";
import { FaBed } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { BsArrowRight } from "react-icons/bs";
import CountUp from "react-countup";

function Statistics() {
  return (
    <>
      <div className="statisticsonlineconsul">
        FOR ONLINE CONSULTATION REFER TO OUR STAFF
        <span className="statisticsonlineconsularrow">&#8594;</span>
      </div>

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
    </>
  );
}

export default Statistics;
