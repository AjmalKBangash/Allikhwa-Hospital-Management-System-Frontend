import { matchPath } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { allikhwa_department_infomation_dynamic_name } from "../../Store/Store";

import React, { useEffect, useState } from "react";
import { NavLink, useParams, useLocation, Outlet } from "react-router-dom";
import BreadCrumbs from "../../ForAll/BreadCrumbs";
import axios from "axios";

function RecDepartments() {
  const [depart_name_for_bread, setDepart_name_for_bread] = useState();
  const [departments, setdepartments] = useState();
  const [departments02, setdepartments02] = useState();
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

  useEffect(() => {
    let listtt = [];
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/nurses/97636d9c-e815-488b-a1c0-e60961e1645e"
      )
      .then((res) => {
        var departments = res.data.employee_departments
          .split(",")
          .map(function (department) {
            return { name: department.trim() };
          });
        setdepartments02(departments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //  FETCHIN DEPARTMENT ON THE BASIS OF DOCTOR because THESE DEPARTMENTS ARE ALLOCATED TO DOCTORS BY HOSPITAL ADMINISTRATION
  useEffect(() => {
    if (departments02) {
      try {
        const fetchdepartments = async () => {
          const responses = await Promise.all(
            departments02.map((department) => {
              return axios.get(
                "http://localhost:8000/allikhwa-hms/departments/" +
                  department.name.toUpperCase()
              );
            })
          );
          const departments_from_responses = responses.map(
            (department) => department.data
          );
          const arrayOfObjects = [].concat(...departments_from_responses);
          // console.log(arrayOfObjects);
          setdepartments(arrayOfObjects);
          // setrerendertwo_axios_gets(false);
        };

        fetchdepartments();
      } catch (error) {
        console.log(error);
      } // rerendertwo_axios_gets
    }
  }, [departments02]);
  return (
    <div className="department_details_top_hmsapp">
      <BreadCrumbs data={location.pathname + "/" + depart_name_for_bread} />
      <div className="departdetails_container_hmsapps">
        {/* this is depart list column  */}
        <div
          className="departdetails_column01_in_hmsapp"
          style={{ backgroundColor: "#013737" }}
        >
          <ul>
            {departments &&
              departments.map((department, id) => {
                return (
                  <NavLink
                    key={id}
                    to={
                      "http://localhost:3000/rec-hms/rec-departments/" +
                      Replacing(department.department_name.toLowerCase().trim())
                    }
                    className={
                      departmentname ===
                      Replacing(department.department_name.toLowerCase().trim())
                        ? "active linkk"
                        : "linkk"
                    }
                    state={[
                      department.department_name,
                      department.department_description,
                    ]}
                    style={{ color: "white" }}
                    onClick={() => {
                      setDepart_name_for_bread(
                        Replacing(department.department_name.trim())
                      );
                    }}
                  >
                    <li key={id + 1}>
                      <span> {department.department_name}</span>
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

export default RecDepartments;

// import { matchPath } from "react-router-dom";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { useDispatch } from "react-redux";
// import { allikhwa_department_infomation_dynamic_name } from "../../Store/Store";

// import React, { useState } from "react";
// import { NavLink, useParams, useLocation, Outlet } from "react-router-dom";
// import BreadCrumbs from "../../ForAll/BreadCrumbs";

// const departments = [
//   {
//     id: "111",
//     name: "GENERAL",
//     pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
//     description:
//       "Used in men who do not make enough of a natural substance called testosterone ",
//   },
//   {
//     id: "1",
//     name: "CARDIOLOGY",
//     pic: "require('./src/Components/CarouselImages/PillsImages/pill01.png')",
//     description:
//       "Used in men who do not make enough of a natural substance called testosterone ",
//     price: 700,
//     discount: 10,
//     category: "wholeSale",
//   },
//   {
//     id: "2",
//     name: "ENDOCRINOLOGY",
//     pic: "require('./src/Components/CarouselImages/PillsImages/pill02.jpeg')",
//     description:
//       "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
//     price: 700,
//     discount: 20,
//     category: "wholeSale",
//   },
//   {
//     id: "3",
//     name: "ENT",
//     pic: "require('./src/Components/CarouselImages/PillsImages/pill03.webp')",
//     description:
//       "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
//     price: 400,
//     discount: 50,
//     category: "wholeSale",
//   },
//   {
//     id: "4",
//     name: "EYE",
//     pic: "require('./src/Components/CarouselImages/PillsImages/pill04.jpg')",
//     description:
//       "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
//     price: 150,
//     discount: 32,
//     category: "wholeSale",
//   },
//   {
//     id: "6",
//     name: "GASTROENTEROLOGY",
//     description:
//       "24 Hour on call for all the patients from all the KPK as well as patients from abroad e.g. Afghanistan and some part of Punjab. GI Lab is open for patients throughout the week for routine procedures e.g. Upper & Lower GI Endoscopp, Banding, Scierotheraphy and Biopsy. Dilation, Stenting, Polypectomy, Sigmoidoscopy, Colonoscopy and m importantly ERCP etc. Patients are also admitted on daily basis for acute emergency, and for workup. Most of the Medicines are provided free from Hospital on daily basis. Doctors Nursing Staff Paramedics are present round o'clock for patients care.Gastroenterology Department consist of 35 beds but due to heavy flow of patients extra beds a given to patients which increases number of patients to fifty d sixty routinely. Patients Suffering from 3 and Hepatitis B are properly counseled about their disease and also help them how to get their treatment free from Pakistan Bait-Ui-Mall. Most of patients investigations are done in hospital laboratory free of cost. Gastroenterology Department has highly qualified consultant.",
//   },
//   {
//     id: "7",
//     name: "GYNAE",
//     description:
//       "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
//   },
//   {
//     id: "9",
//     name: "ORTHOPEDIC & SPINE SURGERY",
//     description:
//       "Used in men who do not make enough of a natural substance called testosterone ",
//   },
//   {
//     id: "11",
//     name: "PEADS",
//     description:
//       "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
//   },
//   {
//     id: "12",
//     name: "PLASTIC SURGERY",
//     description:
//       "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
//   },
// ];

// function RecDepartments() {
//   const [depart_name_for_bread, setDepart_name_for_bread] = useState();
//   const { departmentname } = useParams();
//   const location = useLocation();
//   const allikhwa_department_infomation_dynamic_name_var = useSelector(
//     (state) => state.allikhwa_department_infomation_dynamic_name
//   );
//   const dispatch = useDispatch();

//   function Replacing(text) {
//     const replaced = [];
//     for (let i = 0; i < text.length; i++) {
//       const path = text[i].replace(" ", "-");
//       replaced.push(path);
//     }
//     return replaced.join("");
//   }

//   const path_in_departments = matchPath(
//     "/rec-HMS/rec-departments",
//     location.pathname
//   );
//   if (path_in_departments) {
//     dispatch(allikhwa_department_infomation_dynamic_name(""));
//   }

//   return (
//     <div className="department_details_top_hmsapp">
//       <BreadCrumbs data={location.pathname + "/" + depart_name_for_bread} />
//       <div className="departdetails_container_hmsapps">
//         {/* this is depart list column  */}
//         <div className="departdetails_column01_in_hmsapp">
//           <ul>
//             {departments.map((department, id) => {
//               return (
//                 <NavLink
//                   key={id}
//                   to={
//                     "http://localhost:3000/rec-hms/rec-departments/" +
//                     Replacing(department.name.toLowerCase().trim())
//                   }
//                   className={
//                     departmentname ===
//                     Replacing(department.name.toLowerCase().trim())
//                       ? "active linkk"
//                       : "linkk"
//                   }
//                   state={[department.name, department.description]}
//                   style={{ color: "white" }}
//                   onClick={() => {
//                     setDepart_name_for_bread(Replacing(department.name.trim()));
//                   }}
//                 >
//                   <li key={id}>
//                     <span> {department.name}</span>
//                     <span className="departdetail_column01_arrow_hmsapps">
//                       &#8594;
//                     </span>
//                   </li>
//                 </NavLink>
//               );
//             })}
//           </ul>
//         </div>
//         <div
//           className="departdetails_column02_in_hmsapps"
//           style={{ left: "0vw" }}
//         >
//           <h2 className="fillfreebeds_h2">
//             All'IKHWA{" "}
//             <span style={{ color: "#fe4200" }}>
//               {allikhwa_department_infomation_dynamic_name_var}
//             </span>{" "}
//             DEPARTMENT INFORMATION
//           </h2>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecDepartments;
