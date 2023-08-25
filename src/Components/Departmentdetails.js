import "./Departmentdetails.css";
import React, { useState } from "react";
import NavBar from "./AppLayout/NavBar";
import Footer from "./AppLayout/Footer";
import { Link, useParams, useLocation } from "react-router-dom";

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
      "24 Hour on call for all the patients from all the KPK as well as patients from abroad e.g. Afghanistan and some part of Punjab. GI Lab is open for patients throughout the week for routine procedures e.g. Upper & Lower GI Endoscopp, Banding, Scierotheraphy and Biopsy. Dilation, Stenting, Polypectomy, Sigmoidoscopy, Colonoscopy and m importantly ERCP etc. Patients are also admitted on daily basis for acute emergency, and for workup. Most of the Medicines are provided free from Hospital on daily basis. Doctors Nursing Staff Paramedics are present round o'clock for patients care.Gastroenterology Department consist of 35 beds but due to heavy flow of patients extra beds a given to patients which increases number of patients to fifty d sixty routinely. Patients Suffering from 3 and Hepatitis B are properly counseled about their disease and also help them how to get their treatment free from Pakistan Bait-Ui-Mall. Most of patients investigations are done in hospital laboratory free of cost. Gastroenterology Department has highly qualified consultant.24 Hour on call for all the patients from all the KPK as well as patients from abroad e.g. Afghanistan and some part of Punjab. GI Lab is open for patients throughout the week for routine procedures e.g. Upper & Lower GI Endoscopp, Banding, Scierotheraphy and Biopsy. Dilation, Stenting, Polypectomy, Sigmoidoscopy, Colonoscopy and m importantly ERCP etc. Patients are also admitted on daily basis for acute emergency, and for workup. Most of the Medicines are provided free from Hospital on daily basis. Doctors Nursing Staff Paramedics are present round o'clock for patients care.Gastroenterology Department consist of 35 beds but due to heavy flow of patients extra beds a given to patients which increases number of patients to fifty d sixty routinely. Patients Suffering from 3 and Hepatitis B are properly counseled about their disease and also help them how to get their treatment free from Pakistan Bait-Ui-Mall. Most of patients investigations are done in hospital laboratory free of cost. Gastroenterology Department has highly qualified consultant.24 Hour on call for all the patients from all the KPK as well as patients from abroad e.g. Afghanistan and some part of Punjab. GI Lab is open for patients throughout the week for routine procedures e.g. Upper & Lower GI Endoscopp, Banding, Scierotheraphy and Biopsy. Dilation, Stenting, Polypectomy, Sigmoidoscopy, Colonoscopy and m importantly ERCP etc. Patients are also admitted on daily basis for acute emergency, and for workup. Most of the Medicines are provided free from Hospital on daily basis. Doctors Nursing Staff Paramedics are present round o'clock for patients care.Gastroenterology Department consist of 35 beds but due to heavy flow of patients extra beds a given to patients which increases number of patients to fifty d sixty routinely. Patients Suffering from 3 and Hepatitis B are properly counseled about their disease and also help them how to get their treatment free from Pakistan Bait-Ui-Mall. Most of patients investigations are done in hospital laboratory free of cost. Gastroenterology Department has highly qualified consultant.24 Hour on call for all the patients from all the KPK as well as patients from abroad e.g. Afghanistan and some part of Punjab. GI Lab is open for patients throughout the week for routine procedures e.g. Upper & Lower GI Endoscopp, Banding, Scierotheraphy and Biopsy. Dilation, Stenting, Polypectomy, Sigmoidoscopy, Colonoscopy and m importantly ERCP etc. Patients are also admitted on daily basis for acute emergency, and for workup. Most of the Medicines are provided free from Hospital on daily basis. Doctors Nursing Staff Paramedics are present round o'clock for patients care.Gastroenterology Department consist of 35 beds but due to heavy flow of patients extra beds a given to patients which increases number of patients to fifty d sixty routinely. Patients Suffering from 3 and Hepatitis B are properly counseled about their disease and also help them how to get their treatment free from Pakistan Bait-Ui-Mall. Most of patients investigations are done in hospital laboratory free of cost. Gastroenterology Department has highly qualified consultant.24 Hour on call for all the patients from all the KPK as well as patients from abroad e.g. Afghanistan and some part of Punjab. GI Lab is open for patients throughout the week for routine procedures e.g. Upper & Lower GI Endoscopp, Banding, Scierotheraphy and Biopsy. Dilation, Stenting, Polypectomy, Sigmoidoscopy, Colonoscopy and m importantly ERCP etc. Patients are also admitted on daily basis for acute emergency, and for workup. Most of the Medicines are provided free from Hospital on daily basis. Doctors Nursing Staff Paramedics are present round o'clock for patients care.Gastroenterology Department consist of 35 beds but due to heavy flow of patients extra beds a given to patients which increases number of patients to fifty d sixty routinely. Patients Suffering from 3 and Hepatitis B are properly counseled about their disease and also help them how to get their treatment free from Pakistan Bait-Ui-Mall. Most of patients investigations are done in hospital laboratory free of cost. Gastroenterology Department has highly qualified consultant.",
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
let strr = "";
const stringifyUpper = (strrr) => strrr.toUpperCase().replace("-", " ");

// strr
//   .toUpperCase()
// .trim()
// .replace(" ",/[^\w\s-]/g)
// .replace(" ",/[\s_-]+/g)
//   .replace("-", " ");

function Departmentdetails() {
  // let [displayNotDepartment, setDisplayNotDepartment] = useState(true);
  // try {
  //   const { departmentdetails } = useParams();
  //   const { state } = useLocation("");
  // } catch (err) {
  //   console.log(err);
  // }
  const { departmentdetails } = useParams();
  const { state } = useLocation("");
  // if (state == "") {
  //   setDisplayNotDepartment(false);
  // }
  //   console.log(state.department.name); valid
  //   if ((state = "")) console.log("done");

  return (
    <div className="departmentdetailstop">
      <NavBar />
      <div className="departdetailscontainer">
        {/* this is depart list column  */}
        <div className="departdetailscolumn01">
          {departments.map((department, id) => {
            return (
              <ul>
                <li key={id}>
                  <Link
                    to={
                      "http://localhost:3000/departments/" +
                      department.name.toLowerCase().replace(" ", "-")
                    }
                    state={{ department: department }}
                    className="linkk"
                    style={{ color: "white" }}
                  >
                    <span> {department.name}</span>
                    <span className="departdetailcolumn02arrow">&#8594;</span>
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>
        <div className="departdetailscolumn02Father">
          {/* the class statisticsonlineconsul has been taken from statistics .css file  */}

          <div
            className="statisticsonlineconsul"
            style={{ width: "fit-content", margin: "auto" }}
          >
            Departments{" "}
          </div>
          {/* this is department details column  */}
          {/* {displayNotDepartment && ( */}
          <div className="departmentdetailsexplaining">
            <h4>{state.department.name}</h4>
            <p>{state.department.description}</p>
          </div>
          {/* )} */}
          <div className="departdetailscolumn02"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Departmentdetails;
