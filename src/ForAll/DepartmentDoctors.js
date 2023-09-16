import "./DepartmentDoctors.css";
import { useDispatch } from "react-redux";
import { props_from_depart_actions } from "../Store/Store";
import { useLocation, useNavigate } from "react-router-dom";
import InformationCardForEmployee from "/home/ajay/Desktop/FYP/allikhwa/src/ForAll/InformationCardForEmployee";
import { useEffect, useState } from "react";

function DepartmentDoctors() {
  const [run_useeffect, setrun_useeffect] = useState(false);
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
  // useEffect(() => {
  //   if (run_useeffect) {
  //     navigate(`doctor-hms/dr-departments`);
  //     setrun_useeffect(false);
  //   }
  // }, [run_useeffect]);
  return (
    <>
      {location.state != null ? (
        <InformationCardForEmployee {...departname} />
      ) : (
        (console.log(location.pathname), navigate(-2))
        // navigate(`/../general/`)
        // (console.log("navigate wacheledoo dep drs"), setrun_useeffect(true))
      )}
    </>
  );
}

export default DepartmentDoctors;
