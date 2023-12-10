import "./SignUpIn.css";
// import axiosinstance from "./axiosinstance"; //  IT HAS BEEN CHANGED GLOBALLY
// form handling and validatiion
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// media
import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// REACT ICONS
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import ProtectedRoutesHmsAppLayout from "../HMSComponents/HMSapps/ProtectedRoutesHmsAppLayout";

function SignUpIn() {
  // axios.defaults = axiosinstance.defaults;
  const [displaySignIn, setDisplaySignIn] = useState(true);
  const [patientForm, setPatientForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility for login
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false); // State to control password visibility
  const [registeringUser, setRegisteringUser] = useState(false);
  const [registrationErrorEmail, setRegistrationErrorEmail] = useState(false);
  const [registrationErrorUsername, setRegistrationErrorUsername] =
    useState(false);
  const [logginInUser, setLogginInUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function RegisterFunForOptions(e) {
    if (e.target.value === "patient") {
      setPatientForm(true);
    }
    if (e.target.value === "others") {
      setPatientForm(false);
    }
  }

  // customvalidation started
  // let psswd =
  // /^.*(?=.{8,})((?=.*[!@#$%^&*()-_=+{};:,<.>]){1})(?=.*d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  const psswd = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/;

  const loginSchema = Yup.object().shape({
    // Log In Form Validation
    // username: Yup.string().required("Name is required!"),
    email: Yup.string()
      .email("Invalid Email Address!")
      .required("Email is Required!"),
    password: Yup.string().required("Password is required!"),
  });

  const signupSchema1 = Yup.object().shape({
    // Sign Up Form Validation
    username: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Name is Required!"),
    email: Yup.string()
      .email("Invalid Email Address!")
      .required("Email is Required!"),
    phone: Yup.string().required("Phone num is required!").matches("123"),
    password: Yup.string()
      .required("Password is required!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum eight characters, at least one letter, one number and one special character!"
      ),
    confirmpassword: Yup.string()
      .required("Confirm Password is required!")
      .oneOf([Yup.ref("password"), null], "Passwords must match!"),
    // address: Yup.string().required("Adress is required!"),
  });

  const signupSchema2 = Yup.object().shape({
    // Sign Up Form Validation
    namee: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Name is Required!"),
    email: Yup.string()
      .email("Invalid Email Address!")
      .required("Email is Required"),
    phone: Yup.string().required("Phone num is required!").matches("123"),
    IDcard: Yup.number().required("Id Card num is required!").min(3).max(3),
    bloodgrplist: Yup.string().required("Blood grp is required!"),
    // password: Yup.string()
    //   .required("Password is required!")
    //   .matches(
    //     "321",
    //     "Minimum eight characters, at least one letter, one number and one special character!"
    //   ),
    // confirmpassword: Yup.string()
    //   .required("Confirm Password is required!")
    //   .oneOf([Yup.ref("password"), null], "Passwords must match!"),
    address: Yup.string().required("Address is required!"),
    age: Yup.string().required("Age is required!"),
  });

  // react hook form
  const {
    reset: reset01,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const {
    reset: reset02,
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signupSchema1),
  });

  const {
    reset: reset03,
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signupSchema2),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    setLogginInUser(data);
    // reset01();
  };

  const onSubmitOthers = (data) => {
    setRegisteringUser(data);
    // reset02();
  };

  const onSubmitPatient = (data) => {
    alert(JSON.stringify(data));
    reset03();
  };

  // SHOWING PASSWORD ONCLICK FOR LOGIN
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  // SHOWING PASSWORD ONCLICK FOR SIGNUP
  const handleTogglePasswordSignUp = () => {
    setShowPasswordSignUp(!showPasswordSignUp);
  };

  // REGISTERING USER
  useEffect(() => {
    if (registeringUser) {
      axios
        .post(
          "http://localhost:8000/allikhwa-hms/custom-user/",
          registeringUser
        )
        .then((res) => {
          setRegisteringUser(false);
          setDisplaySignIn(true);
          // navigate("/signup");
          setRegistrationErrorUsername(false);
          setRegistrationErrorEmail(false);
          reset02();
        })
        .catch((err) => {
          if (err.response.data.email) {
            setRegistrationErrorEmail("User with this email already exists");
          } else {
            setRegistrationErrorEmail(false);
          }
          if (err.response.data.username) {
            setRegistrationErrorUsername(
              "User with this username already exists"
            );
          } else {
            setRegistrationErrorUsername(false);
          }
          setRegisteringUser(false);
        });
    }
  }, [registeringUser]);
  // USER LOGIN
  useEffect(() => {
    if (logginInUser) {
      const baseurl = "http://localhost:8000/";
      axios
        .post(baseurl + "api/token/", logginInUser)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          setLogginInUser(false);
          ///////////////////////////////////////////
          axios
            .get("allikhwa-hms/doctors/" + logginInUser.email)
            .then((response) => {
              // Handle successful response from the first request
              // dispatch(employee_loggedin(response.data)); IT IS USELESS BECAUSE THE STATES IN REACT COMPONENTS INCLUDING REACT-REDUX THE STATES IS NOT PERSISTENT HENCE IT WILL BE UNMOUNTED WHEN PAGE REFRESHED
              localStorage.setItem(
                "employee_loggedin_persistentdata",
                logginInUser.email
              );
              navigate("../doctor-hms", { relative: "path" });
            })
            .catch((error) => {
              axios
                .get("allikhwa-hms/staffs/" + logginInUser.email)
                .then((response) => {
                  localStorage.setItem(
                    "employee_loggedin_persistentdata",
                    logginInUser.email
                  );
                  navigate("../rec-hms", {
                    relative: "path",
                  });
                })
                .catch((error) => {
                  axios
                    .get("allikhwa-hms/receptionists/" + logginInUser.email)
                    .then((response) => {
                      localStorage.setItem(
                        "employee_loggedin_persistentdata",
                        logginInUser.email
                      );
                      navigate("../rec-hms", {
                        relative: "path",
                      });
                    })
                    .catch((error) => {
                      axios
                        .get("allikhwa-hms/nurses/" + logginInUser.email)
                        .then((response) => {
                          localStorage.setItem(
                            "employee_loggedin_persistentdata",
                            response.data
                          );
                          navigate("../rec-hms", {
                            relative: "path",
                          });
                        })
                        .catch((error) => {
                          axios
                            .get(
                              "allikhwa-hms/pharmacists/" + logginInUser.email
                            )
                            .then((response) => {
                              localStorage.setItem(
                                "employee_loggedin_persistentdata",
                                logginInUser.email
                              );
                              navigate("../lab-hms", {
                                relative: "path",
                              });
                            })
                            .catch((error) => {
                              axios
                                .get(
                                  "allikhwa-hms/admins/" + logginInUser.email
                                )
                                .then((response) => {
                                  localStorage.setItem(
                                    "employee_loggedin_persistentdata",
                                    logginInUser.email
                                  );
                                  navigate("../all'ikhwa-management-system/", {
                                    relative: "path",
                                  });
                                });
                            });
                        });
                    });
                });
            });
          ///////////////////////////////////////////
          navigate("");
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [logginInUser]);

  // last effect
  useEffect(() => {
    try {
      if (location.state.truefalse != null) {
        setDisplaySignIn(location.state.truefalse);
      }
    } catch (err) {
      console.log(err);
    }
  }, [location.state]);

  return (
    <div className="signupintop">
      {/* <> */}
      <img
        className="imgofform"
        src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
      />
      <div className="signupinform">
        <div className="menuforsignup">
          <img src={AllikhwaLogo}></img>
          <h3
            onClick={() => setDisplaySignIn(true)}
            style={{
              backgroundColor: displaySignIn ? "#fe4200" : "#fe440081",
            }}
          >
            Sign In
          </h3>
          <h3
            onClick={() => setDisplaySignIn(false)}
            style={{
              backgroundColor: !displaySignIn ? "#fe4200" : "#fe440081",
            }}
          >
            Sign Up
          </h3>
        </div>
        {/* </> */}
        {/* Sign In Form */}
        {/* LOGIN FORM */}
        {displaySignIn && (
          <form
            className="signupform"
            name="loginform"
            key={1}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              className="inputFieldinOverlayForm"
              name="email"
              placeholder="Email Address"
              {...register("email")}
            ></input>
            {errors2.email && (
              <p className="pForForm">{errors2.email?.message}</p>
            )}
            {/* <input
              type="text"
              className="inputFieldinOverlayForm"
              name="username"
              placeholder="Enter Your Name"
              {...register("username")}
            ></input>
            {errors.username && (
              <p className="pForForm">{errors.username.message}</p>
            )} */}
            <div
              style={{
                position: "relative",
                border: "1px solid #fe440063",
                // borderRadius: "4px",
                height: "40px",
                margin: "5px",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                {...register("password")}
                style={{
                  width: "100%",
                  padding: "0 34px 0 10px",
                  height: "40px",
                  fontSize: "15px",
                  margin: "0",
                  border: "none",
                  // borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                // className="inputFieldinOverlayForm"  THIS CLASS SHOLD MUST BE COMMETED OTHERWISE IT WILL BE CONFLICTED WITHE THE INLINE CSS
              ></input>
              {showPassword ? (
                <FaEyeSlash
                  onClick={handleTogglePassword}
                  style={{ position: "absolute", right: 14, top: "33%" }}
                />
              ) : (
                <FaEye
                  onClick={handleTogglePassword}
                  style={{ position: "absolute", right: 14, top: "33%" }}
                />
              )}
            </div>
            <p className="pForForm">{errors.password?.message}</p>
            <button type="submit" className="loginSignBtn">
              Submit
            </button>
          </form>
        )}
        {/* Sign Up Form  */}
        {/* REGSITERNG USER FORM  */}
        {!displaySignIn && (
          <>
            {!patientForm && (
              <form
                className="signupform"
                name="signupform"
                key={2}
                onSubmit={handleSubmit2(onSubmitOthers)}
              >
                {/* <select
                  type="select"
                  name="selectpatientother"
                  className="inputFieldinOverlayForm"
                  defaultValue={"others"}
                  {...register2("selectpatientother")}
                  onChange={RegisterFunForOptions}
                >
                  <option key="patient" value="patient" name="patient">
                    Patient
                  </option>
                  <option key="others" value="others" name="others">
                    Others
                  </option>
                </select> */}
                {/* <p className="pForForm">{errors.selectpatientother?.message}</p> */}
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="username"
                  placeholder="Enter Your Name"
                  {...register2("username")}
                ></input>
                {errors2.username && (
                  <p className="pForForm">{errors2.username?.message}</p>
                )}
                <p className="pForForm">
                  {registrationErrorUsername && registrationErrorUsername}
                </p>
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="email"
                  placeholder="Email Address"
                  {...register2("email")}
                ></input>
                {errors2.email && (
                  <p className="pForForm">{errors2.email?.message}</p>
                )}
                <p className="pForForm">
                  {registrationErrorEmail && registrationErrorEmail}
                </p>
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  {...register2("phone")}
                ></input>
                <p className="pForForm">{errors2.phone?.message}</p>
                <div
                  style={{
                    position: "relative",
                    border: "1px solid #fe440063",
                    // borderRadius: "4px",
                    height: "40px",
                    margin: "5px",
                  }}
                >
                  <input
                    type={showPasswordSignUp ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    {...register2("password")}
                    style={{
                      width: "100%",
                      padding: "0 34px 0 10px",
                      height: "40px",
                      fontSize: "15px",
                      margin: "0",
                      border: "none",
                      // borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                    // className="inputFieldinOverlayForm"
                  ></input>
                  {showPasswordSignUp ? (
                    <FaEyeSlash
                      onClick={handleTogglePasswordSignUp}
                      style={{ position: "absolute", right: 14, top: "36%" }}
                    />
                  ) : (
                    <FaEye
                      onClick={handleTogglePasswordSignUp}
                      style={{ position: "absolute", right: 14, top: "36%" }}
                    />
                  )}
                </div>
                <p className="pForForm">{errors2.password?.message}</p>
                <input
                  type="password"
                  className="inputFieldinOverlayForm"
                  name="confirmpassword"
                  placeholder="Confirm Passowrd"
                  {...register2("confirmpassword")}
                ></input>
                <p className="pForForm">{errors2.confirmpassword?.message}</p>
                {/* <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="address"
                  placeholder="Enter Your Address"
                  {...register2("address")}
                ></input>
                <p className="pForForm">{errors2.address?.message}</p> */}
                <br />
                <br />
                <p
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    padding: "10px",
                  }}
                >
                  By clicking{" "}
                  <span style={{ color: "orangered" }}>Sign up</span>, you agree
                  to our <span style={{ color: "orangered" }}>Terms,</span>{" "}
                  Privacy Policy{" "}
                  <span style={{ color: "orangered" }}>Cookies Policy </span>
                  and Cookies Policy. You may receive SMS notifications from us
                  and can opt out at any time.
                  <br />
                  <br />
                  We may be sending you reports about{" "}
                  <span style={{ color: "orangered" }}>
                    Current Diseases{" "}
                  </span>{" "}
                  to warn and inform you about present situation and security
                  measures against them.
                </p>
                <button type="submit" className="loginSignBtn">
                  Submit
                </button>
              </form>
            )}
            {/*  2nd form Patient */}
            {patientForm && (
              <form
                className="signupform"
                name="signupform"
                key={3}
                onSubmit={handleSubmit3(onSubmitPatient)}
              >
                <select
                  type="select"
                  name="selectpatientother"
                  className="inputFieldinOverlayForm"
                  defaultValue={"patient"}
                  {...register3("selectpatientother")}
                  onChange={RegisterFunForOptions}
                >
                  {/* <option value={""} disabled >
                Register Yourself As..
              </option> */}
                  <option key="patient" value="patient" name="patient">
                    Patient
                  </option>
                  <option key="others" value="others" name="others">
                    Others
                  </option>
                </select>
                {/* <p className="pForForm">{errors.selectpatientother?.message}</p> */}
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="namee"
                  placeholder="Enter Your Name"
                  {...register3("namee")}
                ></input>
                <p className="pForForm">{errors3.namee?.message}</p>
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="email"
                  placeholder="Email Address"
                  {...register3("email")}
                ></input>
                <p className="pForForm">{errors3.email?.message}</p>
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  {...register3("phone")}
                ></input>
                <p className="pForForm">{errors3.phone?.message}</p>
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="IDcard"
                  placeholder="Enter Your IDcard Number"
                  {...register3("IDcard")}
                ></input>
                <p className="pForForm">{errors3.IDcard?.message}</p>

                <select
                  type="select"
                  name="bloodgrplist"
                  className="inputFieldinOverlayForm"
                  defaultValue={""}
                  {...register3("bloodgrplist")}
                >
                  <option value={""} disabled>
                    Select Your Blood Group..
                  </option>
                  <option key="A+" value="A+">
                    A+
                  </option>
                  <option key="A-" value="A-">
                    A-
                  </option>
                  <option key="B+" value="B+">
                    B+
                  </option>
                  <option key="B-" value="B-">
                    B-
                  </option>
                  <option key="O+" value="O+">
                    O+
                  </option>
                  <option key="O-" value="O-">
                    O-
                  </option>
                  <option key="AB+" value="AB+">
                    AB+
                  </option>
                  <option key="AB-" value="AB-">
                    AB-
                  </option>
                </select>
                <p className="pForForm">{errors3.bloodgrplist?.message}</p>
                {/* <input
                  type="password"
                  className="inputFieldinOverlayForm"
                  name="password"
                  placeholder="Password"
                  {...register3("password")}
                ></input>
                <p className="pForForm">{errors3.password?.message}</p> */}
                {/* <input
                  type="password"
                  className="inputFieldinOverlayForm"
                  name="confirmpassword"
                  placeholder="Confirm Passowrd"
                  {...register3("confirmpassword")}
                ></input>
                <p className="pForForm">{errors3.confirmpassword?.message}</p> */}
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="address"
                  placeholder="Enter Your Address"
                  {...register3("address")}
                ></input>
                <p className="pForForm">{errors3.address?.message}</p>
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="age"
                  placeholder="Enter Your Age"
                  {...register3("age")}
                ></input>
                <p className="pForForm">{errors3.age?.message}</p>
                <br />
                <br />
                <p
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    padding: "10px",
                  }}
                >
                  By clicking{" "}
                  <span style={{ color: "orangered" }}>Sign up</span>, you agree
                  to our <span style={{ color: "orangered" }}>Terms,</span>{" "}
                  Privacy Policy{" "}
                  <span style={{ color: "orangered" }}>Cookies Policy </span>
                  and Cookies Policy. You may receive SMS notifications from us
                  and can opt out at any time.
                  <br />
                  <br />
                  We may be sending you reports about{" "}
                  <span style={{ color: "orangered" }}>
                    Current Diseases{" "}
                  </span>{" "}
                  to warn and inform you about present situation and security
                  measures against them.
                </p>
                <button type="submit" className="loginSignBtn">
                  Submit
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SignUpIn;

// *
// *
// *
// *
// formik usage declaration
// const formik = useFormik({
//   initialValues,
//   validationSchema: loginSchema,
//   onSubmit: (values) => {
//     //  alert(JSON.stringify(values, null, 2));
//     console.log(values);
//     console.log(formik.errors);
//   },
// });
// *
// *
// *
// *
// validation with formik
//   return (
//     <div className="signupintop">
//       <img
//         className="imgofform"
//         src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
//       />
//       <div className="signupinform">
//         <div className="menuforsignup">
//           <img src={AllikhwaLogo}></img>
//           <h3
//             onClick={() => setDisplaySignIn(true)}
//             style={{ backgroundColor: displaySignIn ? "#fe4200" : "#fe440081" }}
//           >
//             Sign In
//           </h3>
//           <h3
//             onClick={() => setDisplaySignIn(false)}
//             style={{
//               backgroundColor: !displaySignIn ? "#fe4200" : "#fe440081",
//             }}
//           >
//             Sign Up
//           </h3>
//         </div>
//         {/* Sign In Form */}
//         {displaySignIn && (
//           <form
//             className="signupform"
//             name="loginform"
//             onSubmit={formik.handleSubmit}
//           >
//             <input
//               type="text"
//               className="inputFieldinOverlayForm"
//               name="nameelogin"
//               {...formik.getFieldProps("nameelogin")}
//               placeholder="Enter Your Name"
//             ></input>
//             {formik.touched.nameelogin && formik.errors.nameelogin ? (
//               <p className="pForForm">{formik.errors.nameelogin}</p>
//             ) : null}{" "}
//             {/*
//             <input
//               type="text"
//               className="inputFieldinOverlayForm"
//               {...register("email")}
//               placeholder="Email Address"
//             ></input>
//             {errors.email && <p className="pForForm">{errors.email.message}</p>} */}
//             <input
//               type="password"
//               className="inputFieldinOverlayForm"
//               name="passwordlogin"
//               {...formik.getFieldProps("passwordlogin")}
//               placeholder="Password"
//             ></input>
//             {formik.touched.passwordlogin && formik.errors.passwordlogin ? (
//               <p className="pForForm">{formik.errors.passwordlogin}</p>
//             ) : null}
//             <button type="submit" className="loginSignBtn">
//               Submit
//             </button>
//           </form>
//         )}

//         {/* Sign Up Form  */}
//         {!displaySignIn && (
//           <form
//             className="signupform"
//             name="signupform"
//             onSubmit={formik.handleSubmit}
//           >
//             <select
//               type="select"
//               name="selectpatientother"
//               className="inputFieldinOverlayForm"
//               // defaultValue={"others"}
//               onChange={RegisterFunForOptions}
//               {...formik.getFieldProps("selectpatientother")}
//             >
//               {/* <option value={""} disabled >
//                 Register Yourself As..
//               </option> */}
//               <option
//                 key="patient"
//                 value="patient"
//                 name="patient"
//                 // onClick={RegisterFunForOptions}
//               >
//                 Patient
//               </option>
//               <option
//                 key="others"
//                 value="others"
//                 name="others"
//                 // onClick={RegisterFunForOptions}
//               >
//                 Others
//               </option>
//             </select>
//             {/* {formik.touched.selectpatientother &&
//             formik.errors.selectpatientother ? (
//               <p className="pForForm">{formik.errors.selectpatientother}</p>
//             ) : null}{" "} */}
//             <input
//               type="text"
//               className="inputFieldinOverlayForm"
//               name="namee"
//               placeholder="Enter Your Name"
//               {...formik.getFieldProps("namee")}
//             ></input>
//             {formik.touched.namee && formik.errors.namee ? (
//               <p className="pForForm">{formik.errors.namee}</p>
//             ) : null}{" "}
//             <input
//               type="text"
//               className="inputFieldinOverlayForm"
//               name="email"
//               placeholder="Email Address"
//               {...formik.getFieldProps("email")}
//             ></input>
//             {formik.touched.email && formik.errors.email ? (
//               <p className="pForForm">{formik.errors.email}</p>
//             ) : null}{" "}
//             <input
//               type="text"
//               className="inputFieldinOverlayForm"
//               name="phone"
//               placeholder="Enter Your Phone Number"
//               {...formik.getFieldProps("phone")}
//             ></input>
//             {formik.touched.phone && formik.errors.phone ? (
//               <p className="pForForm">{formik.errors.phone}</p>
//             ) : null}{" "}
//             {patientForm && (
//               <>
//                 <input
//                   type="text"
//                   className="inputFieldinOverlayForm"
//                   name="IDcard"
//                   placeholder="Enter Your IDcard Number"
//                   {...formik.getFieldProps("IDcard")}
//                 ></input>
//                 {formik.touched.IDcard && formik.errors.IDcard ? (
//                   <p className="pForForm">{formik.errors.IDcard}</p>
//                 ) : null}
//                 <select
//                   type="select"
//                   name="bloodgrplist"
//                   className="inputFieldinOverlayForm"
//                   defaultValue={""}
//                   {...formik.getFieldProps("bloodgrplist")}
//                 >
//                   <option value={""} disabled>
//                     Select Your Blood Group..
//                   </option>
//                   <option key="A+" value="A+">
//                     A+
//                   </option>
//                   <option key="A-" value="A-">
//                     A-
//                   </option>
//                   <option key="B+" value="B+">
//                     B+
//                   </option>
//                   <option key="B-" value="B-">
//                     B-
//                   </option>
//                   <option key="O+" value="O+">
//                     O+
//                   </option>
//                   <option key="O-" value="O-">
//                     O-
//                   </option>
//                   <option key="AB+" value="AB+">
//                     AB+
//                   </option>
//                   <option key="AB-" value="AB-">
//                     AB-
//                   </option>
//                 </select>
//                 {formik.touched.bloodgrplist && formik.errors.bloodgrplist ? (
//                   <p className="pForForm">{formik.errors.bloodgrplist}</p>
//                 ) : null}{" "}
//               </>
//             )}
//             <input
//               type="password"
//               className="inputFieldinOverlayForm"
//               name="password"
//               placeholder="Password"
//               {...formik.getFieldProps("password")}
//             ></input>
//             {formik.touched.password && formik.errors.password ? (
//               <p className="pForForm">{formik.errors.password}</p>
//             ) : null}{" "}
//             <input
//               type="password"
//               className="inputFieldinOverlayForm"
//               name="confirmpassword"
//               placeholder="Confirm Passowrd"
//               {...formik.getFieldProps("confirmpassword")}
//             ></input>
//             {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
//               <p className="pForForm">{formik.errors.confirmpassword}</p>
//             ) : null}{" "}
//             <input
//               type="text"
//               className="inputFieldinOverlayForm"
//               name="address"
//               placeholder="Enter Your Address"
//               {...formik.getFieldProps("address")}
//             ></input>
//             {formik.touched.address && formik.errors.address ? (
//               <p className="pForForm">{formik.errors.address}</p>
//             ) : null}{" "}
//             <br />
//             <br />
//             <p
//               style={{
//                 color: "grey",
//                 fontSize: "12px",
//                 padding: "10px",
//               }}
//             >
//               By clicking <span style={{ color: "orangered" }}>Sign up</span>,
//               you agree to our{" "}
//               <span style={{ color: "orangered" }}>Terms,</span> Privacy Policy{" "}
//               <span style={{ color: "orangered" }}>Cookies Policy </span>
//               and Cookies Policy. You may receive SMS notifications from us and
//               can opt out at any time.
//               <br />
//               <br />
//               We may be sending you reports about{" "}
//               <span style={{ color: "orangered" }}>Current Diseases </span> to
//               warn and inform you about present situation and security measures
//               against them.
//             </p>
//             <button type="submit" className="loginSignBtn">
//               Submit
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }
// export default SignUpIn;
