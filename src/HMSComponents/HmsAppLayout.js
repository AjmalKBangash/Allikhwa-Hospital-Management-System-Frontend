import "./HmsAppLayout.css";

import React, { useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { RiDashboardFill, RiAdminFill } from "react-icons/ri";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserNurse } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";
import { MdPersonalInjury } from "react-icons/md";
import { MdLocalPharmacy } from "react-icons/md";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { BsPersonFillExclamation } from "react-icons/bs";
import { FcDepartment } from "react-icons/fc";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiSolidCommentAdd } from "react-icons/bi";
import { AiFillWechat } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";

const departments = [
  {
    id: "1",
    name: "DASHBOARD",
    logo: RiDashboardFill,
    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    price: 700,
    discount: 10,
    category: "wholeSale",
  },
  {
    id: "2",
    name: "PROFILE",
    logo: BsFillPersonLinesFill,
    pic: "require('./src/Components/CarouselImages/PillsImages/pill02.jpeg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "3",
    name: "ADMINS",
    logo: RiAdminFill,
    pic: "require('./src/Components/CarouselImages/PillsImages/pill02.jpeg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "4",
    name: "DOCTORS",
    logo: FaUserDoctor,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "5",
    name: "PHARMACISTS",
    logo: AiFillMedicineBox,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
  {
    id: "6",
    name: "NURSES",
    logo: FaUserNurse,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill05.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 650,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "7",
    name: "RECEPTIONISTS",
    logo: MdPersonalInjury,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill06.png')",
    description:
      "24 Hour on call for all the patients from all the KPK as well as patients from abroad e.g. Afghanistan and some part of Punjab. GI Lab is open for patients throughout the week for routine procedures e.g. Upper & Lower GI Endoscopp, Banding, Scierotheraphy and Biopsy. Dilation, Stenting, Polypectomy, Sigmoidoscopy, Colonoscopy and m importantly ERCP etc. Patients are also admitted on daily basis for acute emergency, and for workup. Most of the Medicines are provided free from Hospital on daily basis. Doctors Nursing Staff Paramedics are present round o'clock for patients care.Gastroenterology Department consist of 35 beds but due to heavy flow of patients extra beds a given to patients which increases number of patients to fifty d sixty routinely. Patients Suffering from 3 and Hepatitis B are properly counseled about their disease and also help them how to get their treatment free from Pakistan Bait-Ui-Mall. Most of patients investigations are done in hospital laboratory free of cost. Gastroenterology Department has highly qualified consultant.",
    price: 30,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "8",
    name: "STAFF",
    logo: MdLocalPharmacy,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill07.png')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 90,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "9",
    name: "OTHERS",
    logo: FaBuildingCircleArrowRight,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill08.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "10",
    name: "PATIENTS",
    logo: BsPersonFillExclamation,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
    price: 700,
    discount: 10,
    category: "wholeSale",
  },
  {
    id: "11",
    name: "DEPARTMENTS",
    logo: FcDepartment,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill02.jpeg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 700,
    discount: 20,
    category: "wholeSale",
  },
  {
    id: "12",
    name: "EXPENSIS",
    logo: FaMoneyCheckDollar,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 400,
    discount: 50,
    category: "wholeSale",
  },
  {
    id: "13",
    name: "COMPLAINTS",
    logo: BiSolidCommentAdd,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 150,
    discount: 32,
    category: "wholeSale",
  },
  {
    id: "14",
    name: "CHAT",
    logo: AiFillWechat,

    pic: "require('./src/Components/CarouselImages/PillsImages/pill05.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
    price: 650,
    discount: 20,
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
// const { departmentdetails } = useParams();
// const { state } = useLocation("");

function AppLayout() {
  return (
    <>
      <div className="hmstop">
        <div className="hmscontainer">
          <div className="hmscontainercol01">
            {departments.map((department, id) => {
              return (
                <ul>
                  <li key={id}>
                    <NavLink
                      to={"/"}
                      className="linkk"
                      style={{ color: "white" }}
                    >
                      <span className="hmsmanagementicons">
                        <department.logo /> &nbsp;
                      </span>

                      {department.name}
                      <span className="departdetailcolumn02arrow">&#8594;</span>
                    </NavLink>
                  </li>
                </ul>
              );
            })}
          </div>
          <div className="hmscontainercol02">
            <div className="hmscontainercol02_menu">
              <img
                className="hmscontainercol02_img"
                // src={} dynamic
                src="https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-curing-diseases_1258-57233.jpg?w=2000"
                alt="Doctor"
              />
              <IoMdNotifications
                style={{ fontSize: "30px", color: "#fe4200" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
