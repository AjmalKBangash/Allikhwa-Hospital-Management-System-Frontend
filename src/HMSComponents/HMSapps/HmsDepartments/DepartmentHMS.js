import "./DepartmentHMS.css";
import InformationCards from "../../../ForAll/InformationCards";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allikhwa_department_infomation_dynamic_name } from "../../../Store/Store";

function DepartmentHMS() {
  const location = useLocation();
  const dispatch = useDispatch();

  let department_name = "";
  let department_description = "";
  if (location.state[0]) {
    department_name = Replacing(location.state[0]).toLowerCase();
    department_description = location.state[1];
  }
  function Replacing(text) {
    const replaced = [];
    for (let i = 0; i < text.length; i++) {
      const path = text[i].replace(" ", "");
      replaced.push(path);
    }
    return replaced.join("");
  }

  dispatch(
    allikhwa_department_infomation_dynamic_name(
      location.state[0]?.toUpperCase()
    )
  );

  return (
    <>
      {location.state[0] && <InformationCards data={department_name} />}
      <p className="parag_about_departments">
        <div className="note">Note!</div>
        {department_description}
      </p>
    </>
  );
}

export default DepartmentHMS;
