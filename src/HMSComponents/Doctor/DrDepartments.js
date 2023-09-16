import { matchPath } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { allikhwa_department_infomation_dynamic_name } from "../../Store/Store";

import React, { useState } from "react";
import { NavLink, useParams, useLocation, Outlet } from "react-router-dom";
import BreadCrumbs from "../../ForAll/BreadCrumbs";

const departments = [
  {
    id: "111",
    name: " GENERAL",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
  },
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
    description:
      "24 Hour on call for all the patients from all the KPK as well as patients from abroad e.g. Afghanistan and some part of Punjab. GI Lab is open for patients throughout the week for routine procedures e.g. Upper & Lower GI Endoscopp, Banding, Scierotheraphy and Biopsy. Dilation, Stenting, Polypectomy, Sigmoidoscopy, Colonoscopy and m importantly ERCP etc. Patients are also admitted on daily basis for acute emergency, and for workup. Most of the Medicines are provided free from Hospital on daily basis. Doctors Nursing Staff Paramedics are present round o'clock for patients care.Gastroenterology Department consist of 35 beds but due to heavy flow of patients extra beds a given to patients which increases number of patients to fifty d sixty routinely. Patients Suffering from 3 and Hepatitis B are properly counseled about their disease and also help them how to get their treatment free from Pakistan Bait-Ui-Mall. Most of patients investigations are done in hospital laboratory free of cost. Gastroenterology Department has highly qualified consultant.",
  },
  {
    id: "7",
    name: "GYNAE",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
  },
  {
    id: "9",
    name: "ORTHOPEDIC & SPINE SURGERY",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
  },
  {
    id: "11",
    name: "PEADS",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
  },
  {
    id: "12",
    name: "PLASTIC SURGERY",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
  },

  {
    id: "21",
    name: "ANESTHESIA AND PAIN MANAGEMENT",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
];

function DrDepartments() {
  const [depart_name_for_bread, setDepart_name_for_bread] = useState();
  const { departmentname } = useParams();
  const location = useLocation();
  const allikhwa_department_infomation_dynamic_name_var = useSelector(
    (state) => state.allikhwa_department_infomation_dynamic_name
  );
  const dispatch = useDispatch();

  function Replacing(text) {
    const replaced = [];
    for (let i = 0; i < text.length; i++) {
      const path = text[i].replace(" ", "-");
      replaced.push(path);
    }
    return replaced.join("");
  }

  const path_in_departments = matchPath(
    "/doctor-HMS/dr-departments",
    location.pathname
  );
  if (path_in_departments) {
    dispatch(allikhwa_department_infomation_dynamic_name(""));
  }

  return (
    <div className="department_details_top_hmsapp">
      <BreadCrumbs data={location.pathname + "/" + depart_name_for_bread} />
      <div className="departdetails_container_hmsapps">
        {/* this is depart list column  */}
        <div className="departdetails_column01_in_hmsapp">
          <ul>
            {departments.map((department, id) => {
              return (
                <NavLink
                  key={id}
                  to={
                    "http://localhost:3000/doctor-hms/dr-departments/" +
                    Replacing(department.name.toLowerCase().trim())
                  }
                  className={
                    departmentname ===
                    Replacing(department.name.toLowerCase().trim())
                      ? "active linkk"
                      : "linkk"
                  }
                  state={[department.name, department.description]}
                  style={{ color: "white" }}
                  onClick={() => {
                    setDepart_name_for_bread(Replacing(department.name.trim()));
                  }}
                >
                  <li key={id}>
                    <span> {department.name}</span>
                    <span className="departdetail_column01_arrow_hmsapps">
                      &#8594;
                    </span>
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div
          className="departdetails_column02_in_hmsapps"
          style={{ left: "0vw" }}
        >
          <h2 className="fillfreebeds_h2">
            All'IKHWA{" "}
            <span style={{ color: "#fe4200" }}>
              {allikhwa_department_infomation_dynamic_name_var}
            </span>{" "}
            DEPARTMENT INFORMATION
          </h2>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DrDepartments;
