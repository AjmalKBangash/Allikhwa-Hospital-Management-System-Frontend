import "./NavBar.css";
import { ImWhatsapp } from "react-icons/im";
import { HiMenuAlt3 } from "react-icons/hi";
import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";
import Estore from "../eStore/Estore";

import { Link } from "react-router-dom";
import { useRef, useState } from "react";

function NavBar() {
  const [displayState, setDisplayState] = useState(false);

  function displayMenu() {
    setDisplayState(!displayState);
  }
  return (
    <>
      <div className="navbar01">
        <ul>
          <li>
            <img src={AllikhwaLogo} />
          </li>
          <li>
            <span>EMERGENCY</span>
          </li>
          <li>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ImWhatsapp
                style={{
                  color: "green",
                  fontSize: "25px",
                }}
              />
              &nbsp;
              <span>92 3334483486</span>
            </div>
          </li>
          <li>Donate Now</li>
        </ul>
      </div>
      <div className="navbar02">
        <div className="navbar03">
          <ul>
            <li>HOME</li>
            <li>
              <HiMenuAlt3 onClick={displayMenu} />
            </li>
          </ul>
        </div>
        <ul style={{ display: displayState && "flex" }} className="navbar02ul">
          <li>
            DEPARTMENTS<span style={{ color: "#fe4200" }}>&#x2193;</span>
          </li>
          <li>
            SERVICES<span style={{ color: "#fe4200" }}>&#x2193;</span>
          </li>
          <li>
            DOCTORS<span style={{ color: "#fe4200" }}>&#x2193;</span>
          </li>
          <li>ABOUT US</li>
          <li>CURRENT FLOW</li>
          <li>
            <Link
              to={"/eStore"}
              style={{ textDecoration: "none", color: "black" }}
            >
              eStore
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
