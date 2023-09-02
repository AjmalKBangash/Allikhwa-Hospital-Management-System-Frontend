import "./DepartmentNurses.css";

import { useSelector, useDispatch } from "react-redux";
import { props_from_depart_actions } from "../Store/Store";
import { useLocation } from "react-router-dom";
import InformationCardForEmployee from "/home/ajay/Desktop/FYP/allikhwa/src/ForAll/InformationCardForEmployee";

function DepartmentNurses() {
  const location = useLocation();
  const dispatch = useDispatch();
  let departname = {};
  if (location.state) {
    departname = {
      employee_department: location.state[0],
      employee_category: "NURSE",
    };
  }
  dispatch(props_from_depart_actions(departname));
  return (
    <>
      <InformationCardForEmployee {...departname} />
    </>
  );
}
export default DepartmentNurses;
