import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

// importing react-router-dom for routing
import { useLocation } from "react-router-dom";
// importing icons from react-icons
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { useEffect, useState } from "react";

function AddUpdateForm(props) {
  let [addUpdate_Form_Data, set_AddUpdate_Form_Data] = useState();
  const location = useLocation();

  const psswd = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/;
  const exclude_spaces_regex = /^[\d\w]*$/;

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
    employee_department: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Department is Required"),
    employee_email: Yup.string()
      .email("Invalid Email Address!")
      .required("Email is Required"),
    employee_description: Yup.string()
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
    reset();
  };

  useEffect(() => {
    axios
      .post(`  http://localhost:3100/admins`, { addUpdate_Form_Data })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [addUpdate_Form_Data]);
  return (
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
        ADMIN
      </h2>
      <form onSubmit={handleSubmit(handle_addupdateformsubmit)}>
        <div className="profile_label_input">
          <label htmlFor="employee_name"> Name:</label>

          <input
            {...register("employee_name")}
            id="employee_name"
            type="text"
            placeholder={props.data.name}
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
          ></input>
        </div>
        <div className="profile_label_input ">
          <label htmlFor="employee_photo" className="profile_lanel_input_label">
            Photo:
          </label>
          <input
            id="employee_photo"
            type="file"
            {...register("employee_photo")}
          ></input>
        </div>
        <div className="profile_label_input ">
          <span>
            <p>
              <label htmlFor="employee_description">Your Bio:</label>
            </p>
            <p>Write a Short Introduction:</p>
            <p className="pForForm">{errors.employee_description?.message}</p>
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
              {...register("employee_description")}
              id="employee_description"
              name="employee_description"
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
          ></input>
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
          ></input>
          <p className="pForForm">{errors.employee_experience?.message}</p>
        </div>
        <div className="profile_label_input ">
          <label
            htmlFor="employee_department"
            className="profile_lanel_input_label"
          >
            {" "}
            Department:
          </label>
          <input
            {...register("employee_department")}
            id="employee_department"
            type="text"
          ></input>
          <p className="pForForm">{errors.employee_department?.message}</p>
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
          ></input>
          <p className="pForForm">{errors.employee_address?.message}</p>
        </div>
        <div className="profile_label_input ">
          <label htmlFor="employee_phone" className="profile_lanel_input_label">
            Phone:
          </label>
          <input
            {...register("employee_phone")}
            id="employee_phone"
            type="text"
          ></input>
          <p className="pForForm">{errors.employee_phone?.message}</p>
        </div>
        <div className="profile_label_input ">
          <label htmlFor="employee_email" className="profile_lanel_input_label">
            Email:
          </label>
          <input
            {...register("employee_email")}
            id="employee_email"
            type="text"
          ></input>
          <p className="pForForm">{errors.employee_email?.message}</p>
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
  );
}
export default AddUpdateForm;
