import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { employee_loggedin } from "../../Store/Store";
import { useEffect } from "react";
import axios from "axios";

function ProtectedRoutesHmsAppLayout({ Component }) {
  const accessToken = localStorage.getItem("access_token");
  const employee_state = localStorage.getItem(
    "employee_loggedin_persistentdata"
  );
  const dispatch = useDispatch();

  // FETCHING DOCTOR AND THEN USING THIS STATE OF REACT REDUX IN ALL THE COMPONENTS
  useEffect(() => {
    if (employee_state) {
      axios
        .get("allikhwa-hms/doctors/" + employee_state)
        .then((res) => {
          if (res.data.employee_name) {
            console.log(res.data.employee_name);
            dispatch(employee_loggedin(res.data));
          } else {
            throw "The doctor is not found please provide valid doctor email";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [employee_state]);

  if (accessToken && employee_state) {
    return (
      <>
        <Component />
      </>
    );
  } else {
    return <Navigate to={"/signup"} />;
  }
}
export default ProtectedRoutesHmsAppLayout;
