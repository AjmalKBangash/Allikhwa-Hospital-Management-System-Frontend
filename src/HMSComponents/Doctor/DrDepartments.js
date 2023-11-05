import { matchPath } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { allikhwa_department_infomation_dynamic_name } from "../../Store/Store";

import React, { useEffect, useState } from "react";
import { NavLink, useParams, useLocation, Outlet } from "react-router-dom";
import BreadCrumbs from "../../ForAll/BreadCrumbs";
import axios from "axios";

function DrDepartments() {
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
        "http://localhost:8000/allikhwa-hms/doctors/cad5aad8-bf96-48ed-8c48-e1b190ac829a"
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
                      "http://localhost:3000/doctor-hms/dr-departments/" +
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

export default DrDepartments;
