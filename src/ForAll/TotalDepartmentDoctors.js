import "./TotalDepartmentDoctors.css";
import { useLocation } from "react-router-dom";
import InformationCardForEmployee from "/home/ajay/Desktop/FYP/allikhwa/src/ForAll/InformationCardForEmployee";

function TotalDepartmentDoctors() {
  const location = useLocation();
  // return <>{location.state && location.state}</>;

  return (
    <>
      {location.state}
      {/* <InformationCardForEmployee /> */}
    </>
  );
}

export default TotalDepartmentDoctors;
