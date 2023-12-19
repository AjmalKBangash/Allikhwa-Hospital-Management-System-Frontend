import { useState, useEffect } from "react";
import axios from "axios";
import { employee_employee } from "../../Store/Store";
import Profile from "/home/ajay/Desktop/FYP/allikhwa/src/HMSComponents/HMSapps/Profile.js";
import { useSelector, useDispatch } from "react-redux";

function LabProfile() {
  const [labtech, setLabtech] = useState();
  const employee_loggedin_var = useSelector((state) => state.employee_loggedin);
  const dispatch = useDispatch();
  dispatch(employee_employee("doctors"));

  useEffect(() => {
    axios
      .get("allikhwa-hms/pharmacists/" + employee_loggedin_var.user)
      .then((res) => {
        setLabtech(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* // prop will be passsing later after backend creation */}
      <Profile data={labtech} />
      {/* <p>Salam</p> */}
    </>
  );
}

export default LabProfile;
