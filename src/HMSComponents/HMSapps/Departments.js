import "./Departments.css";

import React, { useState } from "react";
import {
  Link,
  useParams,
  useLocation,
  Outlet,
  useMatches,
} from "react-router-dom";
import BreadCrumbs from "../../ForAll/BreadCrumbs";

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
      "24 Hour on call for all the patients from all the KPK as well as patients from abroad e.g. Afghanistan and some part of Punjab. GI Lab is open for patients throughout the week for routine procedures e.g. Upper & Lower GI Endoscopp, Banding, Scierotheraphy and Biopsy. Dilation, Stenting, Polypectomy, Sigmoidoscopy, Colonoscopy and m importantly ERCP etc. Patients are also admitted on daily basis for acute emergency, and for workup. Most of the Medicines are provided free from Hospital on daily basis. Doctors Nursing Staff Paramedics are present round o'clock for patients care.Gastroenterology Department consist of 35 beds but due to heavy flow of patients extra beds a given to patients which increases number of patients to fifty d sixty routinely. Patients Suffering from 3 and Hepatitis B are properly counseled about their disease and also help them how to get their treatment free from Pakistan Bait-Ui-Mall. Most of patients investigations are done in hospital laboratory free of cost. Gastroenterology Department has highly qualified consultant.",
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
    name: "HMSEMERGENCY",
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
    name: "ONCOLOGY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill08.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "18",
    name: "IT DEPARTMENT",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    price: 700,
    discount: 10,
    category: "wholeSale",
  },
  {
    id: "19",
    name: "BIOMEDICAL ENGINEERING",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill02.jpeg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "20",
    name: "PURCHASE AND PROCUREMENT",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "21",
    name: "DEPARTMENT OF ANESTHESIA AND PAIN MANAGEMENT",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
];
let strr = "";
const stringifyUpper = (strrr) => strrr.toUpperCase().replace("-", " ");

function Departments() {
  const [depart_name_for_bread, setDepart_name_for_bread] = useState();
  const { departmentdetails } = useParams();
  const { state } = useLocation("");
  const location = useLocation();

  // Making BreadCrumbs
  // let text_str = location.pathname;
  // replace_to_breadcrumbs(text_str);

  return (
    <div className="department_details_top_hmsapp">
      <BreadCrumbs data={location.pathname + "/" + depart_name_for_bread} />
      <div className="departdetails_container_hmsapps">
        {/* this is depart list column  */}
        <div
          className="departdetails_column01_in_hmsapp"
          // style={{
          //   top: "0%",
          // }}
        >
          <ul>
            <li>
              <Link
                // to={
                //   "http://localhost:3000/all'ikhwa-management-system/departments/" +
                //   department.name.toLowerCase().replace(" ", "-")
                // }
                // to={department.name.toLowerCase().replace(" ", "-")}
                to={"general"}
                // state={{ department: department }}
                className="linkk"
                style={{ color: "white" }}
                onClick={() => setDepart_name_for_bread("GENERAL")}
              >
                <span> GENERAL</span>
                <span className="departdetail_column01_arrow_hmsapps">
                  &#8594;
                </span>
              </Link>
            </li>
            {departments.map((department, id) => {
              return (
                <li key={id}>
                  <Link
                    // to={
                    //   "http://localhost:3000/all'ikhwa-management-system/departments/" +
                    //   department.name.toLowerCase().replace(" ", "-")
                    // }
                    // to={department.name.toLowerCase().replace(" ", "-")}
                    to={department.name.toLowerCase()}
                    state={{ department: department }}
                    className="linkk"
                    style={{ color: "white" }}
                    onClick={() => setDepart_name_for_bread(department.name)}
                  >
                    <span> {department.name}</span>
                    <span className="departdetail_column01_arrow_hmsapps">
                      &#8594;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="departdetails_column02_in_hmsapps">
          {/* the class statisticsonlineconsul has been taken from statistics .css file  */}
          <div
            className="depart_heading"
            style={{ width: "fit-content", margin: "auto" }}
          >
            All'IKHWA Departments Information
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Departments;
