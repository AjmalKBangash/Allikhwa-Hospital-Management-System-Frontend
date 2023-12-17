import { employee_employee } from "../../Store/Store";
import Profile from "/home/ajay/Desktop/FYP/allikhwa/src/HMSComponents/HMSapps/Profile.js";
import { useSelector, useDispatch } from "react-redux";

function AdminProfile() {
  const employee_loggedin_var = useSelector((state) => state.employee_loggedin);
  console.log(employee_loggedin_var);
  const dispatch = useDispatch();
  dispatch(employee_employee("admins"));

  return (
    <>
      {/* // prop will be passsing later after backend creation */}
      <Profile data={employee_loggedin_var} />
      {/* <p>Salam</p> */}
    </>
  );
}

export default AdminProfile;
