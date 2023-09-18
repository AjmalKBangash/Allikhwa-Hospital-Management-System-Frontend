import "./DepartmentDoctors.css";
import { useDispatch } from "react-redux";
import { props_from_depart_actions } from "../Store/Store";
import { useLocation, useNavigate } from "react-router-dom";
import InformationCardForEmployee from "/home/ajay/Desktop/FYP/allikhwa/src/ForAll/InformationCardForEmployee";
import { useEffect, useState } from "react";
import { dr_nurse_beds_refresh } from "../Store/Store";

function DepartmentDoctors() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // return <>{location.state && location.state}</>;
  let departname = {};
  if (location.state) {
    departname = {
      employee_department: location.state[0],
      employee_category: "DOCTOR",
    };
  }
  dispatch(props_from_depart_actions(departname));

  useEffect(() => {
    if (location.state === null) {
      // navigate(`doctor-hms/dr-departments`);
      navigate(-1);
    }
  }, []);
  return (
    <>
      {location.state != null ? (
        <InformationCardForEmployee {...departname} />
      ) : (
        ""
        // navigate(`/../general/`)
        // (console.log("navigate wacheledoo dep drs"), setrun_useeffect(true))
      )}
    </>
  );
}

export default DepartmentDoctors;
