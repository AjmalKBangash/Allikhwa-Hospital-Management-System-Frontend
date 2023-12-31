import "./Profile.css";

// importing icons from react icons
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

// importing icons from react-icons
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import DrProfile from "../Doctor/DrProfile";

function Profile(props) {
  console.log(props);
  // str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  // this upper regex is for converting paargraphs into sentences and then we have to store it in list and we have to convert it into ul li childs through map function
  let [addUpdate_Form_Data, set_AddUpdate_Form_Data] = useState(false);
  const employee_employeea_var = useSelector(
    (state) => state.employee_employee
  );
  const navigate = useNavigate();

  const psswd = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/;
  const exclude_spaces_regex = /^[\d\w]*$/;

  const adduppdateschema = Yup.object().shape({
    // Sign Up Form Validation
    employee_name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Name is Required!"),
    employee_jobtitle: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Job title is Required"),
    // employee_category: Yup.string()
    //   .max(50, "Must be 50 characters or less")
    //   .required("Job category is Required"),
    employee_experience: Yup.string()
      .max(200, "Must be 200 characters or less")
      .required("Experience is Required"),
    employee_education: Yup.string()
      // .max(200, "Must be 200 characters or less")
      .required("Education is Required"),
    employee_awards: Yup.string()
      .max(200, "Must be 200 characters or less")
      .required("Awards or Recognition is Required"),
    employee_website: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Website is Required"),
    employee_facebook: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Facebook is Required"),
    employee_linkedin: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("LinkedIn is Required"),
    // employee_departments: Yup.string()
    //   .max(20, "Must be 20 characters or less")
    //   .required("Department is Required"),
    // user: Yup.string()
    // .email("Invalid Email Address!")
    //   .required("Description is Required")
    //   .min(200, "Minimum characters should be 200")
    //   .max(800, "Characters should not be more than 800"),
    // .required("Email is Required"),
    // employee_description: Yup.string()
    //   .required("Description is Required")
    //   .min(200, "Minimum characters should be 200")
    //   .max(800, "Characters should not be more than 800"),
    //   .matches("", "should not be spaces"), here i should write regex which will exclude more than two whitespaces
    employee_phone: Yup.number()
      .required("Phone num is required")
      .typeError("Phone num is required"),
  });

  const {
    setValue,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(adduppdateschema),
  });

  const handle_addupdateformsubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
    set_AddUpdate_Form_Data({
      employee_name: data.employee_name,
      employee_UID: data.employee_UID,
      employee_website: data.employee_website,
      employee_bio: data.employee_bio,
      employee_jobtitle: data.employee_jobtitle,
      employee_education: data.employee_education,
      employee_experience: data.employee_experience,
      employee_photo: data.employee_photo[0],
      employee_awards: data.employee_awards,
      employee_address: data.employee_address,
      employee_phone: data.employee_phone,
      employee_facebook: data.employee_facebook,
      employee_linkedin: data.employee_linkedin,
    });
    // reset();
  };
  useEffect(() => {
    if (props.data) {
      setValue("employee_name", props.data.employee_name);
      setValue("employee_jobtitle", props.data.employee_jobtitle);

      // setValue("employee_category", props.data.employee_category);

      setValue("employee_experience", props.data.employee_experience);

      // setValue("employee_department", props.data.employee_department); This should not be editable or updatable because through this later we are going to assign departments to the current employee in which he is working

      // setValue("employee_email", props.data.user);

      setValue("employee_bio", props.data.employee_bio);

      setValue("employee_website", props.data.employee_website);

      // setValue("employee_photo", props.data.employee_photo);

      setValue("employee_education", props.data.employee_education);

      // setValue("employee_surgeries", props.data.employee_surgeries);

      // setValue("employee_appointments", props.data.employee_appointments);

      setValue("employee_awards", props.data.employee_awards);

      setValue("employee_address", props.data.employee_address);

      setValue("employee_phone", props.data.employee_phone);

      setValue("employee_facebook", props.data.employee_facebook);

      setValue("employee_linkedin", props.data.employee_linkedin);
      // setValue("employee_UID", props.data.employee_UID);  //it should not be editable
    }
  }, [props.data]);
  useEffect(() => {
    // this will be un-commentedd when bckend created
    // this axios willl be update (patch) http request because the employee will be added in according sessions in admin
    if (addUpdate_Form_Data) {
      axios
        .patch(
          `allikhwa-hms/${employee_employeea_var}/${props.data.user}`,
          addUpdate_Form_Data
        )
        .then((response) => {
          console.log(response);
          set_AddUpdate_Form_Data(false);
          navigate("../", { relative: "path" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [addUpdate_Form_Data]);
  // useEffect(() => {
  //   if (!props.data.employee_UID) {
  //     navigate("doctor-hms/dr-profile");
  //   }
  // else {
  // navigate("dr-dashboard", { relative: "path" });
  // navigate("doctor-hms/dr-profile");
  // return <DrProfile />;
  // }
  // }, []);
  return (
    <div className="profile_top">
      <div className="profile_profile_pic_card">
        <img
          src={
            props.data.employee_photo
              ? props.data.employee_photo
              : "https://pakobserver.net/wp-content/uploads/2021/09/4-75.jpg"
          }
          alt="Doctor"
        />
        <div className="profile_name_speciality_jobtitile">
          <h4>Profile</h4>
          <span style={{ fontSize: "15px" }}>
            Update Your Profile and Personal Details
          </span>
          {/* <span>Update Your Profile and Personal Details</span> */}
        </div>
        <div className="profile_buttons_update">
          <button>Cancel</button>
          <button>Update</button>
        </div>
      </div>

      <div className="profile_information_all">
        <form onSubmit={handleSubmit(handle_addupdateformsubmit)}>
          <div className="profile_label_input">
            <label htmlFor="employee_name"> Name:</label>

            <input
              {...register("employee_name")}
              id="employee_name"
              type="text"
              placeholder="Enter Your Name"
            ></input>
            <p className="pForForm">{errors.employee_name?.message}</p>
          </div>
          <div className="profile_label_input">
            <label>Your Hospital ID</label>
            <input
              type="text"
              id="employee_UID"
              name="employee_UID"
              value={props.data?.employee_UID}
              {...register("employee_UID")}
            ></input>
            <p className="pForForm">{errors.employee_UID?.message}</p>
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
              placeholder="Enter Your Website"
            ></input>
            <p className="pForForm">{errors.employee_website?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_photo"
              className="profile_lanel_input_label"
            >
              Photo:
            </label>
            <input
              id="employee_photo"
              type="file"
              {...register("employee_photo")}
              placeholder="Upload Your Photo"
            ></input>
            {/* placeholder={props.data.photo} here ia willl be displaying image with paragraph */}
          </div>
          <div className="profile_label_input ">
            <span>
              <p>
                <label htmlFor="employee_bio">Your Bio:</label>
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
                  {...register("employee_description")}
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
                {...register("employee_bio")}
                id="employee_bio"
                name="employee_bio"
                placeholder="Your short introduction!"
                rows="6"
                cols="60"
              />
            </div>
          </div>
          {/* <h1>Personal Information</h1> */}
          <div className="profile_label_input ">
            <label
              htmlFor="employee_jobtitle"
              className="profile_lanel_input_label"
            >
              Job Title:
            </label>
            <input
              id="employee_jobtitle"
              type="text"
              {...register("employee_jobtitle")}
              value={props.data?.employee_jobtitle}
              placeholder="Enter Your Job Title"
            ></input>
            <p className="pForForm">{errors.employee_jobtitle?.message}</p>
          </div>
          {/* <div className="profile_label_input ">
            <label
              htmlFor="employee_category"
              className="profile_lanel_input_label"
            >
              Job Category:
            </label>
            <input
              id="employee_category"
              type="text"
              {...register("employee_category")}
              value={props.data?.employee_category}
              placeholder="Enter Your Job Category"
            ></input>
            <p className="pForForm">{errors.employee_category?.message}</p>
          </div> */}
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
              placeholder="Enter Youe Education Details"
            ></input>
            <p className="pForForm">{errors.employee_education?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_experience"
              className="profile_lanel_input_label"
            >
              {" "}
              Experience:
            </label>
            <input
              {...register("employee_experience")}
              id="employee_experience"
              type="text"
              placeholder="Enter Your Experience"
            ></input>
            <p className="pForForm">{errors.employee_experience?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_departments"
              className="profile_lanel_input_label"
            >
              {" "}
              Department:
            </label>
            <input
              // {...register("employee_departments")}
              id="employee_departments"
              type="text"
              value={props.data?.employee_departments}
              placeholder="Enter Your Department Name You Are Working "
            ></input>
            <p className="pForForm">{errors.employee_departments?.message}</p>
          </div>
          {/* <div className="profile_label_input ">
            <label
              htmlFor="employee_surgeries"
              className="profile_lanel_input_label"
            >
              Suregries Performed:
            </label>
            <input
              {...register("employee_surgeries")}
              id="employee_surgeries"
              type="text"
              placeholder="Enter The Number Of Surgeries You Performed"
            ></input>
          </div> */}
          {/* <div className="profile_label_input ">
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
              placeholder="Enter Your Appointments Per Month"
            ></input>
          </div> */}
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
              placeholder="Enter Your Awards and Recognitions"
            ></input>
            <p className="pForForm">{errors.employee_awards?.message}</p>
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
              placeholder="Enter Your Address"
            ></input>
            <p className="pForForm">{errors.employee_address?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label
              htmlFor="employee_phone"
              className="profile_lanel_input_label"
            >
              Phone:
            </label>
            <input
              {...register("employee_phone")}
              id="employee_phone"
              type="text"
              placeholder="Enter Your Phone"
            ></input>
            <p className="pForForm">{errors.employee_phone?.message}</p>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="user" className="profile_lanel_input_label">
              Email:
            </label>
            <input
              // {...register("user")}
              id="user"
              type="text"
              placeholder="Enter Your Email"
              value={props.data.user}
            ></input>
            {/* <p className="pForForm">{errors.user?.message}</p> */}
          </div>
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
              placeholder="Enter Your Facebook ID"
            ></input>
            <p className="pForForm">{errors.employee_facebook?.message}</p>
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
              placeholder="Enter Your LinkedIn ID"
            ></input>
            <p className="pForForm">{errors.employee_linkedin?.message}</p>
          </div>
          <input
            type="submit"
            className="admin_buttons_add_update_from_add_update_form"
            value="SUBMIT TO UPDATE YOUR PROFILE"
            style={{
              margin: "10px 25% 20px 25%",
              width: "50%",
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Profile;

{
  /* <div className="profile_information_all">
        <form>
          <div className="profile_label_input">
            <label htmlFor="profile_name"> Your Name:</label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Your Website:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Your Photo:
            </label>
            <input id="profile_name" type="file"></input>
          </div>
          <div className="profile_label_input ">
            <span>
              <p>
                <label htmlFor="profile_shortIntroduction">Your Bio:</label>
              </p>
              <p>Write a Short Introduction:</p>
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
                id="profile_shortIntroduction"
                name="profile_shortIntroduction"
                placeholder="Your short introduction!"
                rows="6"
                cols="50"
              />
            </div>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Your Education:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              {" "}
              Experience:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              {" "}
              Department:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              {" "}
              Suregries Performed:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Appointments Per Month:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Awards and Recognitions:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Address:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Phone:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Email:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Facebook:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              LinkedIn:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
        </form>
      </div>
    </div>  */
}
