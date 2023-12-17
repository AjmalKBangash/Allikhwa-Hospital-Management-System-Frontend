import { employee_employee } from "../../Store/Store";
import Profile from "/home/ajay/Desktop/FYP/allikhwa/src/HMSComponents/HMSapps/Profile.js";
import { useSelector, useDispatch } from "react-redux";

function DrProfile() {
  const employee_loggedin_var = useSelector((state) => state.employee_loggedin);
  const dispatch = useDispatch();
  dispatch(employee_employee("doctors"));

  return (
    <>
      {/* // prop will be passsing later after backend creation */}
      <Profile data={employee_loggedin_var} />
      {/* <p>Salam</p> */}
    </>
  );
}

export default DrProfile;
