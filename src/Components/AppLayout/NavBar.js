import "./NavBar.css";
import { ImWhatsapp } from "react-icons/im";
import { HiMenuAlt3 } from "react-icons/hi";
import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const wholesaledrugs = [
  {
    id: "1",
    name: "Vigoor",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    price: 700,
    discount: 10,
    category: "wholeSale",
  },
  {
    id: "2",
    name: "Alatrol",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill02.jpeg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "3",
    name: "Sildenafil",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "4",
    name: "Azythromycin",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
  {
    id: "5",
    name: "Physica",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill05.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 650,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "6",
    name: "Sperex",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill06.png')",
    description:
      "Lalo roghlo za patal londe pategm aw za gadeegam jar shamma bachpana",
    price: 30,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "7",
    name: "Avetex",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill07.png')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 90,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "8",
    name: "Zolpidem",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill08.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "3",
    name: "Sildenafil",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "4",
    name: "Azythromycin",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
  {
    id: "5",
    name: "Physica",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill05.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 650,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "6",
    name: "Sperex",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill06.png')",
    description:
      "Lalo roghlo za patal londe pategm aw za gadeegam jar shamma bachpana",
    price: 30,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "7",
    name: "Avetex",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill07.png')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 90,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "8",
    name: "Zolpidem",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill08.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "3",
    name: "Sildenafil",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "4",
    name: "Azythromycin",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
  {
    id: "5",
    name: "Physica",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill05.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 650,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "6",
    name: "Sperex",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill06.png')",
    description:
      "Lalo roghlo za patal londe pategm aw za gadeegam jar shamma bachpana",
    price: 30,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "7",
    name: "Avetex",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill07.png')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 90,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "8",
    name: "Zolpidem",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill08.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "3",
    name: "Sildenafil",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "4",
    name: "Azythromycin",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
  {
    id: "5",
    name: "Physica",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill05.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 650,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "6",
    name: "Sperex",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill06.png')",
    description:
      "Lalo roghlo za patal londe pategm aw za gadeegam jar shamma bachpana",
    price: 30,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "7",
    name: "Avetex",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill07.png')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 90,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "8",
    name: "Zolpidem",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill08.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
];

function NavBar() {
  const [displayState, setDisplayState] = useState(false);
  // const [nestedDepartState, setNestedDepartState] = useState(false);
  // const refNestedDepartment = useRef();

  function displayMenu() {
    setDisplayState(!displayState);
  }
  // function nestedDepartmen() {
  //   setNestedDepartState(!nestedDepartState);
  //   console.log("Salam");
  // }

  return (
    <div style={{ position: "relative", zIndex: "2" }}>
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
        <ul
          style={{
            display: displayState && "flex",
            borderTop: displayState && "1px solid #fe4200",
          }}
          className="navbar02ul"
        >
          <li
          // onClick={nestedDepartmen}
          >
            <Link className="linkk linkk2">DEPARTMENTS</Link>
            <span style={{ color: "#fe4200" }}>&#x2193;</span>
            <ul
              // ref={refNestedDepartment}
              className="nestedDepartments"
              // style={{ display: nestedDepartState && "grid" }}
              // onMouseOut={nestedDepartment}
            >
              {wholesaledrugs.map((drugs, id) => {
                return (
                  <>
                    <li key={id}>
                      <Link className="linkk">{drugs.name}</Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </li>
          <li>
            <Link className="linkk linkk2">SERVICES</Link>
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
