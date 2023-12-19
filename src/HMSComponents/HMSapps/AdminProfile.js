import { useState, useEffect } from "react";
import axios from "axios";
import { employee_employee } from "../../Store/Store";
import Profile from "/home/ajay/Desktop/FYP/allikhwa/src/HMSComponents/HMSapps/Profile.js";
import { useSelector, useDispatch } from "react-redux";

function AdminProfile() {
  const [admin, setAdmin] = useState();
  const employee_loggedin_var = useSelector((state) => state.employee_loggedin);
  const dispatch = useDispatch();
  dispatch(employee_employee("admins"));

  useEffect(() => {
    axios
      .get("allikhwa-hms/admins/" + employee_loggedin_var.user)
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {/* // prop will be passsing later after backend creation */}
      <Profile data={admin} />
      {/* <p>Salam</p> */}
    </>
  );
}

export default AdminProfile;
