// import { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";

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

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoutesDoctor({ Component }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = Navigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // const response = await axios.get("http://your-api-url/check-auth/", {
        const response = await axios.get("allikhwa-hms/doctors/", {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          // },
        });

        // Assuming the backend responds with a success status
        setIsAuthenticated(true);
      } catch (error) {
        // If there's an error (e.g., unauthorized), redirect to the signup page
        setIsAuthenticated(false);
        navigate("/signup");
      }
    };

    checkAuthentication();
  }, [navigate]);

  return isAuthenticated ? <Component /> : null;
}

export default ProtectedRoutesDoctor;
