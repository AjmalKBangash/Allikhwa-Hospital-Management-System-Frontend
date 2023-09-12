import "./Departments.css";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { matchPath } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { allikhwa_department_infomation_dynamic_name } from "../../Store/Store";

import React, { useEffect, useState } from "react";
import { NavLink, useParams, useLocation, Outlet } from "react-router-dom";
import BreadCrumbs from "../../ForAll/BreadCrumbs";
import axios from "axios";
import { useDispatch } from "react-redux";

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
    id: "8",
    name: "    MAXILLOFACIAL AND DENTISTRY",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
  },
  {
    id: "9",
    name: "DEPTT OF ORTHOPEDIC & SPINE SURGERY",
    description:
      "Used in men who do not make enough of a natural substance called testosterone ",
  },
  {
    id: "10",
    name: "PATHOLOGY",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
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
    id: "13",
    name: "RADIOLOGY",
    pic: "require('./src/Components/CarouselImages/PillsImages/pill05.jpg')",
    description:
      "Relief of symptoms associated with seasonal allergic rhinitis due to allergen",
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
    name: "HUMAN RESOURCEY",
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
    name: "      IT DEPARTMENT",
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

function Departments() {
  const [depart_name_for_bread, setDepart_name_for_bread] = useState();
  const [display_adding_depart, setDisplay_adding_depart] = useState(false);
  const [display_adding_depart_button, setDisplay_adding_depart_button] =
    useState(true);
  const [sending_added_depart_data, setSending_added_depart_data] = useState();
  const { departmentname } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const allikhwa_department_infomation_dynamic_name_var = useSelector(
    (state) => state.allikhwa_department_infomation_dynamic_name
  );

  const department_adding_validation_schema = Yup.object().shape({
    depart_name: Yup.string()
      .max(50, "Must be less than 50 characters!")
      .required("Department Name is Required")
      .matches(
        /^[A-Za-z\s]+(?:,[a-zA-Z\s]+)*$/g,
        "Department name should not inculde any digits, numbers, special characters. Example (ENT A) or (Cardiology)  etc"
      ),
    depart_description: Yup.string()
      .min(200, "Must be greater than 200 characters!")
      .required("Department Description is Required"),
  });

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(department_adding_validation_schema),
  });

  const handle_department_adding_fun = (data) => {
    alert(JSON.stringify(data));
    setSending_added_depart_data(data);
    reset();
  };

  function Replacing(text) {
    const replaced = [];
    for (let i = 0; i < text.length; i++) {
      const path = text[i].replace(" ", "-");
      replaced.push(path);
    }
    return replaced.join("");
  }
  useEffect(() => {
    axios
      .post("localhost:3100/departmentnames", { sending_added_depart_data })
      // .then((res) => {
      //   console.log(res);
      // })
      .catch((error) => {
        console.log(error);
      });
  }, [sending_added_depart_data]);
  const path_in_departments = matchPath(
    "/all'ikhwa-management-system/departments/",
    location.pathname
  );
  useEffect(() => {
    if (path_in_departments) {
      setDisplay_adding_depart_button(true);
      dispatch(allikhwa_department_infomation_dynamic_name(""));
    } else {
      setDisplay_adding_depart_button(false);
    }
  }, [path_in_departments]);
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
                  to={
                    "http://localhost:3000/all'ikhwa-management-system/departments/" +
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
                    setDisplay_adding_depart_button(false);
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
        <div className="departdetails_column02_in_hmsapps">
          {/* the class statisticsonlineconsul has been taken from statistics .css file  */}
          <h2 className="fillfreebeds_h2">
            All'IKHWA{" "}
            <span style={{ color: "#fe4200" }}>
              {allikhwa_department_infomation_dynamic_name_var}
            </span>{" "}
            DEPARTMENT INFORMATION
          </h2>
          {display_adding_depart_button && (
            <>
              {/* <h2 className="fillfreebeds_h2">
                All'IKHWA DEPARTMENTS INFORMATION
              </h2> */}

              <button
                onClick={() => setDisplay_adding_depart(true)}
                className="admin_buttons_add_update_from_add_update_form"
                style={{ display: "block", margin: "0 10px 0 auto" }}
              >
                ADD DEPARTMENT
              </button>
            </>
          )}

          <div>
            {display_adding_depart && (
              <form
                onSubmit={handleSubmit(handle_department_adding_fun)}
                style={{
                  position: "relative",
                  width: "60%",
                  margin: "20px auto 20px auto",
                  padding: "20px",
                  boxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                  webkitboxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                  mozboxShadow: "0px 1px 4px 0px rgb(1, 55, 55)",
                }}
              >
                <div className="fillfreebeds_h2">
                  <h2 style={{ fontSize: "15px" }}>ADDING DEPARTMENT</h2>
                  <p
                    style={{
                      fontSize: "15px",
                      right: "2%",
                      top: "2%",
                      position: "absolute",
                      padding: "10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      boxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
                      webkitboxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
                      mozboxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
                    }}
                    onClick={() => setDisplay_adding_depart(false)}
                  >
                    &#10060;
                  </p>
                </div>
                <div className="profile_label_input ">
                  <label
                    htmlFor="total_beds"
                    className="profile_lanel_input_label"
                  >
                    Your Department name:
                  </label>
                  <input
                    id="depart_name"
                    type="text"
                    {...register("depart_name")}
                    placeholder="Enter Your Department Name"
                  ></input>
                  <p className="pForForm">{errors.depart_name?.message}</p>
                </div>
                <div className="profile_label_input ">
                  <span>
                    <p>
                      <label htmlFor="depart_description">
                        Department Bio:
                      </label>
                    </p>
                    <p>Write Your Department Description:</p>
                    <p className="pForForm">
                      {errors.depart_description?.message}
                    </p>
                  </span>
                  <div>
                    <div
                      style={{
                        margin: "10px 0",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <select
                        // {...register("beds_description")}
                        defaultValue={"Normal text"}
                        style={{
                          fontSize: "15px",
                          backgroundColor: "white",
                          border: "1px solid rgba(0, 0, 0, 0.199)",
                          borderRadius: "4px",
                          padding: "10px",
                          marginRight: "5px",
                        }}
                      >
                        <option>Normal text</option>
                        <option>Bold text</option>
                        <option>Italix text</option>
                      </select>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "900",
                          border: "1px solid rgba(0, 0, 0, 0.199)",
                          borderRadius: "4px",
                          padding: "7px 10px ",
                          marginRight: "5px",
                        }}
                      >
                        B
                      </span>
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "900",
                          border: "1px solid rgba(0, 0, 0, 0.199)",
                          borderRadius: "4px",
                          padding: "7px 10px",
                          marginRight: "5px",
                          fontFamily: "serif",
                        }}
                      >
                        <i>I</i>
                      </span>

                      <AiOutlineOrderedList
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.199)",
                          borderRadius: "4px",
                          padding: "10px",
                          marginRight: "5px",
                        }}
                      />
                      <AiOutlineUnorderedList
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.199)",
                          borderRadius: "4px",
                          padding: "10px",
                          marginRight: "5px",
                        }}
                      />
                    </div>
                    <textarea
                      {...register("depart_description")}
                      id="depart_description"
                      name="depart_description"
                      placeholder="Write Your Deaprtment Description"
                      rows="5"
                      cols="50"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  className="admin_buttons_add_update_from_add_update_form"
                  value="Submit Your Form"
                  style={{
                    margin: "10px 25% 20px 25%",
                    width: "50%",
                  }}
                />
              </form>
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Departments;
