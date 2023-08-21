import "./Admins.css";
import AddUpdateForm from "./AddUpdateForm";

import { Link } from "react-router-dom";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";

import ScrollToTop from "/home/ajay/Desktop/FYP/allikhwa/src/Components/ScrollToTop.js";
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
];
const employee_details = [
  {
    id: "1",
    title: "Husnain khan Bangash",
    name: "CARDIOLOGY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    education: "metric pass",
    experience:
      "5 years of experience in medicine, and two years of experience in pharmacy",
    department: "Plastic Surgery",
    Awards_and_recognitions: "Skill Award, Best Communication Award",
    address:
      "House # 437, Street # 09, Sector # F10, Phase# 06, HayatAbad, Peshawar",
    Phone: "00923334483486",
    email: "ak1489007@gmail.com",
    facebook: "AjmalKBangash",
    linkedin: "AjmalKBangash",
  },
  {
    id: "2",
    title: "Hoorain khan Bangash",
    name: "ENR",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    education: "metric pass",
    experience:
      "5 years of experience in medicine, and two years of experience in pharmacy",
    department: "Cardiology",
    Awards_and_recognitions: "Skill Award, Best Communication Award",
    address:
      "House # 437, Street # 09, Sector # F10, Phase# 06, HayatAbad, Peshawar",
    Phone: "00923334483486",
    email: "ak1489007@gmail.com",
    facebook: "AjmalKBangash",
    linkedin: "AjmalKBangash",
  },
  {
    id: "3",
    title: "Hassan Bangash",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    education: "metric pass",
    experience:
      "5 years of experience in medicine, and two years of experience in pharmacy",
    department: "ENT",
    Awards_and_recognitions: "Skill Award, Best Communication Award",
    address:
      "House # 437, Street # 09, Sector # F10, Phase# 06, HayatAbad, Peshawar",
    Phone: "00923334483486",
    email: "ak1489007@gmail.com",
    facebook: "AjmalKBangash",
    linkedin: "AjmalKBangash",
  },
];
function Admins() {
  let trrr = true;
  const showdetailsref = useRef();
  const [propfromshodetailsdoctorcard, setpropfromshodetailsdoctorcard] =
    useState();
  const [displayFormForAddUpdate, setDisplayFormForAddUpdate] = useState(false);
  const [displayFormForUpdate, setDisplayFormForUpdate] = useState(false);

  const [admin_add_button_display, set_admin_add_button_display] =
    useState(true);

  function showdoctordetailsFun(doctorpropfromcard) {
    setpropfromshodetailsdoctorcard(doctorpropfromcard);
    setDisplayFormForAddUpdate(false);
    showdetailsref.current.style.display = "flex";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <ScrollToTop />
      <div className="admin_buttons_add_update">
        {admin_add_button_display && (
          <button
            style={{ width: "150px" }}
            onClick={() => setDisplayFormForAddUpdate(true)}
            className="admin_buttons_add_update_from_add_update_form"
          >
            ADD ADMIN
          </button>
        )}
        {displayFormForAddUpdate && (
          <button
            onClick={() => {
              setDisplayFormForAddUpdate(false);
              set_admin_add_button_display(true);
            }}
          >
            CANCEL
          </button>
        )}
        {displayFormForUpdate && (
          <button
            onClick={() => {
              setDisplayFormForAddUpdate(false);
              set_admin_add_button_display(true);
              setDisplayFormForUpdate(false);
            }}
          >
            CANCEL
          </button>
        )}
        {propfromshodetailsdoctorcard && (
          <>
            <button
              onClick={() => {
                set_admin_add_button_display(false);
                setDisplayFormForUpdate(true);
                setDisplayFormForAddUpdate(false);
              }}
            >
              EDIT
            </button>
            <button>DELETE</button>
          </>
        )}
      </div>

      {displayFormForUpdate && (
        <AddUpdateForm data={propfromshodetailsdoctorcard} />
      )}
      {displayFormForAddUpdate && <AddUpdateForm />}
      <div className="doctortop">
        <div className="doctordetails" ref={showdetailsref}>
          {/* first we will display card on right side for the dr details which users clixked on  */}
          {propfromshodetailsdoctorcard && (
            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
              <div className="doctorcard">
                <img
                  className="doctorimgincard"
                  src={
                    "https://media.istockphoto.com/id/1390000431/photo/shot-of-a-mature-doctor-using-a-digital-tablet-in-a-modern-hospital.webp?b=1&s=170667a&w=0&k=20&c=Jxhk_KZSo9oSZ01Nv8TxjCKKEVZQJFVWICZb64AEIMQ="
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
                          ADMIN DETAILS{" "}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td> {propfromshodetailsdoctorcard.title}</td>
                    </tr>
                    <tr>
                      <td>Job Title</td>
                      <td>Assistent Professor</td>
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
                    <tr>
                      <td>Facebook</td>
                      <td>Cell</td>
                    </tr>
                    <tr>
                      <td>Linkedin</td>
                      <td>AjmalKBangash</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="doctorslider">
          {doctors.map((doctor, id) => {
            return (
              <>
                <div className="doctorcard">
                  <img
                    className="doctorimgincard"
                    src={
                      //   "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"

                      "https://southfloridahospitalnews.com/wp-content/uploads/2023/02/Dawkins-Bryan.jpg"
                    }
                  />
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
    </>
  );
}
{
  /* every related Dr (doctor) should be displayed in every related department under the department explation.  */
}

export default Admins;
