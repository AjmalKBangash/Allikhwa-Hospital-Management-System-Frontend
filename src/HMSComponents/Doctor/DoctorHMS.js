import "./DoctorHMS.css";
import AnimatedTextOnImage from "../../ForAll/AnimatedTextOnImage";

import { useSelector } from "react-redux/es/hooks/useSelector";
import React, { useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  matchPath,
  useNavigate,
} from "react-router-dom";

// HMS Icons
import { RiDashboardFill } from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BiSolidCommentAdd } from "react-icons/bi";
import { FaPrescription } from "react-icons/fa6";
import { AiFillSchedule } from "react-icons/ai";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
// import { AiFillWechat } from "react-icons/ai";
import { FaBookMedical } from "react-icons/fa6";
import ConfirmDialogue from "../../ForAll/ConfirmDialogue";
import { ImHome } from "react-icons/im";
import { MdDateRange } from "react-icons/md";
import { PiTimerFill } from "react-icons/pi";
import { IoMdLogOut } from "react-icons/io";

const doctorhmsobjs = [
  {
    id: "1",
    name: "DASHBOARD",
    path: "dr-dashboard",
    logo: RiDashboardFill,
  },
  {
    id: "2",
    name: "PROFILE",
    path: "dr-profile",
    logo: BsFillPersonLinesFill,
  },
  {
    id: "3",
    name: "APPOINTMENTS",
    path: "dr-appointments",
    logo: FaBookMedical,
  },
  {
    id: "4",
    name: "PRESCRIPTION",
    path: "dr-prescription",
    logo: FaPrescription,
  },
  {
    id: "5",
    name: "Dr SCHEDULE",
    path: "dr-schedule",
    logo: AiFillSchedule,
  },
  {
    id: "12",
    name: "PATIENTS",
    path: "dr-patients",
    logo: BsPersonFillExclamation,
  },
  {
    id: "13",
    name: "DEPARTMENTS",
    path: "dr-departments",
    logo: FcDepartment,
  },
  {
    id: "14",
    name: "COMPLAINTS",
    path: "dr-complaints",
    logo: BiSolidCommentAdd,
  },
  // {
  //   id: "15",
  //   name: "CHAT",
  //   path: "",
  //   logo: AiFillWechat,
  // },
];

function DoctorHMS() {
  const only_hms_icons = useRef();
  const hms_outlet = useRef();
  const cd_open_close_var = useSelector((state) => state.cd_open_close);
  const employee_loggedin_doctor = useSelector(
    (state) => state.employee_loggedin
  );
  const location = useLocation();
  const navigate = useNavigate();
  let display_img = matchPath("/doctor-hms/", location.pathname);

  return (
    <>
      {cd_open_close_var && <ConfirmDialogue />}
      <div className="hmstop">
        <div className="hmscontainercol02_menu">
          <Link className="linkk" to={"/doctor-hms/"}>
            <ImHome
              style={{
                fontSize: "30px",
                color: "#013737",
                padding: "5px",
              }}
            />
          </Link>
          <span
            className="linkk img_name_top_hms_menu"
            // style={{ marginLeft: "auto" }}
          >
            <Link
              className="linkk"
              to={"/doctor-hms/dr-profile"}
              style={{ marginRight: "0px" }}
            >
              <img // onClick={() => setDisplayDashboard(false)}
                className="hmscontainercol02_img"
                // src="https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-curing-diseases_1258-57233.jpg?w=2000"
                src={
                  employee_loggedin_doctor.employee_photo
                    ? employee_loggedin_doctor.employee_photo
                    : "https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-curing-diseases_1258-57233.jpg?w=2000"
                }
                alt="Doctor"
              />
            </Link>
            <span
              className="linkk"
              style={{ fontSize: "15px", fontWeight: "500" }}
            >
              WELCOME&nbsp;&nbsp;
              <span
                style={{
                  color: "#fe4200",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {/* "SAFEER KASHMIRI" */}
                {employee_loggedin_doctor &&
                  employee_loggedin_doctor.employee_name}
              </span>
            </span>
          </span>
          <span
            className="linkk time_date_top_hms_menu"
            // style={{ marginLeft: "auto" }}
          >
            <span>
              <MdDateRange
                style={{
                  fontSize: "30px",
                  color: "#013737",
                }}
              />
              &nbsp;
            </span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginRight: "20px",
              }}
            >
              {new Date().toLocaleDateString()}
            </span>
            <span>
              {" "}
              <PiTimerFill
                style={{
                  fontSize: "30px",
                  color: "#013737",
                }}
              />
              &nbsp;
            </span>
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </span>
          <span className="linkk">
            <IoMdLogOut
              style={{
                fontSize: "30px",
                color: "red",
                padding: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                localStorage.setItem("access_token", "");
                localStorage.setItem("refresh_token", "");
                localStorage.setItem("employee_loggedin_persistentdata", "");
                navigate("/signup");
              }}
            />
          </span>
        </div>
        <div className="hmscontainer">
          <div
            className="hmscontainercol01"
            ref={only_hms_icons}
            style={{
              backgroundColor: "#013737",
            }}
          >
            <ul>
              {doctorhmsobjs.map((hmsobjs, id) => {
                return (
                  <NavLink
                    key={id}
                    to={hmsobjs.path}
                    className="linkk"
                    style={{ color: "white" }}
                  >
                    <li>
                      <span className="hmsmanagementicons">
                        <hmsobjs.logo /> &nbsp;
                      </span>
                      <span> {hmsobjs.name}</span>
                      <span className="hmscontainercol01_arrow">&#8594;</span>
                    </li>
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <div className="hmscontainercol02" ref={hms_outlet}>
            {display_img && (
              <AnimatedTextOnImage
                {...{
                  image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZoQ9XzGJOaUPXWi5jOShnywFNgGSU0OIbw&usqp=CAU",
                  management: "DOCTOR",
                }}
              />
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorHMS;
