import "./General.css";
import InformationCards from "../../../ForAll/InformationCards";
// import TotalDepartmentDoctors from "../../../ForAll/TotalDepartmentDoctors";

// icons

function General() {
  return (
    <>
      <InformationCards data={"general"} />
      {/* paragraph About This General Depart  */}
      <p className="parag_about_general_depart">
        <div className="note">Note!</div>
        General Department(Ward) is the department where all the general
        patients are treated where they do not need to see medical physician for
        their problems and diseases. Those patients are treated here which are
        having normal flaws and very common diseases. This department is for
        instant and easy approach patients were they don't need to go through
        the department list and find medical experts or physicians to their
        common problems.
      </p>
      {/* <TotalDepartmentDoctors /> */}
    </>
  );
}

export default General;
