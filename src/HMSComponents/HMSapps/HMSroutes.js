// AppLayout Components

// practice component Jaaaaaaaaaaannnn
// import Jaan from "./Components/Jaan";
// import HMSroutes from "./HMSComponents/AppLayout/HMSroutes";
// Now management system started
// import HmsAppLayout from "./HMSComponents/HmsAppLayout";
import Ajay from "./Ajay";

// This is router imports
import {
  //   RouterProvider,
  //   createBrowserRouter,
  //   createRoutesFromElements,
  Routes,
  Route,
} from "react-router-dom";

function HMSroutes() {
  return (
    <>
      <h1>hms</h1>
      <Routes path="/HMSroutes/" element={<HMSroutes />}>
        <Route path="ajay" element={<Ajay />} />
      </Routes>
    </>
  );
}

export default HMSroutes;
