import "/home/ajay/Desktop/FYP/allikhwa/src/HMSComponents/HMSapps/CardForAll.css";
import AddUpdateForm from "/home/ajay/Desktop/FYP/allikhwa/src/HMSComponents/HMSapps/AddUpdateForm";

import { Link, useLocation } from "react-router-dom";
// import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useSelector } from "react-redux";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";

import ScrollToTop from "/home/ajay/Desktop/FYP/allikhwa/src/Components/ScrollToTop.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const empty_data_for_adupdate_component = [
  {
    employee_name: "",
    employee_website: "",
    employee_photo: {},
    employee_description: "",
    employee_jobtitle: "",
    employee_category: "",
    employee_education: "",
    employee_experience: "",
    employee_department: "",
    employee_surgeries: "",
    employee_appointments: "",
    employee_awards: "",
    employee_address: "",
    employee_phone: "",
    employee_email: "",
    employee_facebook: "",
    employee_linkedin: "",
  },
];

function InformationCardForEmployee() {
  const props_from_depart_actions = useSelector(
    (state) => state.props_from_depart_actions
  );
  // console.log(props_from_depart_actions.employee_department);
  // console.log(props.data);
  const [fetched_employee_data_for_card, setfetched_employee_data_for_card] =
    useState();
  const showdetailsref = useRef();
  const [propfromshodetailsdoctorcard, setpropfromshodetailsdoctorcard] =
    useState();
  const [displayFormForAddUpdate, setDisplayFormForAddUpdate] = useState(false);
  const [displayFormForUpdate, setDisplayFormForUpdate] = useState(false);

  const [admin_add_button_display, set_admin_add_button_display] =
    useState(true);

  function showdoctordetailsFun(doctorpropfromcard) {
    setpropfromshodetailsdoctorcard(doctorpropfromcard);
    setDisplayFormForAddUpdate(false);
    showdetailsref.current.style.display = "flex";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // let data_editing = {
  //   data: propfromshodetailsdoctorcard,
  //   data__employee_category: props_from_depart_actions.employee_category,
  // };
  // let data_adding = {
  //   data: empty_data_for_adupdate_component[0],
  //   data__employee_category: props_from_depart_actions.employee_category,
  // };

  useEffect(() => {
    // if (props_from_depart_actions) {
    axios
      .get(
        "http://localhost:8000/allikhwa-hms/" +
          props_from_depart_actions.employee_category.toLowerCase() +
          "s/"
        // * fetcing only doctors which are in the department of general is willl be fetching after django backend ceated
        // "?" +
        // "employee_department" ==
        // props_from_depart_actions.employee_department
      )
      .then((res) => {
        setfetched_employee_data_for_card(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // } else {
    // Navigate(`/doctor`)
    // }
  }, []);
  return (
    <>
      <ScrollToTop />
      {/* 
      <div className="admin_buttons_add_update">
        {admin_add_button_display && (
          <button
            onClick={() => setDisplayFormForAddUpdate(true)}
            className="admin_buttons_add_update_from_add_update_form"
          >
            ADD {props_from_depart_actions.employee_category}
          </button>
        )}
        {displayFormForAddUpdate && (
          <button
            onClick={() => {
              setDisplayFormForAddUpdate(false);
              set_admin_add_button_display(true);
            }}
          >
            CANCEL ADDING
          </button>
        )}
        {displayFormForUpdate && (
          <button
            onClick={() => {
              setDisplayFormForAddUpdate(false);
              set_admin_add_button_display(true);
              setDisplayFormForUpdate(false);
            }}
          >
            CANCEL EDITING
          </button>
        )}
        {propfromshodetailsdoctorcard && (
          <>
            <button
              onClick={() => {
                set_admin_add_button_display(false);
                setDisplayFormForUpdate(true);
                setDisplayFormForAddUpdate(false);
              }}
            >
              EDIT {props_from_depart_actions.employee_category}
            </button>
            <button>
              DELETE {props_from_depart_actions.employee_category}
            </button>
          </>
        )}
      </div>
      {displayFormForUpdate && (
        // <AddUpdateForm data={propfromshodetailsdoctorcard} /> with single prop only editing info
        <AddUpdateForm {...data_editing} />
      )}
      {displayFormForAddUpdate && (
        // <AddUpdateForm data={empty_data_for_adupdate_component[0]} /> for sendinh only one prop with empty values to display in form foe adding employee
        <AddUpdateForm {...data_adding} />
      )} */}
      <div className="doctortop">
        <div className="doctordetails" ref={showdetailsref}>
          {/* first we will display card on right side for the dr details which users clixked on  */}
          {propfromshodetailsdoctorcard && (
            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
              <div className="doctorcard">
                <img
                  className="doctorimgincard"
                  src={propfromshodetailsdoctorcard.employee_photo}
                />
                <div className="doctorcoverofimgtagsindoctorcard">
                  <h3 className="doctornameincard">
                    {propfromshodetailsdoctorcard.employee_name}
                  </h3>
                  <h6 className="jobtitleincard">
                    {" "}
                    {propfromshodetailsdoctorcard.employee_jobtitle}
                  </h6>
                  <h6 className="jobtitleincard">
                    {" "}
                    {propfromshodetailsdoctorcard.employee_category}
                  </h6>
                  <br />
                  <h5 className="byprofessionincard">
                    {propfromshodetailsdoctorcard.employee_departments}
                  </h5>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Link className="linkk">
                      <BiLogoFacebookCircle
                        style={{ color: "#3b5998" }}
                        className="fblogosincard"
                      />
                    </Link>
                    <Link className="linkk">
                      <AiFillTwitterCircle
                        style={{ color: "#00acee" }}
                        className="fblogosincard"
                      />
                    </Link>
                    <Link className="linkk">
                      <AiFillGooglePlusCircle
                        style={{ color: "#f7b529" }}
                        className="fblogosincard"
                      />
                    </Link>
                    <span
                      className="viewdetailsincard"
                      onClick={() => {
                        showdoctordetailsFun(propfromshodetailsdoctorcard);
                      }}
                    >
                      <Link className="linkk" style={{ color: "#fe4200" }}>
                        View Details
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              {/* )} */}
              <div
                className="col2indocdetails"
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
                  webkitboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
                  mozboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
                }}
              >
                <h2 className="fillfreebeds_h2">DETAILS</h2>
                <h2
                  className="fillfreebeds_h2"
                  style={{
                    position: "absolute",
                    right: "2%",
                    top: "0%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    showdetailsref.current.style.display = "none";
                    setpropfromshodetailsdoctorcard("");
                  }}
                >
                  &#10060;{" "}
                </h2>
                <table className="employee_GeneratedTable">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td> {propfromshodetailsdoctorcard.employee_name}</td>
                    </tr>
                    <tr>
                      <td>Job Title</td>
                      <td>{propfromshodetailsdoctorcard.employee_jobtitle}</td>
                    </tr>
                    <tr>
                      <td>Education</td>
                      <td>{propfromshodetailsdoctorcard.employee_education}</td>
                    </tr>
                    <tr>
                      <td>Experience</td>
                      <td>
                        {propfromshodetailsdoctorcard.employee_experience}
                      </td>
                    </tr>
                    <tr>
                      <td>Departments</td>
                      <td>
                        {" "}
                        {propfromshodetailsdoctorcard.employee_departments}
                      </td>
                    </tr>
                    <tr>
                      <td>Award and Reconitions</td>
                      <td>{propfromshodetailsdoctorcard.employee_awards}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{propfromshodetailsdoctorcard.employee_address}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{propfromshodetailsdoctorcard.employee_phone}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{propfromshodetailsdoctorcard.employee_email}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>{propfromshodetailsdoctorcard.employee_website}</td>
                    </tr>
                    <tr>
                      <td>Facebook</td>
                      <td>{propfromshodetailsdoctorcard.employee_facebook}</td>
                    </tr>
                    <tr>
                      <td>Linkedin</td>
                      <td>{propfromshodetailsdoctorcard.employee_linkedin}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="doctorslider">
          {fetched_employee_data_for_card &&
            fetched_employee_data_for_card.map((employee, id) => {
              return (
                <div className="doctorcard" key={id}>
                  <img
                    className="doctorimgincard"
                    src={employee.employee_photo}
                  />
                  <div className="doctorcoverofimgtagsindoctorcard">
                    <h3 className="doctornameincard">
                      {employee.employee_name}
                    </h3>
                    <h6 className="jobtitleincard">
                      {employee.employee_jobtitle}
                    </h6>
                    <h6 className="jobtitleincard">
                      {employee.employee_category}
                    </h6>
                    <br />
                    <h5 className="byprofessionincard">
                      {employee.employee_departments}
                    </h5>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Link className="linkk">
                        <BiLogoFacebookCircle
                          style={{ color: "#3b5998" }}
                          className="fblogosincard"
                        />
                      </Link>
                      <Link className="linkk">
                        <AiFillTwitterCircle
                          style={{ color: "#00acee" }}
                          className="fblogosincard"
                        />
                      </Link>
                      <Link className="linkk">
                        <AiFillGooglePlusCircle
                          style={{ color: "#f7b529" }}
                          className="fblogosincard"
                        />
                      </Link>
                      <span
                        className="viewdetailsincard"
                        onClick={() => {
                          showdoctordetailsFun(employee);
                        }}
                      >
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default InformationCardForEmployee;
