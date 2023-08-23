import "./HmsAppLayout.css";
import Dashboard from "./HMSapps/Dashboard";

import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

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

// strr
//   .toUpperCase()
// .trim()
// .replace(" ",/[^\w\s-]/g)
// .replace(" ",/[\s_-]+/g)
//   .replace("-", " ");
// const { departmentdetails } = useParams();
// const { state } = useLocation("");

function HmsAppLayout() {
  const [displayDashboard, setDisplayDashboard] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/all'ikhwa-management-system/") {
      setDisplayDashboard(true);
    } else if (
      location.pathname === "/all'ikhwa-management-system/:dashboard"
    ) {
      setDisplayDashboard(false);
    }
  }, [location.pathname]);
  return (
    <>
      <div className="hmstop">
        <div className="hmscontainercol02_menu">
          <img
            className="hmscontainercol02_img"
            // src={} dynamic
            src="https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-curing-diseases_1258-57233.jpg?w=2000"
            alt="Doctor"
          />
          <IoMdNotifications style={{ fontSize: "30px", color: "#fe4200" }} />
        </div>
        <div className="hmscontainer">
          <div className="hmscontainercol01">
            <ul>
              {departments.map((department, id) => {
                return (
                  <NavLink
                    key={id}
                    to={department.name.toLowerCase()}
                    className="linkk"
                    style={{ color: "white" }}
                    onClick={() => setDisplayDashboard(false)}
                  >
                    <li>
                      <span className="hmsmanagementicons">
                        <department.logo /> &nbsp;
                      </span>
                      {department.name}
                      <span className="hmscontainercol01_arrow">&#8594;</span>
                    </li>
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <div className="hmscontainercol02">
            {displayDashboard && <Dashboard />}

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default HmsAppLayout;
