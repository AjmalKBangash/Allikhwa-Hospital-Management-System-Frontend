import "./Emergency.css";
import NavBar from "./AppLayout/NavBar";
import Footer from "./AppLayout/Footer";
import { Zoom } from "react-reveal";

function Emergency() {
  return (
    <>
      <NavBar />
      <div className="emergencytop">
        {/* the class statisticsonlineconsul has been taken from statistics .css file  */}
        <div
          className="statisticsonlineconsul"
          style={{ width: "fit-content", margin: "auto" }}
        >
          Emergency{" "}
        </div>
        <div className="emergencyQuestions">
          <p>
            <h3>Our Emergency</h3>
            Sudden illness or injury requiring immediate physicians attention to
            prevent the danger and delay in treatment to save the precious part
            or life with minimum disability or death . Most common cause of
            trauma /injury is road traffic accident. It is the fourth major
            killer after 3 ‘C’ C ommunicable diseases C ancer C ardio vascular
            Popularly it is known as disease of urbanisation or curse of rapid
            development.
          </p>
          <p>
            <h3>TRAUMA SERVICES </h3>TRAUMAA. Accidents are the disease which
            arrives without notice. Resulting in damage, deformity or death.
            INJURY UN EXPECTED UN PLANNED UN ANNOUNCED DAMAGE DEFORMITY DEATH
          </p>
          <p>
            <h3>TRAUMA SERVICES</h3> Because of the nature of its severity, un
            expectedness and fatal outcome A special branch of trauma care
            medicine has been started in large hospitals with trained trauma
            care physicians and surgeons. All efforts are made to provide all
            essential care and investigation in the same premises to save the
            life of trauma patients. Even to minimise the delay in treatment,
            the trauma care is provided at the site of accident in the form of
            basic and advance life care support.
          </p>
          <p>
            <h3>EMERGENCY SERVICES</h3> Depending on size of hospital, nature of
            injuries, population and catchments Area. The services may be:
            EMERGENCY MAJOR EMERGENCY AND DISASTER MANGT. REFFERAL EMERGENCY
            BASIC EMERGENCY OR ROUTINE WITH SP. ON CALL STAND BY EMERGENCY
          </p>
          <p>
            <h3>AIMS AND OBJECTIVE</h3> EMERGENCY RIGHT TREATMENT RIGHT TIME
            RIGHT PLACE RIGHT RESOURCES SCIENCE SYMPATHY SPEED and frequently
            accessing the EMERGENCY department
          </p>
          <p>
            <h3>PLANNING CONSIDERATION </h3> DESIGN FOLLOWS THE FUNCTION’
            PLANNING WORK LOAD PHYSICAL FACILITIES DESIGNING ESSENTIAL
            REQUIREMENTS ADMINISTRATION STRUCTURE LOCATION{" "}
          </p>
        </div>

        <h1>For Contact</h1>
        <div className="reachingEmergency">
          <Zoom left duration="2000">
            <p>
              For an Emergency proposal and instant treatment reach us at:{" "}
              <span mailto="ak1489007@gmail.com">ak1489007@gmail.com</span>
            </p>
          </Zoom>
          <Zoom right duration="2000">
            <p>
              For an Emergency proposal and instant treatment you can also reach
              us at: <span mailto="0092 3334483486">0092 3334483486</span>
            </p>
          </Zoom>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Emergency;
