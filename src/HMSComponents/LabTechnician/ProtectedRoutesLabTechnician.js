import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoutesLabTechnician({ Component }) {
  const isAuth02 = localStorage.getItem("isAuth02");
  const isAuth03 = true;
  // if (isAuth02 === "true") {
  if (isAuth03 === true) {
    return <Navigate to={"/signup"} />;
  } else {
    return (
      <>
        <Component />
      </>
    );
  }
}
export default ProtectedRoutesLabTechnician;
