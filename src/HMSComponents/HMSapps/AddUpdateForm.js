import "./AddUpdateForm.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MultiSelect } from "react-multi-select-component";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import FailurePopUp from "/home/ajay/Desktop/FYP/allikhwa/src/ForAll/FailurePopUp.js";
import SuccessPopUp from "/home/ajay/Desktop/FYP/allikhwa/src/ForAll/SuccessPopUp.js";
import { successpopup, failurepopup, profile_updated } from "../../Store/Store";

// importing react-router-dom for routing
// importing icons from react-icons
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddUpdateForm(props) {
  const { data__employee_category, data, postpatch } = props;
  let departments_from_props_data02 = data.employee_departments?.replace(
    /,([^,]*)$/,
    "$1"
  );
  let departments_from_props_data = "";
  if (departments_from_props_data02) {
    departments_from_props_data = departments_from_props_data02
      .split(",")
      .map((department) => {
        return { label: department, value: department };
      });
  }
  const [addUpdate_Form_Data, set_AddUpdate_Form_Data] = useState(false);
  const [options_dropdown, setoptions_dropdown] = useState("");
  const [datastate, setdatastate] = useState({ employee_photo: "" });
  let [selected, setSelected] = useState([]);
  // const [re_run_get, setRe_run_get] = useState(false);
  const successpopup_var = useSelector((state) => state.successpopup);
  const failurepopup_var = useSelector((state) => state.failurepopup);
  const dispatch = useDispatch();

  const adduppdateschema = Yup.object().shape({
    // Sign Up Form Validation
    employee_name: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Name is Required!"),
    employee_jobtitle: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Job title is Required"),
    employee_experience: Yup.string()
      .max(200, "Must be 200 characters or less")
      .required("Experience is Required"),
    employee_departments: Yup.array()
      .min(1, "Pick at least 1 Department")
      .required("Department Selection is required"),
    // employee_photo: Yup.mixed()
    //   .test("fileRequired", "File is required", (value) => {
    //     return value && value.length > 0; // File must not be empty
    //   })
    //   .test("fileSize", "File size is too large", (value) => {
    //     if (value) {
    //       return value && value.length && value[0].size <= 1024 * 1024 * 3; // Max file size is 3MB
    //     } else {
    //       return "";
    //     }
    //   })
    //   .test("fileType", "Invalid file type", (value) => {
    //     return (
    //       value &&
    //       value.length &&
    //       ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
    //     ); // Supported file types
    //   }),
    employee_phone: Yup.string("Enter Phone Number in Digits")
      .required("Phone Number is required")
      .matches(/^\d{14}$/, "Enter 14 digit International Cell Phone Number")
      .typeError("Enter Phone Number in Digits"),
    user: Yup.string()
      .email("Invalid Email Address!")
      .required("Email is Required"),
    employee_bio: Yup.string()
      .required("Description is Required")
      .min(20, "Minimum characters should be 200")
      .max(800, "Characters should not be more than 800")
      .matches(
        /^(?!.*\s{2}).+$/g,
        "should not be more than one white space in paragraph"
      ), //here i should write regex which will exclude more than two whitespaces
  });

  const {
    control,
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
    const departments = [];
    let { employee_departments } = data;
    employee_departments.map((department) => {
      departments.push(department.value);
    });
    let departments02 = "";
    for (let i = 0; departments.length > i; i++) {
      departments02 = departments02 + departments[i].toUpperCase() + ",";
    }
    set_AddUpdate_Form_Data({
      employee_name: data.employee_name,
      employee_UID: data.employee_UID,
      employee_website: data.employee_website,
      employee_bio: data.employee_bio,
      employee_jobtitle: data.employee_jobtitle,
      employee_education: data.employee_education,
      employee_experience: data.employee_experience,
      employee_departments: departments02,
      employee_photo: data.employee_photo[0],
      employee_awards: data.employee_awards,
      employee_address: data.employee_address,
      employee_phone: data.employee_phone,
      employee_facebook: data.employee_facebook,
      employee_linkedin: data.employee_linkedin,
      user: data.user,
    });
  };
  useEffect(() => {
    let array_for_options_in_dropdown = [];
    axios
      .get("http://localhost:8000/allikhwa-hms/departments/")
      .then((res) => {
        // for (let i = 0; i < res.data.length; i++) {      // this is also correct but it takes much programmming
        //   array_for_options_in_dropdown.push({
        //     label: res.data[i].department_name,
        //     value: res.data[i].department_name,
        //   });
        // }
        // setoptions_dropdown(array_for_options_in_dropdown);
        setoptions_dropdown(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // CREATING THE DATA
  useEffect(() => {
    if (addUpdate_Form_Data && !postpatch) {
      axios
        .post(
          `http://localhost:8000/allikhwa-hms/` +
            data__employee_category.toLowerCase() +
            "s/",
          addUpdate_Form_Data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          set_AddUpdate_Form_Data(false);
          reset();
          dispatch(
            successpopup(
              `The ${data__employee_category} has been added successfully!`
            )
          );
          dispatch(profile_updated(true));
          // setRe_run_get(true);
        })
        .catch((error) => {
          dispatch(failurepopup(error.response.data.user));
        });
    }
  }, [addUpdate_Form_Data]);

  // UPDATING THE DATA
  useEffect(() => {
    if (addUpdate_Form_Data && postpatch) {
      axios
        .patch(
          `http://localhost:8000/allikhwa-hms/` +
            data__employee_category.toLowerCase() +
            "s/" +
            addUpdate_Form_Data.employee_UID,

          addUpdate_Form_Data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          set_AddUpdate_Form_Data(false);
          reset();
          console.log("Successful");
          dispatch(
            successpopup(
              `The ${data__employee_category} has been updated successfully!`
            )
          );
          dispatch(profile_updated(true));
          // setRe_run_get(true);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          dispatch(failurepopup(error.response.data.user));
        });
    }
  }, [addUpdate_Form_Data]);

  // useEffect(() => { This useeffect is for defaultvalues in multi selectedn option
  //   let array_dropdown_departments = [];
  //   if (data.employee_department) {
  //     data.employee_department.map(({ label, value }) => {
  //       array_dropdown_departments.push({
  //         label: label,
  //         value: value,
  //       });
  //       console.log(value, label);
  //     });
  //   }
  //   setselected_options_dropdown(array_dropdown_departments);
  // }, [data.employee_department]);
  useEffect(() => {
    setdatastate(data.employee_photo);
  }, []);
  return (
    <>
      {/* {successpopup_var && <SuccessPopUp message={successpopup_var} />}
      {failurepopup_var && <FailurePopUp message={failurepopup_var} />} */}
      <div
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
          {data__employee_category}
        </h2>
        <form onSubmit={handleSubmit(handle_addupdateformsubmit)}>
          {data.employee_UID ? (
            <div className="profile_label_input">
              <label htmlFor="employee_UID">
                Employee ID:
                <span style={{ color: "red", margin: "4px" }}>*</span>
              </label>
              <input
                {...register("employee_UID")}
                id="employee_UID"
                type="text"
                value={data.employee_UID}
                placeholder="Enter Employee ID"
              ></input>
            </div>
          ) : (
            <div className="profile_label_input">
              <label htmlFor="employee_UID">
                Empoyee ID:
                <span style={{ color: "red", margin: "4px" }}>*</span>
              </label>
              <input
                {...register("employee_UID")}
                id="employee_UID"
                type="text"
                value={uuidv4()}
                placeholder="Enter Employee ID"
              ></input>
            </div>
          )}

          <div className="profile_label_input">
            {" "}
            {/*  This field belongs to CustomUser not its associated foreign keys */}
            <label htmlFor="employee_name">
              {" "}
              Name:<span style={{ color: "red", margin: "4px" }}>*</span>
            </label>
            <input
              {...register("employee_name")}
              id="employee_name"
              type="text"
              defaultValue={data.employee_name}
              placeholder="Enter Your Name"
            ></input>
            <p className="pForForm">{errors.employee_name?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_website"
              className="profile_lanel_input_label"
            >
              Website:
            </label>
            <input
              id="employee_website"
              type="text"
              {...register("employee_website")}
              defaultValue={data.employee_website}
              placeholder="Enter Your Website"
            ></input>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_photo"
              className="profile_lanel_input_label"
            >
              Employee Photo:
              <span style={{ color: "red", margin: "4px" }}>*</span>
            </label>
            <input
              name="employee_photo"
              {...register("employee_photo")}
              type="file"
            />
            {errors.employee_photo && (
              <p className="pForForm">{errors.employee_photo.message}</p>
            )}
            {/* Photo: */}
            {/* <input
            id="employee_photo"
            type="file"
            {...register("employee_photo")}
            // defaultValue={data.employee_photo && data.employee_photo}
            placeholder="Upload Your Photo"
          ></input> */}
          </div>
          {data.employee_photo && (
            <div className="profile_label_input ">
              <span>Image Preview</span>
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  border: "2px solid #fe4200",
                }}
                src={data.employee_photo && data.employee_photo}
                alt="Preview"
              />
            </div>
          )}
          <div className="profile_label_input ">
            <span>
              <p>
                <label htmlFor="employee_bio">
                  Employee Bio:
                  <span style={{ color: "red", margin: "4px" }}>*</span>
                </label>
              </p>
              <p>Write a Short Introduction:</p>
              <p className="pForForm">{errors.employee_bio?.message}</p>
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
                  {...register("employee_website")}
                  defaultValue={"Normal text"}
                  style={{
                    fontSize: "15px",
                    backgroundColor: "white",
                    border: "1px solid rgba(0, 0, 0, 0.199)",
                    borderRadius: "4px",
                    padding: "10px",
                    marginRight: "5px",
                    outline: "none",
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
                {...register("employee_bio")}
                id="employee_bio"
                name="employee_bio"
                placeholder="Your short introduction!"
                rows="6"
                cols="60"
                defaultValue={data.employee_bio}
                style={{ width: "74%", padding: "5px", outline: "none" }}
              />
            </div>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_jobtitle"
              className="profile_lanel_input_label"
            >
              Job Title:<span style={{ color: "red", margin: "4px" }}>*</span>
            </label>
            <input
              id="employee_jobtitle"
              type="text"
              {...register("employee_jobtitle")}
              defaultValue={data.employee_jobtitle}
              placeholder="Enter Your Job Title"
            ></input>
            <p className="pForForm">{errors.employee_jobtitle?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_education"
              className="profile_lanel_input_label"
            >
              Education:
            </label>
            <input
              {...register("employee_education")}
              id="employee_education"
              type="text"
              defaultValue={data.employee_education}
              placeholder="Enter Youe Education Details"
            ></input>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_experience"
              className="profile_lanel_input_label"
            >
              {" "}
              Experience:<span style={{ color: "red", margin: "4px" }}>*</span>
            </label>
            <input
              {...register("employee_experience")}
              id="employee_experience"
              type="text"
              defaultValue={data.employee_experience}
              placeholder="Enter Your Experience"
            ></input>
            <p className="pForForm">{errors.employee_experience?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_departments"
              className="profile_lanel_input_label"
            >
              Select Departments:
            </label>
            <Controller
              name="employee_departments"
              control={control}
              // defaultValue={[
              //   {
              //     // label: data.employee_departments.toUpperCase(),
              //     // value: data.employee_departments.toUpperCase(),
              //   },
              // ]}
              // defaultValue={[{ label: "ENT,PAEDS", value: "ENT,PAEDS" }]}
              defaultValue={
                departments_from_props_data ? departments_from_props_data : []
              }
              render={({ field }) => (
                <MultiSelect
                  {...field}
                  hasSelectAll={false}
                  options={
                    options_dropdown &&
                    options_dropdown.map((option) => ({
                      label: option.department_name,
                      value: option.department_name,
                    }))
                  }
                  // value={field.value}
                  // onChange={(selected) => { This is for default values not having that much experties in js now i am having later future task this is
                  //   field.onChange(selected);
                  //   setValue("employee_departments", selected);
                  // }}
                  className="custom-multi-select"
                />
              )}
            />
            <p className="pForForm">{errors.employee_departments?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_surgeries"
              className="profile_lanel_input_label"
            >
              {" "}
              Suregries Performed:
            </label>
            <input
              {...register("employee_surgeries")}
              id="employee_surgeries"
              type="text"
              defaultValue={data.employee_surgeries}
              placeholder="Enter The Number Of Surgeries You Performed"
            ></input>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_appointments"
              className="profile_lanel_input_label"
            >
              Appointments Per Month:
            </label>
            <input
              {...register("employee_appointments")}
              id="employee_appointments"
              type="text"
              defaultValue={data.employee_appointments}
              placeholder="Enter Your Appointments Per Month"
            ></input>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_awards"
              className="profile_lanel_input_label"
            >
              Awards and Recognitions:
            </label>
            <input
              {...register("employee_awards")}
              id="employee_awards"
              type="text"
              defaultValue={data.employee_awards}
              placeholder="Enter Your Awards"
            ></input>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_address"
              className="profile_lanel_input_label"
            >
              Address:
            </label>

            <input
              {...register("employee_address")}
              id="employee_address"
              type="text"
              defaultValue={data.employee_address}
              placeholder="Enter Your Address"
            ></input>
            <p className="pForForm">{errors.employee_address?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_phone"
              className="profile_lanel_input_label"
            >
              Phone:<span style={{ color: "red", margin: "4px" }}>*</span>
            </label>
            <input
              {...register("employee_phone")}
              id="employee_phone"
              type="text"
              defaultValue={data.employee_phone}
              placeholder="Enter Your Phone"
            ></input>
            <p className="pForForm">{errors.employee_phone?.message}</p>
          </div>
          {data.user ? (
            <div className="profile_label_input ">
              <label htmlFor="user" className="profile_lanel_input_label">
                Registered Email:
                <span style={{ color: "red", margin: "4px" }}>*</span>
              </label>
              <input
                {...register("user")}
                id="user"
                type="text"
                value={data.user}
                placeholder="Enter Your Email"
              ></input>
              <p className="pForForm">{errors.user?.message}</p>
            </div>
          ) : (
            <div className="profile_label_input ">
              <label htmlFor="user" className="profile_lanel_input_label">
                Registered Email:
                <span style={{ color: "red", margin: "4px" }}>*</span>
              </label>
              <input
                name="user"
                {...register("user")}
                id="user"
                type="text"
                // defaultValue={data.user}
                placeholder="Enter Your Email"
              ></input>
              <p className="pForForm">{errors.user?.message}</p>
            </div>
          )}

          <div className="profile_label_input ">
            <label
              htmlFor="employee_facebook"
              className="profile_lanel_input_label"
            >
              Facebook:
            </label>
            <input
              {...register("employee_facebook")}
              id="employee_facebook"
              type="text"
              defaultValue={data.employee_facebook}
              placeholder="Enter Your Facebook ID"
            ></input>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_linkedin"
              className="profile_lanel_input_label"
            >
              LinkedIn:
            </label>
            <input
              {...register("employee_linkedin")}
              id="employee_linkedin"
              type="text"
              defaultValue={data.employee_linkedin}
              placeholder="Enter Your LinkedIn ID"
            ></input>
          </div>
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
    </>
  );
}
export default AddUpdateForm;
