import { useState, useEffect } from "react";
import axios from "axios";
import { employee_employee } from "../../Store/Store";
import Profile from "/home/ajay/Desktop/FYP/allikhwa/src/HMSComponents/HMSapps/Profile.js";
import { useSelector, useDispatch } from "react-redux";

function DrProfile() {
  const [doctor, setDoctor] = useState();
  const employee_loggedin_var = useSelector((state) => state.employee_loggedin);
  const dispatch = useDispatch();
  dispatch(employee_employee("doctors"));

  useEffect(() => {
    axios
      .get("allikhwa-hms/doctors/" + employee_loggedin_var.user)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* // prop will be passsing later after backend creation */}
      {doctor && <Profile data={doctor} />}
      {/* <p>Salam</p> */}
    </>
  );
}

export default DrProfile;
