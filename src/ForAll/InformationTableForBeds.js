import { useEffect, useRef, useState } from "react";
import "./InformationTableForBeds.css";
import FillFreeBeds from "./FillFreeBeds";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";

function InformationTableForBeds(props) {
  const [fetched_beds_data, setfetched_beds_data] = useState();
  const [addUpdate_Form_Data, set_AddUpdate_Form_Data] = useState();
  const [show_editing_beds_form, setshow_editing_beds_form] = useState(false);
  const table_details_beds = useRef(null);

  const psswd = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/;
  const exclude_spaces_regex = /^[\d\w]*$/;
  const adduppdateschema = Yup.object().shape({
    // Sign Up Form Validation
    depart_name: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Name is Required!"),
    total_beds: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Job title is Required"),
    free_beds: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Job category is Required"),
    beds_in_use: Yup.string()
      .max(200, "Must be 200 characters or less")
      .required("Experience is Required"),
    broken_beds: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Department is Required"),
    beds_description: Yup.string()
      .required("Description is Required")
      .min(200, "Minimum characters should be 200")
      .max(800, "Characters should not be more than 800"),
    //   .matches("", "should not be spaces"), here i should write regex which will exclude more than two whitespaces
  });

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(adduppdateschema),
  });

  const handle_addupdateformsubmit = (data) => {
    alert(JSON.stringify(data));
    set_AddUpdate_Form_Data(data);
    console.log(data);
    reset();
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:3100/totalbeds?depart_name=" +
          // * fetcing only beds which are in the department of general is willl be fetching after django backend ceated
          //   "?" +
          //   "depart_name" ==
          props.depart_name
      )
      .then((res) => {
        setfetched_beds_data(...res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // aDDUPDATEFORM
  useEffect(() => {
    {
      addUpdate_Form_Data &&
        axios
          .put(
            `http://localhost:3100/totalbeds?depart_name` + props.depart_name, //currently it is not working in json server i will fix it after the creation of backend django
            {
              ...addUpdate_Form_Data,
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [addUpdate_Form_Data]);
  let informationtablefrbedsprops_departname_totalbeds = {};
  // let depart_name = "";
  // let total_beds = "";
  if (fetched_beds_data) {
    informationtablefrbedsprops_departname_totalbeds = {
      depart_name: props.depart_name,
      total_beds: fetched_beds_data.total_beds,
    };
  }

  return (
    <>
      {/* form data for beds editing  */}
      {fetched_beds_data && show_editing_beds_form && (
        <div
          ref={table_details_beds} // this ref is for ecrolling to this div element from edit details
          className="profile_information_all"
          style={{
            borderRadius: "8px",
            boxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
            webkitboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
            mozboxShadow: "0px 2px 5px 0px rgba(1, 55, 55, 0.7)",
          }}
        >
          <h2
            style={{
              fontSize: "15px",
              margin: "20px auto",
              padding: "10px",
              borderRadius: "4px",
              boxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
              webkitboxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
              mozboxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
            }}
          >
            {props.depart_name && props.depart_name.toUpperCase()} DEPARTMENT
            BEDS
          </h2>
          <h2
            style={{
              fontSize: "15px",
              // margin: "10px 0 10px auto",
              right: "2%",
              top: "2%",
              position: "absolute",
              padding: "10px",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
              webkitboxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
              mozboxShadow: "0px 1px 4px 0px rgba(1, 55, 55, 0.7)",
            }}
            onClick={() => {
              // window.scrollTo({
              //   top: 0,
              //   behavior: "smooth",
              // });
              setshow_editing_beds_form(false);
            }}
          >
            &#10060;
          </h2>
          <form onSubmit={handleSubmit(handle_addupdateformsubmit)}>
            {/* <h1>Personal Information</h1> */}
            <div className="profile_label_input ">
              <label
                htmlFor="employee_jobtitle"
                className="profile_lanel_input_label"
              >
                Name:
              </label>
              <input
                id="depart_name"
                type="text"
                {...register("depart_name")}
                defaultValue={fetched_beds_data.depart_name}
                placeholder="Enter Department Name"
              ></input>
              <p className="pForForm">{errors.depart_name?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="total_beds" className="profile_lanel_input_label">
                Total Beds:
              </label>
              <input
                id="total_beds"
                type="text"
                {...register("total_beds")}
                defaultValue={fetched_beds_data.total_beds}
                placeholder="Enter Number of Total Beds"
              ></input>
              <p className="pForForm">{errors.total_beds?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="free_beds" className="profile_lanel_input_label">
                Free Beds:
              </label>
              <input
                {...register("free_beds")}
                id="free_beds"
                type="text"
                defaultValue={fetched_beds_data.free_beds}
                placeholder="Enter Free Available Beds"
              ></input>
              <p className="pForForm">{errors.free_beds?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="beds_in_use"
                className="profile_lanel_input_label"
              >
                {" "}
                Busy Beds:
              </label>
              <input
                {...register("beds_in_use")}
                id="employee_experience"
                type="text"
                defaultValue={fetched_beds_data.beds_in_use}
                placeholder="Enter Beds In Use"
              ></input>
              <p className="pForForm">{errors.beds_in_use?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label
                htmlFor="broken_beds"
                className="profile_lanel_input_label"
              >
                {" "}
                Broken Beds:
              </label>
              <input
                {...register("broken_beds")}
                id="broken_beds"
                type="text"
                defaultValue={fetched_beds_data.broken_beds}
                placeholder="Enter Number of Broken Beds"
              ></input>
              <p className="pForForm">{errors.broken_beds?.message}</p>
            </div>
            <div className="profile_label_input ">
              <span>
                <p>
                  <label htmlFor="beds_description">Your Bio:</label>
                </p>
                <p>Write a Short Introduction:</p>
                <p className="pForForm">{errors.beds_description?.message}</p>
              </span>
              <div>
                <div
                  style={{
                    margin: "10px 0",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <select
                    // {...register("beds_description")}
                    defaultValue={"Normal text"}
                    style={{
                      fontSize: "15px",
                      backgroundColor: "white",
                      border: "1px solid rgba(0, 0, 0, 0.199)",
                      borderRadius: "4px",
                      padding: "10px",
                      marginRight: "5px",
                    }}
                  >
                    <option>Normal text</option>
                    <option>Bold text</option>
                    <option>Italix text</option>
                  </select>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "900",
                      border: "1px solid rgba(0, 0, 0, 0.199)",
                      borderRadius: "4px",
                      padding: "7px 10px ",
                      marginRight: "5px",
                    }}
                  >
                    B
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "900",
                      border: "1px solid rgba(0, 0, 0, 0.199)",
                      borderRadius: "4px",
                      padding: "7px 10px",
                      marginRight: "5px",
                      fontFamily: "serif",
                    }}
                  >
                    <i>I</i>
                  </span>

                  <AiOutlineOrderedList
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.199)",
                      borderRadius: "4px",
                      padding: "10px",
                      marginRight: "5px",
                    }}
                  />
                  <AiOutlineUnorderedList
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.199)",
                      borderRadius: "4px",
                      padding: "10px",
                      marginRight: "5px",
                    }}
                  />
                </div>
                <textarea
                  {...register("beds_description")}
                  id="beds_description"
                  name="beds_description"
                  placeholder="Your short introduction!"
                  rows="6"
                  cols="60"
                  defaultValue={fetched_beds_data.beds_description}
                />
              </div>
            </div>

            {/* done  */}
            <input
              type="submit"
              className="admin_buttons_add_update_from_add_update_form"
              value="Submit Your Form"
              style={{
                margin: "10px 25% 20px 25%",
                width: "50%",
              }}
            />
          </form>
        </div>
      )}
      <div className="Information_Table_for_beds">
        <button
          style={{ display: "block", margin: "10px auto 10px auto" }}
          className="admin_buttons_add_update_from_add_update_form"
          onClick={() => {
            setshow_editing_beds_form(true);
            table_details_beds.current?.scrollIntoView();
          }}
        >
          EDIT DETAILS
        </button>
        {fetched_beds_data ? (
          <table className="employee_GeneratedTable">
            <tbody>
              <tr>
                <td>Department Name</td>
                <td> {fetched_beds_data.depart_name}</td>
              </tr>
              <tr>
                <td>Total Beds</td>
                <td>{fetched_beds_data.total_beds}</td>
              </tr>
              <tr>
                <td>Free Beds</td>
                <td>{fetched_beds_data.free_beds}</td>
              </tr>
              <tr>
                <td>Busy Beds</td>
                <td>{fetched_beds_data.beds_in_use}</td>
              </tr>
              <tr>
                <td>Broken Beds</td>
                <td> {fetched_beds_data.broken_beds}</td>
              </tr>
              <tr>
                <td>Description About Beds</td>
                <td> {fetched_beds_data.beds_description}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          "Loading..."
        )}
      </div>
      {informationtablefrbedsprops_departname_totalbeds && (
        <FillFreeBeds {...informationtablefrbedsprops_departname_totalbeds} />
      )}
    </>
  );
}

export default InformationTableForBeds;
