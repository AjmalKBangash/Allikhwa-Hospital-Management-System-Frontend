import "./Whychooseus.css";
import { LuMicroscope } from "react-icons/lu";
import { TbListDetails } from "react-icons/tb";
import { FaPeopleLine } from "react-icons/fa6";
import { BiStreetView } from "react-icons/bi";
import { Zoom } from "react-reveal";
function Whychooseus() {
  return (
    <div className="whychooseustop">
      <h1>Why Choose Us</h1>
      {/* <p>
        Our Hospital is based upon our country accreditation council and our
        Hospital ranks in the top 10 of country Hospitals list. With over 300
        plus beds and 18 dpartments ALL'IKHWA is one of the leading Hospital in
        the region. Our qualified Staff members ranks top in the serving of
        patients with kindness and proper procedures.
      </p> */}
      <div className="whychooseus">
        <p exclude>
          <h4>All'Ikhwa Accreditation</h4>
          Our Hospital is based upon our country accreditation council and our
          Hospital ranks in the top 10 of country Hospitals list. With over 300
          plus beds and 18 dpartments ALL'IKHWA is one of the leading Hospital
          in the region. Our qualified Staff members ranks top in the serving of
          patients with kindness and proper procedures.
        </p>
        <Zoom duration="2000">
          <TbListDetails className="laboratory" />
          <LuMicroscope className="laboratory" />
        </Zoom>
        <p>
          <h4>All'Ikhwa Laboratory</h4>
          In the minimum years after its existence ALL"IKHWA proved it patient
          care with proper procedures and hence used one of the country and
          world top most computer based technology.
        </p>
        <p>
          <h4>All'Ikhwa Qualified Staff </h4>
          In the minimum years after its existence ALL"IKHWA proved it patient
          care with proper procedures and has hired one of the country and world
          top most staff members.
        </p>
        <Zoom duration="2000">
          <FaPeopleLine className="laboratory" />
          <BiStreetView className="laboratory" />
        </Zoom>

        <p>
          <h4>All'Ikhwa Treatments and Conditions</h4>
          All'Ikhwa chooses treatments upon the latest innovative proved
          researches and upon the top most technology. The entry and other
          condition to our Hospital and for patients is based upon our Phd
          Doctoral refferals.
        </p>
      </div>
    </div>
  );
}

export default Whychooseus;
