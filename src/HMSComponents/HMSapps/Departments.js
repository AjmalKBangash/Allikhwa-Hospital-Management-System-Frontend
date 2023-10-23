import "./Departments.css";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { matchPath, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { allikhwa_department_infomation_dynamic_name } from "../../Store/Store";

import React, { useEffect, useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import BreadCrumbs from "../../ForAll/BreadCrumbs";
import axios from "axios";
import { useDispatch } from "react-redux";

function Departments() {
  const [departments, setdepartments] = useState();
  const [depart_name_for_bread, setDepart_name_for_bread] = useState();
  const [display_adding_depart, setDisplay_adding_depart] = useState(false);
  const [display_adding_depart_button, setDisplay_adding_depart_button] =
    useState(true);
  const [sending_added_depart_data, setSending_added_depart_data] =
    useState(false);
  const { departmentname } = useParams();

  const location = useLocation();
  const dispatch = useDispatch();
  const allikhwa_department_infomation_dynamic_name_var = useSelector(
    (state) => state.allikhwa_department_infomation_dynamic_name
  );

  const department_adding_validation_schema = Yup.object().shape({
    department_name: Yup.string()
      .max(20, "Must be less than 50 characters!")
      .required("Department Name is Required")
      .matches(
        /^[A-Za-z\s]+(?:,[a-zA-Z\s]+)*$/g,
        "Department name should not inculde any digits, numbers, special characters. Example (ENT A) or (Cardiology)  etc"
      ),
    department_description: Yup.string()
      .min(50, "Must be greater than 200 characters!")
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
    let {
      department_name: department_name,
      department_description: department_description,
    } = data;
    setSending_added_depart_data({
      department_name: department_name.toUpperCase(),
      department_description: department_description,
    });
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
    if (sending_added_depart_data) {
      axios
        .post(
          "http://localhost:8000/allikhwa-hms/departments/",
          sending_added_depart_data
        )
        .then((res) => {
          setSending_added_depart_data(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [sending_added_depart_data]);
  const path_in_departments = matchPath(
    "/all'ikhwa-management-system/departments/",
    location.pathname
  );
  const current_url = matchPath(
    "/all'ikhwa-management-system/departments/:departmentname/",
    location.pathname
  );
  const current_url02 = matchPath(
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

  useEffect(() => {
    axios
      .get("http://localhost:8000/allikhwa-hms/departments/")
      .then((res) => {
        setdepartments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="department_details_top_hmsapp">
        <BreadCrumbs data={location.pathname + "/" + depart_name_for_bread} />
        <div className="departdetails_container_hmsapps">
          {/* this is depart list column  */}
          <div
            className="departdetails_column01_in_hmsapp"
            style={{
              height: "82vh",
              backgroundColor: "#013737",
            }}
          >
            <ul>
              {departments &&
                departments.map((department, id) => {
                  return (
                    <NavLink
                      to={
                        "http://localhost:3000/all'ikhwa-management-system/departments/" +
                        Replacing(
                          department.department_name.toLowerCase().trim()
                        )
                      }
                      className={
                        departmentname ===
                        Replacing(
                          department.department_name.toLowerCase().trim()
                        )
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
                        setDisplay_adding_depart_button(false);
                      }}
                    >
                      <li key={id}>
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
            // className="departdetails_column02_in_hmsapps "
            className={
              current_url || current_url02
                ? "departdetails_column02_in_hmsapps"
                : "departdetails_column02_in_hmsapps departdetails_column02_in_hmsapps_from_department_adminhms"
            }
          >
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
                      id="department_name"
                      type="text"
                      {...register("department_name")}
                      placeholder="Enter Your Department Name"
                    ></input>
                    <p className="pForForm">
                      {errors.department_name?.message}
                    </p>
                  </div>
                  <div className="profile_label_input ">
                    <span>
                      <p>
                        <label htmlFor="department_description">
                          Department Bio:
                        </label>
                      </p>
                      <p>Write Your Department Description:</p>
                      <p className="pForForm">
                        {errors.department_description?.message}
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
                        {...register("department_description")}
                        id="department_description"
                        name="department_description"
                        placeholder="Write Your Deaprtment Description"
                        rows="5"
                        cols="50"
                        style={{
                          maxWidth: "73%",
                        }}
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
            {/* <div style={{ marginTop: "00px" }}> */}
            <Outlet />
            {/* </div> */}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default Departments;
