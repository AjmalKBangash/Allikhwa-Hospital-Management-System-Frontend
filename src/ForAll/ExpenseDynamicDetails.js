import "./ExpenseDynamicDetails";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { expenses_to_expensedynamic_form_display } from "../Store/Store";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// importing icons
import { MdDetails } from "react-icons/md";
import { AiOutlineUnorderedList, AiOutlineOrderedList } from "react-icons/ai";

function ExpenseDynamicDetails(props) {
  const [expenses_editing_or_adding, setexpenses_editing_or_adding] =
    useState(false);
  const [fetched_expenses_type, setfetched_expenses_type] = useState();
  const expensedynamic_ad_edit_html_form_intoscroll = useRef();
  const expenses_to_expensedynamic_form_display_var = useSelector(
    (state) => state.expenses_to_expensedynamic_form_display
  );
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(expenses_to_expensedynamic_form_display_var);
  console.log(props);
  console.log(location.state);
  // form validation and handling
  const expense_dynamic_schema = Yup.object().shape({
    // Sign Up Form Validation
    cost: Yup.number()
      .typeError("Cost is required and must be a number")
      .min(0, "Beds should not be less than zero ")
      .required("Bed No is Required!"),
    type: Yup.string()
      .max(150, "Must be less than 150 characters")
      .required("Type is Required"),
    date: Yup.date("Date is required")
      .typeError("Date is required")
      .min(
        new Date().toISOString().split("T")[0],
        "Date should not be less than the current Date!"
      )
      .max(
        new Date().toISOString().split("T")[0],
        "Date should not be greater than the current Date!"
      )
      .required("Date is Required"),
    department: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Department is Required"),
    added_by: Yup.string()
      .max(50, "Must be less than 50 characters!")
      .required("Job category is Required"),
    details: Yup.string()
      .required("Details  is compulsory to add")
      .min(200, "Please provide details upto 200 characters"),
  });

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(expense_dynamic_schema),
  });
  const expense_dynamic_adding = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  let expense_type = "";
  if (location.state) {
    expense_type = location.state.type.toLowerCase(); // Here i have to search for the type incase sensittive in the database  otherwise it will not work
  }
  console.log(expense_type);
  // console.log(expenses_to_expensedynamic_form_display_var);
  // console.log(expenses_editing_or_adding);
  console.log(location.state);
  if (expenses_to_expensedynamic_form_display_var == "add") {
    expensedynamic_ad_edit_html_form_intoscroll.current?.scrollIntoView({
      behavior: "smooth",
    });
    setValue("type", "");
    setValue("cost", "");
    setValue("department", "");
    setValue("date", "");
    setValue("details", "");
    setValue("added_by", "");
  }
  useEffect(() => {
    if (expense_type) {
      axios
        .get("http://localhost:8000/allikhwa-hms/expenses/" + expense_type)
        .then((res) => {
          setfetched_expenses_type(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [expense_type]);

  return (
    <>
      {/* editing or adding expenses  */}
      {expenses_to_expensedynamic_form_display_var && (
        <div
          ref={expensedynamic_ad_edit_html_form_intoscroll} // this ref is for ecrolling to this div element from edit details
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
            {expenses_to_expensedynamic_form_display_var &&
              expenses_to_expensedynamic_form_display_var.toUpperCase()}{" "}
            EXPENSES
          </h2>
          <h2
            style={{
              fontSize: "15px",
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
              dispatch(expenses_to_expensedynamic_form_display(false));
            }}
          >
            &#10060;
          </h2>
          <form onSubmit={handleSubmit(expense_dynamic_adding)}>
            {/* <h1>Personal Information</h1> */}
            <div className="profile_label_input ">
              <label htmlFor="type" className="profile_lanel_input_label">
                Type:
              </label>
              <input
                id="type"
                type="text"
                {...register("type")}
                placeholder="Enter Department Name"
              ></input>
              <p className="pForForm">{errors.type?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="cost" className="profile_lanel_input_label">
                Cost:
              </label>
              <input
                id="cost"
                type="text"
                {...register("cost")}
                placeholder="Enter Number of Total Beds"
              ></input>
              <p className="pForForm">{errors.cost?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="department" className="profile_lanel_input_label">
                Department:
              </label>
              <input
                {...register("department")}
                id="department"
                type="text"
                placeholder="Enter Free Available Beds"
              ></input>
              <p className="pForForm">{errors.department?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="date" className="profile_lanel_input_label">
                {" "}
                Date:
              </label>
              <input
                {...register("date")}
                id="date"
                type="date"
                placeholder="Enter date while adding expenses please"
              ></input>
              <p className="pForForm">{errors.date?.message}</p>
            </div>
            <div className="profile_label_input ">
              <label htmlFor="added_by" className="profile_lanel_input_label">
                {" "}
                Added By:
              </label>
              <input
                {...register("added_by")}
                id="added_by"
                type="text"
                placeholder="Enter your employee designation in Hospital"
              ></input>
              <p className="pForForm">{errors.added_by?.message}</p>
              <p>{expenses_editing_or_adding.added_by}</p>
            </div>
            <div className="profile_label_input ">
              <span>
                <p>
                  <label htmlFor="beds_description">Your Views:</label>
                </p>
                <p>Write details please:</p>
                <p className="pForForm">{errors.details?.message}</p>
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
                  {...register("details")}
                  id="details"
                  name="details"
                  placeholder="Enter the expense details!"
                  rows="6"
                  cols="60"
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

      {/* ********* */}
      <div
        className="fill_free_beds_html_table"
        style={{ margin: "80px 5% 80px 5%" }}
      >
        <h2 className="fillfreebeds_h2">
          {expense_type.toUpperCase()} EXPENSES
        </h2>
        <table
          className="employee_GeneratedTable"
          style={{ marginBottom: "50px" }}
        >
          <thead>
            <tr>
              <th>Type</th>
              <th>Cost</th>
              <th>Department</th>
              <th>Date</th>
              <th>Added By</th>
              <th>Details</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {fetched_expenses_type ? (
              fetched_expenses_type.map((expense_details, id) => {
                console.log(fetched_expenses_type);
                return (
                  <tr key={id}>
                    <td>{expense_details.expense_type}</td>
                    <td>{expense_details.expense_cost}</td>
                    <td>{expense_details.expense_department}</td>
                    <td>{expense_details.expense_date}</td>
                    <td>{expense_details.expense_details}</td>
                    <td>{expense_details.expense_addedby}</td>
                    <td
                      onClick={() => {
                        expensedynamic_ad_edit_html_form_intoscroll.current?.scrollIntoView(
                          {
                            behavior: "smooth",
                          }
                        );
                        dispatch(
                          expenses_to_expensedynamic_form_display(
                            expense_details.type
                          )
                        );
                        setValue("type", expense_details.expense_type);
                        setValue("cost", expense_details.expense_cost);
                        setValue(
                          "department",
                          expense_details.expense_department
                        );
                        setValue("date", expense_details.expense_date);
                        setValue("details", expense_details.expense_details);
                        setValue("added_by", expense_details.expense_addedby);
                      }}
                    >
                      <MdDetails className="patient_details_edit_icon" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <h6>Loading ...</h6>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ExpenseDynamicDetails;
