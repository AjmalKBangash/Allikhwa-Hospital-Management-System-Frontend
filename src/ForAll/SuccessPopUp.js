import "./SuccessPopUp.css";
import React, { useState, useEffect } from "react";
import { successpopup } from "../Store/Store";
import { useDispatch } from "react-redux";

const SuccessPopUp = ({ message }) => {
  const [showMessage, setShowMessage] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Automatically close the message after 1000 milliseconds (1 second)
    const timer = setTimeout(() => {
      setShowMessage(false);
      dispatch(successpopup(false));
    }, 5000);

    // Clear the timer when the component unmounts to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return <div>{showMessage && <div className="popup">{message}</div>}</div>;
};

export default SuccessPopUp;
