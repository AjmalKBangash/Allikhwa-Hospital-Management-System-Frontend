import "./Services.css";
import { Zoom } from "react-reveal";

function Services() {
  return (
    <>
      <h1>Our Services</h1>
      <div className="servicestop">
        <p>
          Our services covers a vast module of every Human related problem
          starting from pshyciatery to surgeries, We are at your footprint by
          bringing Health with joy, treatement with purity, patient care with
          kindness. We hope the best for all and healthy life.
          <ul>
            <Zoom left duration="2000">
              <li>Qualified Staff</li>
            </Zoom>
            <Zoom right duration="2000">
              <li>Doctors with having 10+ years of experience</li>
            </Zoom>
            <Zoom left duration="2000">
              <li>Patient Care</li>
            </Zoom>
            <Zoom right duration="2000">
              <li>Nurses</li>
            </Zoom>
            <Zoom left duration="2000">
              <li>Phyciatrist</li>
            </Zoom>
            <Zoom right duration="2000">
              <li>Dermatologists</li>
            </Zoom>
            <Zoom left duration="2000">
              <li>House Officers for Future</li>
            </Zoom>
            <Zoom right duration="2000">
              <li>Job Openings</li>
            </Zoom>
          </ul>
        </p>
        <div></div>
      </div>
    </>
  );
}

export default Services;
