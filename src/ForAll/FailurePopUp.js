import "./FailurePopUp.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { failurepopup } from "../Store/Store";

const FailurePopUp = ({ message }) => {
  const [showMessage, setShowMessage] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Automatically close the message after 1000 milliseconds (1 second)
    const timer = setTimeout(() => {
      setShowMessage(false);
      dispatch(failurepopup(false));
    }, 5000);

    // Clear the timer when the component unmounts to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return <div>{showMessage && <div className="popupf">{message}</div>}</div>;
};

export default FailurePopUp;
