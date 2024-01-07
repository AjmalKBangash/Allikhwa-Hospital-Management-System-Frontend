import "./ForgotPassword.css";
import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EnterPin() {
  const [loadingPIN, setLoadingPIN] = useState(false);
  const [PIN, setPIN] = useState(false);
  const navigate = useNavigate();
  // FORGOT PASSWORD
  const signupSchemaPIN = Yup.object().shape({
    // Log In Form Validation
    // username: Yup.string().required("Name is required!"),
    user_email: Yup.string()
      .email("Invalid Email Address!")
      .required("Email is Required!"),
    user_otp: Yup.string()
      .required("Phone num is required!")
      .matches(/^\d{4}$/, "Please enter only digits!"),
  });
  // FORGOT PASSWORD
  const {
    reset: resetPIN,
    register: registerPIN,
    formState: { errors: errorsPIN },
    handleSubmit: handleSubmitPIN,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signupSchemaPIN),
  });

  function onSubmitforPIN(data) {
    alert(JSON.stringify(data));
    setPIN(data);
  }

  useEffect(() => {
    if (PIN) {
      axios
        .post("api/confirming-email", PIN)
        .then((res) => {
          setLoadingPIN(false);
          console.log(res.data);
          navigate("/signup");
        })
        .catch((err) => {
          console.log(err);
          setLoadingPIN(false);
        });
    }
  }, [PIN]);
  return (
    <div className="signupintop">
      {/* <> */}
      <img
        className="imgofform"
        src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
      />
      {/* <h3 className="forgotpassword">
        FOTGOTTEN YOUR PASSWORD, PLZ ENTER YOUR EMAIL
      </h3> */}
      <div className="signupinform">
        <p className="forgotpassword01">Enter PIN!</p>
        <div className="menuforsignup">
          <img src={AllikhwaLogo}></img>
          {/* <h3
            onClick={() => {
              setDisplaySignIn(true);
              // setdisplaySignIn_from_forot_psswd(false);
            }}
            style={{
              backgroundColor: displaySignIn ? "#fe4200" : "#fe440081",
            }}
          >
            Sign In
          </h3>
          <h3
            onClick={() => {
              setDisplaySignIn(false);
              // setdisplaySignIn_from_forot_psswd(false);
            }}
            style={{
              backgroundColor: !displaySignIn ? "#fe4200" : "#fe440081",
            }}
          >
            Sign Up
          </h3> */}
        </div>
        <form
          className="signupform"
          name="loginform"
          key={1}
          onSubmit={handleSubmitPIN(onSubmitforPIN)}
        >
          <input
            type="text"
            className="inputFieldinOverlayForm"
            name="user_email"
            placeholder="Enter Your Email Address"
            {...registerPIN("user_email")}
          ></input>
          {errorsPIN.user_email && (
            <p className="pForForm">{errorsPIN.user_email?.message}</p>
          )}
          <input
            type="text"
            className="inputFieldinOverlayForm"
            name="user_otp"
            placeholder="Enter the PIN sent to your email address!"
            {...registerPIN("user_otp")}
          ></input>
          {errorsPIN.user_otp && (
            <p className="pForForm">{errorsPIN.user_otp?.message}</p>
          )}
          <button
            type="submit"
            style={{ margin: "8px 5px" }}
            onClick={() => {
              setLoadingPIN(true);
            }}
          >
            {/* loginSignBtn */}
            {loadingPIN ? <p>Loading ...</p> : <p>Submit</p>}
          </button>
        </form>
        <p className="forgotpassword-line">
          Complete your account registration by entering the PIN sent to your
          email address.
          {/* This step ensures the security of your account and */}
          {/* expedites the registration process! */}
        </p>
      </div>
    </div>
  );
}

export default EnterPin;
