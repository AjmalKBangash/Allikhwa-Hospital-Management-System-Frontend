import "./Doctor.css";
import { Link } from "react-router-dom";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import NavBar from "./AppLayout/NavBar";
import ScrollToTop from "./ScrollToTop";
import Footer from "./AppLayout/Footer";
import { useRef, useState } from "react";

// DUMMY DATA
const doctors = [
  {
    id: "1",
    title: "Jawan khan Bangash",
    name: "CARDIOLOGY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    price: 700,
    discount: 10,
    category: "wholeSale",
  },
  {
    id: "2",
    title: "Ibrar khan Bangash",

    name: "ENDOCRINOLOGY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill02.jpeg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "3",
    title: "Adnan khan Bangash",

    name: "ENT",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "4",
    title: "Hamza khan Bangash",

    name: "EYE",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
  {
    id: "5",
    title: "Musa khan Bangash",

    name: "PHYSICA",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill05.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 650,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "6",
    title: "Mustafa khan Bangash",

    name: "GASTROENTEROLOGY Khan",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill06.png')",
    description:
      "Lalo roghlo za patal londe pategm aw za gadeegam jar shamma bachpana",
    price: 30,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "7",
    title: "Darghjan khan Bangash",

    name: "GYNAE",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill07.png')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 90,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "8",
    title: "Husnain khan Bangash",

    name: "    MAXILLOFACIAL AND DENTISTRY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill08.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "9",
    title: "Hassan khan Bangash",

    name: "    DEPTT OF ORTHOPEDIC & SPINE SURGERY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    price: 700,
    discount: 10,
    category: "wholeSale",
  },
  {
    id: "10",
    title: "Maaz khan Bangash",

    name: "PATHOLOGY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill02.jpeg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "11",
    title: "Hoorain khan ",

    name: "PEADS",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "12",
    title: "Hooria Khtttak ",

    name: "    PLASTIC SURGERY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
  {
    id: "13",
    title: " Bangash",

    name: "RADIOLOGY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill05.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 650,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "14",
    title: "khan",
    name: "SURGICAL",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill06.png')",
    description:
      "Lalo roghlo za patal londe pategm aw za gadeegam jar shamma bachpana",
    price: 30,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "15",
    title: "Bilal Bangash",

    name: "    ACCIDENT AND EMERGENCY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill07.png')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 90,
    discount: 20,
    category: "wholeSale",
  },
];
function Doctor() {
  const showdetailsref = useRef();
  const [propfromshodetailsdoctorcard, setpropfromshodetailsdoctorcard] =
    useState();
  function showdoctordetailsFun(doctorpropfromcard) {
    setpropfromshodetailsdoctorcard(doctorpropfromcard);
    showdetailsref.current.style.display = "flex";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <div className="doctortop">
        <div className="doctordetails" ref={showdetailsref}>
          {" "}
          {/* first we will display card on right side for the dr details which users clixked on  */}
          {propfromshodetailsdoctorcard && (
            <>
              <div className="doctorcard">
                <img
                  className="doctorimgincard"
                  src={
                    "https://img.freepik.com/premium-vector/avatar-bearded-doctor-doctor-with-stethoscope-vector-illustrationxa_276184-31.jpg"
                  }
                />
                <div className="doctorcoverofimgtagsindoctorcard">
                  <h3 className="doctornameincard">
                    {propfromshodetailsdoctorcard.title}
                  </h3>
                  <h6 className="jobtitleincard">Assistent Professor</h6>
                  <br />
                  <h5 className="byprofessionincard">
                    {propfromshodetailsdoctorcard.name}
                  </h5>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Link className="linkk">
                      <BiLogoFacebookCircle
                        style={{ color: "#3b5998" }}
                        className="fblogosincard"
                      />
                    </Link>
                    <Link className="linkk">
                      <AiFillTwitterCircle
                        style={{ color: "#00acee" }}
                        className="fblogosincard"
                      />
                    </Link>
                    <Link className="linkk">
                      <AiFillGooglePlusCircle
                        style={{ color: "#f7b529" }}
                        className="fblogosincard"
                      />
                    </Link>
                    <span
                      className="viewdetailsincard"
                      onClick={() => {
                        showdoctordetailsFun(propfromshodetailsdoctorcard);
                      }}
                    >
                      <Link className="linkk" style={{ color: "#fe4200" }}>
                        View Details
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              {/* )} */}
              <div className="col2indocdetails">
                {" "}
                <table className="employee_GeneratedTable">
                  <tbody>
                    <tr>
                      <td>
                        {" "}
                        <div
                          className="statisticsonlineconsul"
                          style={{
                            width: "fit-content",
                            margin: "auto",
                          }}
                        >
                          DOCTOR DETAILS{" "}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{propfromshodetailsdoctorcard.title}</td>
                    </tr>
                    <tr>
                      <td>Education</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Experience</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Department</td>
                      <td> {propfromshodetailsdoctorcard.name}</td>
                    </tr>
                    <tr>
                      <td>Award and Reconitions</td>
                      <td>
                        Letter of Appreciation for Running Transparent Project
                        for Cancer Patients P & D Department Best Construction
                        to Post graduate medical education in PGMI :2013 and
                        2014 Best Reviewer Award :JPGMI,Peshawar Honors Award
                        for Passing MHPE with distinction .The Aga Khan
                        University,Karachi Over Thirty Publications in national
                        and International peer reviewed journals
                      </td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>0092 3334483486</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>ak1489007@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>www.All'Ikhwa.com</td>
                    </tr>
                    {/* <tr>
                  <td>Facebook</td>
                  <td>Cell</td>
                </tr> */}
                    <tr>
                      <td>Linkedin</td>
                      <td>AjmalKBangash</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div className="doctorslider">
          {doctors.map((doctor, id) => {
            return (
              <>
                <div className="doctorcard">
                  <div>
                    <img
                      className="doctorimgincard"
                      src={
                        //   "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        "https://img.freepik.com/premium-vector/avatar-bearded-doctor-doctor-with-stethoscope-vector-illustrationxa_276184-31.jpg"
                      }
                    />
                  </div>
                  <div className="doctorcoverofimgtagsindoctorcard">
                    <h3 className="doctornameincard">{doctor.title}</h3>
                    <h6 className="jobtitleincard">Assistent Professor</h6>
                    <br />
                    <h5 className="byprofessionincard">{doctor.name}</h5>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Link className="linkk">
                        <BiLogoFacebookCircle
                          style={{ color: "#3b5998" }}
                          className="fblogosincard"
                        />
                      </Link>
                      <Link className="linkk">
                        <AiFillTwitterCircle
                          style={{ color: "#00acee" }}
                          className="fblogosincard"
                        />
                      </Link>
                      <Link className="linkk">
                        <AiFillGooglePlusCircle
                          style={{ color: "#f7b529" }}
                          className="fblogosincard"
                        />
                      </Link>
                      <span
                        className="viewdetailsincard"
                        onClick={() => {
                          showdoctordetailsFun(doctor);
                        }}
                      >
                        <Link className="linkk" style={{ color: "#fe4200" }}>
                          View Details
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
{
  /* every related Dr (doctor) should be displayed in every related department under the department explation.  */
}

export default Doctor;

//  <p className="doctordescriptionincard">
//    Dr is working in the department of plastic surgery. And Dr John Smith has
//    done his specialization from Islamabad hynded hospital and is having 10
//    years plus experience in this field.{" "}
//  </p>;
