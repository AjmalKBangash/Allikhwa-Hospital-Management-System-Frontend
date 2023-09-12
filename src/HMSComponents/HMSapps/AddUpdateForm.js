import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MultiSelect } from "react-multi-select-component";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// importing react-router-dom for routing
import { useLocation } from "react-router-dom";
// importing icons from react-icons
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { useEffect, useState } from "react";

// const options_dropdown = [
//   { label: "Grapes 🍇", value: "grapes" },
//   { label: "Mango 🥭", value: "mango" },
//   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
// ];
function AddUpdateForm(props) {
  const { data__employee_category, data } = props;
  let [addUpdate_Form_Data, set_AddUpdate_Form_Data] = useState();
  const [selected_dropdown, setSelected_dropdown] = useState([]);
  const [options_dropdown, setoptions_dropdown] = useState([]);
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
    employee_category: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Job category is Required"),
    employee_experience: Yup.string()
      .max(200, "Must be 200 characters or less")
      .required("Experience is Required"),
    employee_department: Yup.string()
      .max(300, "Must be 300 characters or less")
      .required("Department is Required")
      .matches(
        /^[A-Za-z\s]+(?:,[a-zA-Z\s]+)*$/g,
        " Department names should be sparated by comma and should exclude all other digits, numbers, special characters. Example: Cardiology,ENT A,Gynae B,Radiology etc"
      ),
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
    set_AddUpdate_Form_Data(data);
    console.log(data);
    reset();
  };
  let valueee = [];
  let propertyName = "label";
  useEffect(() => {
    axios
      .get("http://localhost:3100/departmentnames")
      .then((res) => {
        // setoptions_dropdown(res.data);
        for (let x in res.data) {
          valueee.push(res.data[x].name);
        }
        console.log(valueee);
        console.log(res.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(options_dropdown);
  console.log(valueee);
  useEffect(() => {
    {
      addUpdate_Form_Data &&
        axios
          .post(
            `http://localhost:3100/` +
              data__employee_category.toLowerCase() +
              "s",
            { ...addUpdate_Form_Data, PID: uuidv4() }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, [addUpdate_Form_Data]);

  let regex_for_depart_nmae_validation = /^[A-Za-z\s]+(?:,[a-zA-Z\s]+)*$/g;

  // useEffect(() => {
  //   {
  //     addUpdate_Form_Data &&
  //       axios
  //         .post(
  //           `http://localhost:3100/` +
  //             data__employee_category.toLowerCase() +
  //             "s",
  //           { ...addUpdate_Form_Data, PID: uuidv4() }
  //         )
  //         .then((response) => {
  //           console.log(response);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   }
  // }, [addUpdate_Form_Data]);
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
        {data__employee_category}
      </h2>
      <form onSubmit={handleSubmit(handle_addupdateformsubmit)}>
        {data.PID ? (
          <div className="profile_label_input">
            <label htmlFor="PID">
              PID:<span style={{ color: "red", margin: "4px" }}>*</span>
            </label>
            <input
              {...register("PID")}
              id="PID"
              type="text"
              value={data.PID}
              placeholder="Enter Your PID"
            ></input>
          </div>
        ) : (
          <div className="profile_label_input">
            <label htmlFor="PID">
              PID:<span style={{ color: "red", margin: "4px" }}>*</span>
            </label>
            <input
              {...register("PID")}
              id="PID"
              type="text"
              value={uuidv4()}
              placeholder="Enter Your PID"
            ></input>
          </div>
        )}

        <div className="profile_label_input">
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
          <label htmlFor="employee_photo" className="profile_lanel_input_label">
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
              <label htmlFor="employee_description">
                Your Bio:<span style={{ color: "red", margin: "4px" }}>*</span>
              </label>
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
              {...register("employee_description")}
              id="employee_description"
              name="employee_description"
              placeholder="Your short introduction!"
              rows="6"
              cols="60"
              defaultValue={data.employee_description}
            />
          </div>
        </div>
        {/* <h1>Personal Information</h1> */}
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
            htmlFor="employee_category"
            className="profile_lanel_input_label"
          >
            Job Category:<span style={{ color: "red", margin: "4px" }}>*</span>
          </label>
          <input
            id="employee_category"
            type="text"
            {...register("employee_category")}
            defaultValue={data.employee_category}
            placeholder="Enter Your Job Category"
          ></input>
          <p className="pForForm">{errors.employee_category?.message}</p>
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
        {/* <div className="profile_label_input ">
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
            defaultValue={data.employee_department}
            placeholder="Enter department names with comma separated!"
          ></input>
          <p className="pForForm">{errors.employee_department?.message}</p>
        </div> */}
        <div className="profile_label_input ">
          <MultiSelect
            options={options_dropdown}
            value={selected_dropdown}
            onChange={setSelected_dropdown}
            labelledBy="Select"
          />
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
          <label htmlFor="employee_phone" className="profile_lanel_input_label">
            Phone:
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
        <div className="profile_label_input ">
          <label htmlFor="employee_email" className="profile_lanel_input_label">
            Email:<span style={{ color: "red", margin: "4px" }}>*</span>
          </label>
          <input
            {...register("employee_email")}
            id="employee_email"
            type="text"
            defaultValue={data.employee_email}
            placeholder="Enter Your Email"
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
  );
}
export default AddUpdateForm;
