import AllikhwaLogo from "/home/ajay/Desktop/FYP/allikhwa/src/Media/AllikhwaLogo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

function ForgotPassword() {
  // FORGOT PASSWORD
  const signupSchemaforgotpsswd = Yup.object().shape({
    // Log In Form Validation
    // username: Yup.string().required("Name is required!"),
    email: Yup.string()
      .email("Invalid Email Address!")
      .required("Email is Required!"),
  });
  // FORGOT PASSWORD
  const {
    reset: resetforgotpsswd,
    register: registerforgotpsswd,
    formState: { errors: errorsforgotpsswd },
    handleSubmit: handleSubmitforgotpsswd,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(signupSchemaforgotpsswd),
  });

  function onSubmitforpassword(data) {
    alert(JSON.stringify(data));
  }
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
          onSubmit={handleSubmitforgotpsswd(onSubmitforpassword)}
        >
          <input
            type="text"
            className="inputFieldinOverlayForm"
            name="email"
            placeholder="Enter Your Email Address"
            {...registerforgotpsswd("email")}
          ></input>
          {errorsforgotpsswd.email && (
            <p className="pForForm">{errorsforgotpsswd.email?.message}</p>
          )}
          <button type="submit" style={{ margin: "8px 5px" }}>
            {/* loginSignBtn */}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
