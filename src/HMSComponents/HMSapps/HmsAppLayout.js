import "./HmsAppLayout.css";
// import Dashboard from "./HMSapps/Dashboard";
import AnimatedTextOnImage from "../../ForAll/AnimatedTextOnImage";

import React, { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  matchPath,
} from "react-router-dom";

// HMS Icons
import { RiDashboardFill, RiAdminFill } from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";
import { MdPersonalInjury, MdDateRange } from "react-icons/md";
import { MdLocalPharmacy } from "react-icons/md";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiSolidCommentAdd } from "react-icons/bi";
import { AiFillWechat } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { ImHome } from "react-icons/im";
import { PiTimerFill } from "react-icons/pi";

const departments = [
  {
    id: "1",
    name: "DASHBOARD",
    logo: RiDashboardFill,
  },
  {
    id: "2",
    name: "PROFILE",
    logo: BsFillPersonLinesFill,
  },
  {
    id: "3",
    name: "ADMINS",
    logo: RiAdminFill,
  },
  {
    id: "4",
    name: "DOCTORS",
    logo: FaUserDoctor,
  },
  {
    id: "5",
    name: "PHARMACISTS",
    logo: AiFillMedicineBox,
  },
  {
    id: "6",
    name: "NURSES",
    logo: FaUserNurse,
  },
  {
    id: "7",
    name: "RECEPTIONISTS",
    logo: MdPersonalInjury,
  },
  {
    id: "8",
    name: "STAFF",
    logo: MdLocalPharmacy,
  },
  {
    id: "9",
    name: "OTHERS",
    logo: FaBuildingCircleArrowRight,
  },
  {
    id: "10",
    name: "PATIENTS",
    logo: BsPersonFillExclamation,
  },
  {
    id: "11",
    name: "DEPARTMENTS",
    logo: FcDepartment,
  },
  {
    id: "12",
    name: "EXPENSES",
    logo: FaMoneyCheckDollar,
  },
  // {
  //   id: "13",
  //   name: "COMPLAINTS",
  //   logo: BiSolidCommentAdd,
  // },
  // {
  //   id: "14",
  //   name: "CHAT",
  //   logo: AiFillWechat,
  // },
];
let strr = "";
const stringifyUpper = (strrr) => strrr.toUpperCase().replace("-", " ");

function HmsAppLayout() {
  // const [displayDashboard, setDisplayDashboard] = useState(false);
  const [displayHmsMenu, setDisplayHmsMenu] = useState(true);
  const only_hms_icons = useRef();
  const hms_outlet = useRef();
  const location = useLocation();
  // only_hms_icons.current.style.display = "none";

  // matching path for displaying dashboard otherwise not
  // const pathhh = matchPath("/all'ikhwa-management-system/", location.pathname);
  // useEffect(() => {
  //   pathhh ? setDisplayDashboard(true) : setDisplayDashboard(false);
  // }, [pathhh]);
  // matching path for displaying dashboard otherwise not
  let display_img = matchPath(
    "/all'ikhwa-management-system/",
    location.pathname
  );
  const path_depart = matchPath(
    "/all'ikhwa-management-system/departments/",
    location.pathname
  );
  const path_departments = matchPath(
    "/all'ikhwa-management-system/departments/:cardiology",
    location.pathname
  );
  useEffect(() => {
    if (path_depart) {
      setDisplayHmsMenu(false);
      only_hms_icons.current.style.width = "0vw";
      hms_outlet.current.style.width = "100vw";
      hms_outlet.current.style.left = "0vw";
    } else if (path_departments) {
      only_hms_icons.current.style.width = "0vw";
      hms_outlet.current.style.width = "100vw";
      hms_outlet.current.style.left = "0vw";
    } else {
      setDisplayHmsMenu(true);
      only_hms_icons.current.style.width = "16vw";
      hms_outlet.current.style.width = "84vw";
      hms_outlet.current.style.left = "16vw";
    }
  }, [path_depart, path_departments]);
  return (
    <>
      <div className="hmstop">
        <div className="hmscontainercol02_menu">
          <Link className="linkk" to={"/all'ikhwa-management-system/"}>
            <ImHome
              style={{
                fontSize: "28px",
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
              to={"/all'ikhwa-management-system/profile"}
              style={{ marginRight: "0px" }}
            >
              <img // onClick={() => setDisplayDashboard(false)}
                className="hmscontainercol02_img"
                src="https://pakobserver.net/wp-content/uploads/2021/09/4-75.jpg"
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
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                "DR.ABDUL QADEER KHAN"
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
                  fontSize: "28px",
                  color: "#013737",
                }}
              />
              &nbsp;
            </span>
            <span
              style={{
                fontSize: "15px",
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
                  fontSize: "28px",
                  color: "#013737",
                }}
              />
              &nbsp;
            </span>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
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
                fontSize: "28px",
                color: "red",
                padding: "5px",
                cursor: "pointer",
              }}
            />
          </span>
        </div>
        <div className="hmscontainer">
          <div className="hmscontainercol01" ref={only_hms_icons}>
            <ul>
              {departments.map((department, id) => {
                return (
                  <NavLink
                    key={id}
                    to={department.name.toLowerCase()}
                    className="linkk"
                    style={{ color: "white" }}
                  >
                    {displayHmsMenu && (
                      <>
                        <li>
                          <span className="hmsmanagementicons">
                            <department.logo /> &nbsp;
                          </span>
                          <span> {department.name}</span>
                          <span className="hmscontainercol01_arrow">
                            &#8594;
                          </span>
                        </li>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <div className="hmscontainercol02" ref={hms_outlet}>
            {/* {displayDashboard && <Dashboard />} */}
            {display_img && (
              <AnimatedTextOnImage
                {...{
                  image:
                    "https://www.northwoodtech.edu/sites/default/files/HealthcareReceptionist-main-web-FY23-1337067405-.jpg",
                  management: "ADMINISTRATION",
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

export default HmsAppLayout;
