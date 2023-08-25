import "./HmsAppLayout.css";
import Dashboard from "./HMSapps/Dashboard";

import React, { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useMatch,
  useMatches,
  matchPath,
} from "react-router-dom";

// HMS Icons
import { RiDashboardFill, RiAdminFill } from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";
import { MdPersonalInjury } from "react-icons/md";
import { MdLocalPharmacy } from "react-icons/md";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiSolidCommentAdd } from "react-icons/bi";
import { AiFillWechat } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";

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
  {
    id: "13",
    name: "COMPLAINTS",
    logo: BiSolidCommentAdd,
  },
  {
    id: "14",
    name: "CHAT",
    logo: AiFillWechat,
  },
];
let strr = "";
const stringifyUpper = (strrr) => strrr.toUpperCase().replace("-", " ");

function HmsAppLayout() {
  const [displayDashboard, setDisplayDashboard] = useState(false);
  const [displayHmsMenu, setDisplayHmsMenu] = useState(true);
  const only_hms_icons = useRef();
  const hms_outlet = useRef();
  const location = useLocation();
  // only_hms_icons.current.style.display = "none";

  // matching path for displaying dashboard otherwise not
  const pathhh = matchPath("/all'ikhwa-management-system/", location.pathname);
  useEffect(() => {
    pathhh ? setDisplayDashboard(true) : setDisplayDashboard(false);
  }, [pathhh]);
  // matching path for displaying dashboard otherwise not
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
          <img // onClick={() => setDisplayDashboard(false)}
            className="hmscontainercol02_img"
            // src={} dynamic
            src="https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-curing-diseases_1258-57233.jpg?w=2000"
            alt="Doctor"
          />
          <IoMdNotifications style={{ fontSize: "30px", color: "#fe4200" }} />
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
            {displayDashboard && <Dashboard />}

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default HmsAppLayout;
