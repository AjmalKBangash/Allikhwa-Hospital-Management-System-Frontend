import "./CardForAll.css";
import AddUpdateForm from "./AddUpdateForm";

import { Link } from "react-router-dom";
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
    employee_department: [],
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

function CardForAll(props) {
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
  let data_editing = {
    data: propfromshodetailsdoctorcard,
    data__employee_category: props.data,
  };
  let data_adding = {
    data: empty_data_for_adupdate_component[0],
    data__employee_category: props.data,
  };

  useEffect(() => {
    axios
      .get("http://localhost:3100/" + props.data.toLowerCase() + "s")
      .then((res) => {
        setfetched_employee_data_for_card(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="admin_buttons_add_update">
        {admin_add_button_display && (
          <button
            onClick={() => setDisplayFormForAddUpdate(true)}
            className="admin_buttons_add_update_from_add_update_form"
          >
            ADD {props.data}
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
              EDIT {props.data}
            </button>
            <button>DELETE {props.data}</button>
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
      )}
      <div className="doctortop">
        <div className="doctordetails" ref={showdetailsref}>
          {/* first we will display card on right side for the dr details which users clixked on  */}
          {propfromshodetailsdoctorcard && (
            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
              <div className="doctorcard">
                <img
                  className="doctorimgincard"
                  src={
                    "https://media.istockphoto.com/id/1390000431/photo/shot-of-a-mature-doctor-using-a-digital-tablet-in-a-modern-hospital.webp?b=1&s=170667a&w=0&k=20&c=Jxhk_KZSo9oSZ01Nv8TxjCKKEVZQJFVWICZb64AEIMQ="
                  }
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
                    {" "}
                    {propfromshodetailsdoctorcard.employee_department.map(
                      ({ label, value }) => {
                        return (
                          <li key={value}>
                            {value}
                            {propfromshodetailsdoctorcard.employee_department
                              ?.length > 1 && <p>...</p>}
                          </li>
                        );
                      }
                    )}
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
              <div className="col2indocdetails">
                <table className="employee_GeneratedTable">
                  <tbody>
                    <tr>
                      <td style={{ border: "none" }}>
                        {" "}
                        <h2
                          className="fillfreebeds_h2"
                          style={{
                            margin: "5px auto 5px 0px",
                            color: "red",
                          }}
                        >
                          DETAILS{" "}
                        </h2>
                      </td>
                      <td style={{ border: "none" }}>
                        {" "}
                        {/* <button
                          // ref={toggle_display_canceldetails_button}
                          className="admin_buttons_add_update_from_add_update_form"
                          style={{ backgroundColor: "red" }}
                        >
                          CLOSE DETAILS
                        </button> */}
                        <h2
                          className="fillfreebeds_h2"
                          onClick={() => {
                            showdetailsref.current.style.display = "none";
                            setpropfromshodetailsdoctorcard("");
                          }}
                          style={{
                            margin: "5px 0px 5px auto",
                            cursor: "pointer",
                          }}
                        >
                          &#10060;
                        </h2>
                      </td>
                    </tr>
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
                        {propfromshodetailsdoctorcard.employee_department?.map(
                          ({ label, value }) => {
                            return <li key={value}>{value}</li>;
                          }
                        )}
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
                    src={
                      "https://southfloridahospitalnews.com/wp-content/uploads/2023/02/Dawkins-Bryan.jpg"
                    }
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
                      <ul>
                        {employee.employee_department?.map(
                          ({ label, value }) => {
                            return (
                              <li key={value}>
                                {value}
                                {employee.employee_department?.length > 1 && (
                                  <p>...</p>
                                )}
                              </li>
                            );
                          }
                        )}
                      </ul>
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

export default CardForAll;
