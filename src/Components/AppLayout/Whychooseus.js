import "./Whychooseus.css";
import { LuMicroscope } from "react-icons/lu";
import { TbListDetails } from "react-icons/tb";
import { FaPeopleLine } from "react-icons/fa6";
import { BiStreetView } from "react-icons/bi";
import medicallabel03 from "/home/ajay/Desktop/FYP/allikhwa/src/Media/medicallabel03.jpeg";
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
        <Zoom left duration="2000">
          <p>
            <h4>All'Ikhwa Accreditation</h4>
            Our Hospital is based upon our country accreditation council and our
            Hospital ranks in the top 10 of country Hospitals list. With over
            300 plus beds and 18 dpartments ALL'IKHWA is one of the leading
            Hospital in the region. Our qualified Staff members ranks top in the
            serving of patients with kindness and proper procedures.
          </p>
        </Zoom>
        <Zoom right duration="2000">
          {/* <TbListDetails className="laboratory" /> */}
          <img
            src={
              "https://as2.ftcdn.net/v2/jpg/02/94/13/91/1000_F_294139112_94sVMA2LeJy2wrQ84bhMRKcp0bxii53i.jpg"
            }
            className="medicallabelsinwhychooseus"
          />
        </Zoom>
        <Zoom left duration="2000">
          {/* <LuMicroscope className="laboratory" /> */}
          <img
            src={
              "https://res.cloudinary.com/teepublic/image/private/s--tq1lJYNU--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1641470530/production/designs/26967135_0.jpg"
            }
            className="medicallabelsinwhychooseus"
          />
        </Zoom>
        <Zoom right duration="2000">
          <p>
            <h4>All'Ikhwa Laboratory</h4>
            In the minimum years after its existence ALL"IKHWA proved it patient
            care with proper procedures and hence used one of the country and
            world top most computer based technology.
          </p>
        </Zoom>
        <Zoom left duration="2000">
          <p>
            <h4>All'Ikhwa Qualified Staff </h4>
            In the minimum years after its existence ALL"IKHWA proved it patient
            care with proper procedures and has hired one of the country and
            world top most staff members.
          </p>
        </Zoom>

        <Zoom right duration="2000">
          {/* <FaPeopleLine className="laboratory" /> */}
          <img
            src={
              "https://thumbs.dreamstime.com/b/qualified-label-isolated-seal-sticker-sign-retro-194927077.jpg"
            }
            className="medicallabelsinwhychooseus"
          />
        </Zoom>
        <Zoom left duration="2000">
          {/* <BiStreetView className="laboratory" /> */}
          <img src={medicallabel03} className="medicallabelsinwhychooseus" />
        </Zoom>
        <Zoom right duration="2000">
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
