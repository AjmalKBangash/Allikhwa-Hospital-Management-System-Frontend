import DrInformationCards from "./DrInformationCards";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allikhwa_department_infomation_dynamic_name } from "../../Store/Store";

function DrDepartmentHMS() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      allikhwa_department_infomation_dynamic_name(department_name.toUpperCase())
    );
  }
  useEffect(() => {
    if (location.state === null) {
      navigate(`/doctor-hms/dr-departments`);
    }
  }, [location.state]);

  return (
    <>
      {location.state != null ? (
        <DrInformationCards data={department_name} />
      ) : (
        ""
      )}
      <p className="parag_about_departments">
        <div className="note">Note!</div>
        {department_description}
      </p>
    </>
  );
}

export default DrDepartmentHMS;
