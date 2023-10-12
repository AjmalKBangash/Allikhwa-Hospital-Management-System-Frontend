import { useSelector } from "react-redux/es/hooks/useSelector";
import React, { useRef } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

// HMS Icons
import { RiDashboardFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { ImHome } from "react-icons/im";
import { MdDateRange } from "react-icons/md";
import { PiTimerFill } from "react-icons/pi";
import { GiDespair } from "react-icons/gi";
import { FaBookMedical } from "react-icons/fa6";
import ConfirmDialogue from "../../ForAll/ConfirmDialogue";

const rechmsobjs = [
  {
    id: "1",
    name: "DASHBOARD",
    path: "pat-dashboard",
    logo: RiDashboardFill,
  },
  {
    id: "2",
    name: "APPOINTMENTS",
    path: "pat-appointments",
    logo: FaBookMedical,
  },
  //   {
  //     id: "2",
  //     name: "DOCUMENTS",
  //     path: "pat-documents",
  //     logo: IoDocumentsSharp,
  //   },
  {
    id: "2",
    name: "COMPLAINTS",
    path: "pat-complaints",
    logo: GiDespair,
  },
];

function PatHMS() {
  const only_hms_icons = useRef();
  const hms_outlet = useRef();
  const cd_open_close_var = useSelector((state) => state.cd_open_close);

  return (
    <>
      {cd_open_close_var && <ConfirmDialogue />}
      <div className="hmstop">
        <div className="hmscontainercol02_menu">
          <Link className="linkk" to={"/pat-hms/"}>
            <ImHome
              style={{
                fontSize: "30px",
                color: "#013737",
                padding: "5px",
              }}
            />
          </Link>
          <span className="linkk img_name_top_hms_menu">
            <Link
              className="linkk"
              //   to={"/pat-hms/pat-profile"}
              style={{ marginRight: "0px" }}
            >
              <img
                className="hmscontainercol02_img"
                src="https://static.thenounproject.com/png/6103374-200.png"
                alt="Patient"
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
                "SAFEER KASHMIRI"
              </span>
            </span>
          </span>
          <span className="linkk time_date_top_hms_menu">
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
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default PatHMS;
