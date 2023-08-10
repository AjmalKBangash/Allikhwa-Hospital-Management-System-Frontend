import "./NavBar.css";
import Emergency from "../Emergency";
import { ImWhatsapp } from "react-icons/im";
import { HiMenuAlt3 } from "react-icons/hi";
import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";
import { Link, useParams } from "react-router-dom";
import { useRef, useState } from "react";

const departments = [
  {
    id: "1",
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
    name: "GASTROENTEROLOGY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill06.png')",
    description:
      "Lalo roghlo za patal londe pategm aw za gadeegam jar shamma bachpana",
    price: 30,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "7",
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
    name: "    ACCIDENT AND EMERGENCY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill07.png')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 90,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "16",
    name: "    HUMAN RESOURCEY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill08.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "17",
    name: " ONCOLOGY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill08.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "18",
    name: "       IT DEPARTMENT",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    price: 700,
    discount: 10,
    category: "wholeSale",
  },
  {
    id: "19",
    name: "    BIOMEDICAL ENGINEERING",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill02.jpeg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "20",
    name: "    PURCHASE AND PROCUREMENT",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "21",
    name: "        DEPARTMENT OF ANESTHESIA AND PAIN MANAGEMENT",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
];

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

function NavBar() {
  const [displayState, setDisplayState] = useState(false);
  let { departmentname } = useParams();
  // const [nestedDepartState, setNestedDepartState] = useState(false);
  // const refNestedDepartment = useRef();

  function displayMenu() {
    setDisplayState(!displayState);
  }
  // function nestedDepartmen() {
  //   setNestedDepartState(!nestedDepartState);
  //   console.log("Salam");
  // }
  function navbardepartmentlisthoverFunOver(e) {
    e.target.style.color = "#fe4200";
  }
  function navbardepartmentlisthoverFunOut(e) {
    e.target.style.color = "black";
  }

  return (
    <div style={{ position: "relative", zIndex: "2" }}>
      <div className="navbar01">
        <ul>
          <Link to={"/"}>
            <li>
              <img src={AllikhwaLogo} />
            </li>
          </Link>

          <li>
            <Link to={"/Emergency"} className="linkk" style={{ color: "red" }}>
              <span>EMERGENCY</span>
            </Link>
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
          <Link to={"/Donate"} className="linkk ">
            <li className="donate">Donate Now</li>
          </Link>
        </ul>
      </div>
      <div className="navbar02">
        <div className="navbar03">
          <ul>
            <li>
              <Link className="linkk ">HOME</Link>
            </li>
            <li onClick={displayMenu}>
              <Link className="linkk ">
                <HiMenuAlt3 />
              </Link>
            </li>
          </ul>
        </div>
        <ul
          style={{
            display: displayState && "flex",
            borderTop: displayState && "1px solid #fe4200",
          }}
          className="navbar02ul"
        >
          <li>
            {/* <Link className="linkk linkk2"> */}
            <span className="linkk2">DEPARTMENTS</span>
            {/* </Link> */}
            <span style={{ color: "#fe4200" }}>&#x2193;</span>
            <ul
              // ref={refNestedDepartment}
              className="nestedDepartments"
              // style={{ display: nestedDepartState && "grid" }}
              // onMouseOut={nestedDepartment}
            >
              {departments.map((department, id) => {
                return (
                  <>
                    <li key={id} className="navbardepartmentlisthover">
                      <Link
                        to={"http://localhost:3000/" + slugify(department.name)}
                        state={{ department: department }}
                        className="linkk "
                        onMouseOver={navbardepartmentlisthoverFunOver}
                        onMouseOut={navbardepartmentlisthoverFunOut}
                      >
                        {department.name}
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </li>
          <li>
            <Link to={"/Appointment"} className="linkk linkk2">
              SERVICES
            </Link>
            <span style={{ color: "#fe4200" }}>&#x2193;</span>
          </li>
          <li>
            <Link className="linkk linkk2">
              DOCTORS<span style={{ color: "#fe4200" }}>&#x2193;</span>
            </Link>
          </li>
          <li>
            <Link className="linkk linkk2">ABOUT US</Link>
          </li>
          <li>
            <Link className="linkk linkk2">CURRENT FLOW</Link>
          </li>
          <li>
            <Link to={"/eStore"} className="linkk linkk2">
              eStore
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;

// CARDIOLOGY
// ENDOCRINOLOGY
// ENT
// EYE
// GASTROENTEROLOGY
// GYNAE

// MAXILLOFACIAL AND DENTISTRY
// MEDICAL
// NEUROSURGRY
// DEPTT OF ORTHOPEDIC & SPINE SURGERY
// PATHOLOGY
// PEADS

// PLASTIC SURGERY
// RADIOLOGY
// SURGICAL
// ACCIDENT AND EMERGENCY
// HUMAN RESOURCE
// PHARMACY

// ONCOLOGY
// IT DEPARTMENT
// BIOMEDICAL ENGINEERING
// PURCHASE AND PROCUREMENT
// DEPARTMENT OF ANESTHESIA AND PAIN MANAGEMENT

{
  /* <li>CARDIOCRINOLOGY</li>
              <li className="nestedEnt">
                ENT <span style={{ color: "#fe4200" }}>&#x2193;</span>
                <ul>
                  <li>ENT A</li>
                  <li>ENT B</li>
                </ul>
              </li>
              <li>
                <Link className="linkk">EYE</Link>
              </li>
              <li>GASTROENTEROLOGY</li>
              <li>GYNAE</li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  MAXILLOFACIAL AND DENTISTRY{" "}
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  MEDICAL
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  NEUROSURGRY
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  DEPTT OF ORTHOPEDIC & SPINE SURGERY{" "}
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  PATHOLOGY
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  PEADS
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  PLASTIC SURGERY
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  RADIOLOGY
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  ACCIDENT AND EMERGENCY
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  HUMAN RESOURCE
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  PHARMACY
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  ONCOLOGY
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  {" "}
                  IT DEPARTMENT
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  BIOMEDICAL
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  {" "}
                  ENGINEERING PURCHASE AND PROCUREMENT
                </Link>
              </li>
              <li>
                <Link className="linkk" to={"/eStore"}>
                  {" "}
                  DEPARTMENT OF ANESTHESIA AND PAIN MANAGEMENT
                </Link>
              </li>LOGY </li>
              <li>ENDO */
}
