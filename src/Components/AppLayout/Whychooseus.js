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
        <Zoom left duration="3000">
          <p>
            <h4>All'Ikhwa Accreditation</h4>
            Our Hospital is based upon our country accreditation council and our
            Hospital ranks in the top 10 of country Hospitals list. With over
            300 plus beds and 18 dpartments ALL'IKHWA is one of the leading
            Hospital in the region. Our qualified Staff members ranks top in the
            serving of patients with kindness and proper procedures.
          </p>
        </Zoom>
        <Zoom right duration="3000">
          <TbListDetails className="laboratory" />
        </Zoom>
        <Zoom left duration="3000">
          <LuMicroscope className="laboratory" />
        </Zoom>
        <Zoom right duration="3000">
          <p>
            <h4>All'Ikhwa Laboratory</h4>
            In the minimum years after its existence ALL"IKHWA proved it patient
            care with proper procedures and hence used one of the country and
            world top most computer based technology.
          </p>
        </Zoom>
        <Zoom left duration="3000">
          <p>
            <h4>All'Ikhwa Qualified Staff </h4>
            In the minimum years after its existence ALL"IKHWA proved it patient
            care with proper procedures and has hired one of the country and
            world top most staff members.
          </p>
        </Zoom>

        <Zoom right duration="3000">
          <FaPeopleLine className="laboratory" />
        </Zoom>
        <Zoom left duration="3000">
          <BiStreetView className="laboratory" />
        </Zoom>
        <Zoom right duration="3000">
          <p>
            <h4>All'Ikhwa Treatments and Conditions</h4>
            All'Ikhwa chooses treatments upon the latest innovative proved
            researches and upon the top most technology. The entry and other
            condition to our Hospital and for patients is based upon our Phd
            Doctoral refferals.
          </p>
        </Zoom>
      </div>
    </div>
  );
}

export default Whychooseus;
