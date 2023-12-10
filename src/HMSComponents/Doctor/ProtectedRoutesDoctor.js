import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { employee_loggedin } from "../../Store/Store";
import { useEffect } from "react";
import axios from "axios";

// function ProtectedRoutesDoctor({ Component }) {
//   const isAuth02 = localStorage.getItem("access_token");
//   const isAuth03 = true;
//   // if (isAuth02 === "true") {
//   if (isAuth03 === true) {
//     return <Navigate to={"/signup"} />;
//   } else {
//     return (
//       <>
//         <Component />
//       </>
//     );
//   }
// }
// export default ProtectedRoutesDoctor;

// function ProtectedRoutesDoctor({ Component }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

// useEffect(() => {
//   const checkAuthentication = async () => {
//     try {
//       // WE ARE CHECKING THE VALIDATION OF ACCES TOKEN IF ACCESS TOKEN IS VALD THE RESPONSE FROM THE SERVER WILL BE POSITIVE
//       const response = await axios.get("allikhwa-hms/departments/");
//       // Assuming the backend responds with a success status
//       setIsAuthenticated(true);
//     } catch (error) {
//       // If there's an error (e.g., unauthorized), redirect to the signup page
//       setIsAuthenticated(false);
//       navigate("/signup");
//     }
//   };
//   checkAuthentication();
// }, [navigate]);

//   return isAuthenticated ? <Component /> : null;
// }
// export default ProtectedRoutesDoctor;

function ProtectedRoutesDoctor({ Component }) {
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
export default ProtectedRoutesDoctor;
