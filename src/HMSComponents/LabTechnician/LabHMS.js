import { cd_open_close } from "../../Store/Store";
import AnimatedTextOnImage from "/home/ajay/Desktop/FYP/allikhwa/src/ForAll/AnimatedTextOnImage.js";

import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  matchPath,
} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

// HMS Icons
import { RiDashboardFill, RiAdminFill } from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { MdDateRange } from "react-icons/md";
import { PiTimerFill } from "react-icons/pi";
import { IoMdLogOut } from "react-icons/io";
import { AiFillWechat } from "react-icons/ai";
import { BsPersonFillExclamation } from "react-icons/bs";
import { GiTestTubes } from "react-icons/gi";
import ConfirmDialogue from "../../ForAll/ConfirmDialogue";

const rechmsobjs = [
  {
    id: "1",
    name: "DASHBOARD",
    path: "lab-dashboard",
    logo: RiDashboardFill,
  },
  {
    id: "2",
    name: "PROFILE",
    path: "lab-profile",
    logo: BsFillPersonLinesFill,
  },
  {
    id: "3",
    name: "TEST SAMPLES",
    path: "lab-patient-samples",
    logo: GiTestTubes,
  },
  {
    id: "4",
    name: "PATIENTS",
    path: "lab-patients",
    logo: BsPersonFillExclamation,
  },
  //   {
  //     id: "8",
  //     name: "DEPARTMENTS",
  //     path: "rec-departments",
  //     logo: FcDepartment,
  //   },
  {
    id: "5",
    name: "COMPLAINTS",
    path: "lab-complaints",
    logo: BsPersonFillExclamation,
  },
  // {
  //   id: "6",
  //   name: "CHAT",
  //   path: "lab-chat",
  //   logo: AiFillWechat,
  // },
];
let strr = "";
const stringifyUpper = (strrr) => strrr.toUpperCase().replace("-", " ");

function LabHMS() {
  const [displayDashboard, setDisplayDashboard] = useState(false);
  const [displayHmsMenu, setDisplayHmsMenu] = useState(true);
  const only_hms_icons = useRef();
  const hms_outlet = useRef();
  const cd_open_close_var = useSelector((state) => state.cd_open_close);
  const location = useLocation();
  let display_img = matchPath("lab-hms", location.pathname);

  return (
    <>
      {cd_open_close_var && <ConfirmDialogue />}
      <div className="hmstop">
        <div className="hmscontainercol02_menu">
          <Link className="linkk" to={"/rec-hms/"}>
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
              to={"/rec-hms/rec-profile"}
              style={{ marginRight: "0px" }}
            >
              <img // onClick={() => setDisplayDashboard(false)}
                className="hmscontainercol02_img"
                src="https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-curing-diseases_1258-57233.jpg?w=2000"
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
                "RIZWAN ULLAH KHAN"
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
              {rechmsobjs.map((hmsobjs, id) => {
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
                    "https://www.northwoodtech.edu/sites/default/files/HealthcareReceptionist-main-web-FY23-1337067405-.jpg",
                  management: "LAB TECHNICIAN",
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

export default LabHMS;
