import DrInformationCards from "./DrInformationCards";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { allikhwa_department_infomation_dynamic_name } from "../../Store/Store";

function DrDepartmentHMS() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(location);
  if (location.state === null) {
    console.log("salam");
    navigate(`/doctor-hms/dr-departments`);
  }

  useEffect(() => {
    if (location.state === null) {
      // Navigate back to the previous page
      navigate(`/doctor-hms/dr-departments`);
    }
  }, [location.state]);
  let department_name = "";
  let department_description = "";
  if (location.state != null) {
    department_name = Replacing(location.state[0]).toLowerCase();
    department_description = location.state[1];
  }
  function Replacing(text) {
    const replaced = [];
    for (let i = 0; i < text.length; i++) {
      const path = text[i].replace(" ", "-");
      replaced.push(path);
    }
    return replaced.join("");
  }

  if (location.state != null) {
    dispatch(
      allikhwa_department_infomation_dynamic_name(
        // location?.state[0]?.toUpperCase()
        department_name.toUpperCase()
      )
    );
  }

  return (
    <>
      {location.state != null ? (
        <DrInformationCards data={department_name} />
      ) : (
        navigate(`/doctor-hms/dr-departments`)
      )}
      <p className="parag_about_departments">
        <div className="note">Note!</div>
        {department_description}
      </p>
    </>
  );
}

export default DrDepartmentHMS;
