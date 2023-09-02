import "./DepartmentBeds.css";
import InformationTableForBeds from "./InformationTableForBeds";
import FillFreeBeds from "./FillFreeBeds";

import { useSelector, useDispatch } from "react-redux";
import { props_from_depart_actions } from "../Store/Store";
import { useLocation } from "react-router-dom";

function DepartmentBeds() {
  const location = useLocation();
  const dispatch = useDispatch();
  // return <>{location.state && location.state}</>;
  let departname = {};
  if (location.state) {
    departname = {
      depart_name: location.state[0],
      // employee_category: "BEDS",
    };
  }
  dispatch(props_from_depart_actions(departname));
  return (
    <>
      <InformationTableForBeds {...departname} />
    </>
  );
}
export default DepartmentBeds;
