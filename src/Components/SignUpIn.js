import "./SignUpIn.css";

// form handling and validatiion
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// media
import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function SignUpIn() {
  const [displaySignIn, setDisplaySignIn] = useState(true);
  const [patientForm, setPatientForm] = useState(false);
  const location = useLocation();

  function RegisterFunForOptions(e) {
    if (e.target.value === "patient") {
      setPatientForm(true);
      console.log("patientshooooooo");
    }
    if (e.target.value === "others") {
      setPatientForm(false);
      console.log("Othersshoooooooo");
    }
  }

  // customvalidation started
  // let psswd =
  // /^.*(?=.{8,})((?=.*[!@#$%^&*()-_=+{};:,<.>]){1})(?=.*d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  const psswd = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/;

  const loginSchema = Yup.object().shape({
    // Log In Form Validation
    nameelogin: Yup.string().required("Name is required!"),
    passwordlogin: Yup.string().required("Password is required!"),
  });

  const signupSchema1 = Yup.object().shape({
    // Sign Up Form Validation
    namee: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Name is Required!"),
    email: Yup.string()
      .email("Invalid Email Address!")
      .required("Email is Required"),
    phone: Yup.string().required("Phone num is required!").matches("123"),
    password: Yup.string()
      .required("Password is required!")
      .matches(
        "321",
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
    address: Yup.string().required("Adress is required!"),
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
    reset01();
  };

  const onSubmitOthers = (data) => {
    alert(JSON.stringify(data));
    reset02();
  };
  const onSubmitPatient = (data) => {
    alert(JSON.stringify(data));
    reset03();
  };
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

  // this is a sample for reverting backbudyyyyy

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
              name="nameelogin"
              placeholder="Enter Your Name"
              {...register("nameelogin")}
            ></input>
            {errors.nameelogin && (
              <p className="pForForm">{errors.nameelogin.message}</p>
            )}
            <input
              type="password"
              className="inputFieldinOverlayForm"
              name="passwordlogin"
              placeholder="Password"
              {...register("passwordlogin")}
            ></input>
            <p className="pForForm">{errors.passwordlogin?.message}</p>
            <button
              type="submit"
              className="loginSignBtn"
              onClick={() => reset()}
            >
              Submit
            </button>
          </form>
        )}
        {/* Sign Up Form  */}
        {!displaySignIn && (
          <>
            {!patientForm && (
              <form
                className="signupform"
                name="signupform"
                key={2}
                onSubmit={handleSubmit2(onSubmitOthers)}
              >
                <select
                  type="select"
                  name="selectpatientother"
                  className="inputFieldinOverlayForm"
                  defaultValue={"others"}
                  {...register2("selectpatientother")}
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
                  {...register2("namee")}
                ></input>
                <p className="pForForm">{errors2.namee?.message}</p>
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="email"
                  placeholder="Email Address"
                  {...register2("email")}
                ></input>
                <p className="pForForm">{errors2.email?.message}</p>
                <input
                  type="text"
                  className="inputFieldinOverlayForm"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  {...register2("phone")}
                ></input>
                <p className="pForForm">{errors2.phone?.message}</p>
                <input
                  type="password"
                  className="inputFieldinOverlayForm"
                  name="password"
                  placeholder="Password"
                  {...register2("password")}
                ></input>
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
