import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoutesHmsAppLayout({ Component }) {
  const isAuth02 = localStorage.getItem("isAuth02");
  if (isAuth02 === "false") {
    return <Navigate to={"/"} />;
  } else {
    return (
      <>
        <Component />
      </>
    );
  }
}
export default ProtectedRoutesHmsAppLayout;
