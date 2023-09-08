// import "./DoctorHMS.css";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { cd_open_close } from "../../Store/Store";
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
import { FaUserDoctor, FaPrescription } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa";
import { AiFillMedicineBox, AiFillSchedule } from "react-icons/ai";
import { MdPersonalInjury } from "react-icons/md";
import { MdLocalPharmacy } from "react-icons/md";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiSolidCommentAdd } from "react-icons/bi";
import { AiFillWechat } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import ConfirmDialogue from "../../ForAll/ConfirmDialogue";

const rechmsobjs = [
  {
    id: "1",
    name: "DASHBOARD",
    path: "rec-dashboard",
    logo: RiDashboardFill,
  },
  {
    id: "2",
    name: "PROFILE",
    path: "rec-profile",
    logo: BsFillPersonLinesFill,
  },
  {
    id: "3",
    name: "eAPPOINTMENTS",
    path: "rec-e-appointments",
    logo: RiAdminFill,
  },
  {
    id: "5",
    name: "mAPPOINTMENTS",
    path: "rec-make-appointments",
    logo: RiAdminFill,
  },
  {
    id: "6",
    name: "REC_SCHEDULE",
    path: "rec-schedule",
    logo: AiFillSchedule,
  },
  {
    id: "7",
    name: "PATIENTS",
    path: "rec-patients",
    logo: BsPersonFillExclamation,
  },
  {
    id: "8",
    name: "DEPARTMENTS",
    path: "rec-departments",
    logo: FcDepartment,
  },
  {
    id: "9",
    name: "COMPLAINTS",
    path: "rec-complaints",
    logo: BsPersonFillExclamation,
  },
  {
    id: "10",
    name: "CHAT",
    path: "rec-chat",
    logo: FcDepartment,
  },
];
let strr = "";
const stringifyUpper = (strrr) => strrr.toUpperCase().replace("-", " ");

function RecHMS() {
  const [displayDashboard, setDisplayDashboard] = useState(false);
  const [displayHmsMenu, setDisplayHmsMenu] = useState(true);
  const only_hms_icons = useRef();
  const hms_outlet = useRef();
  const cd_open_close_var = useSelector((state) => state.cd_open_close);
  const location = useLocation();

  return (
    <>
      {cd_open_close_var && <ConfirmDialogue />}
      <div className="hmstop">
        <div className="hmscontainercol02_menu">
          <img // onClick={() => setDisplayDashboard(false)}
            className="hmscontainercol02_img"
            // src={} dynamic
            src="https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-curing-diseases_1258-57233.jpg?w=2000"
            alt="Receptionist"
          />
          <IoMdNotifications style={{ fontSize: "30px", color: "#fe4200" }} />
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
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default RecHMS;
