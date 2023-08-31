import "./App.css";

// AppLayout Components
import NavBar from "./Components/AppLayout/NavBar";
import SignUpIn from "./Components/SignUpIn";
import ScrollToTop from "./Components/ScrollToTop";
import Appointment from "./Components/AppLayout/Appointment";
import Emergency from "./Components/Emergency";
import Donate from "./Components/Donate";
import Departmentdetails from "./Components/Departmentdetails";
import Statistics from "./Components/AppLayout/Statistics";
import Administration from "./Components/AppLayout/Administration";
import Estore from "./Components/eStore/Estore";
import Doctor from "./Components/Doctor";
import Gallary from "./Components/AppLayout/Gallary";
import Services from "./Components/AppLayout/Services";
import Whychooseus from "./Components/AppLayout/Whychooseus";
import Footer from "./Components/AppLayout/Footer";
// practice component Jaaaaaaaaaaannnn
import Jaan from "./Components/Jaan";
// import HMSroutes from "./HMSComponents/HMSapps/HMSroutes";

// Now management system started
import HmsAppLayout from "./HMSComponents/HmsAppLayout";
import Dashboard from "./HMSComponents/HMSapps/Dashboard";
// import CardForAll from "./HMSComponents/HMSapps/CardForAll";
import Profile from "./HMSComponents/HMSapps/Profile";
import Admins from "./HMSComponents/HMSapps/Admins";
import Doctors from "./HMSComponents/HMSapps/Doctors";
import Pharmacists from "./HMSComponents/HMSapps/Pharmacists";
import Nurses from "./HMSComponents/HMSapps/Nurses";
import Receptionists from "./HMSComponents/HMSapps/Receptionists";
import Staff from "./HMSComponents/HMSapps/Staff";
import Others from "./HMSComponents/HMSapps/Others";
import Patients from "./HMSComponents/HMSapps/Patients";
import Expenses from "./HMSComponents/HMSapps/Expenses";
// Departments Started
import Departments from "./HMSComponents/HMSapps/Departments";
import HMSEmergency from "./HMSComponents/HMSapps/HmsDepartments/HMSEmergency";
import General from "./HMSComponents/HMSapps/HmsDepartments/General";
import Cardiology from "./HMSComponents/HMSapps/HmsDepartments/Cardiology";
import ENDOCRINOLOGY from "./HMSComponents/HMSapps/HmsDepartments/ENDOCRINOLOGY";
//   For All, components
import TotalDepartmentBeds from "./ForAll/TotalDepartmentBeds";
import TotalDepartmentDoctors from "./ForAll/TotalDepartmentDoctors";
import TotalDepartmentNurses from "./ForAll/TotalDepartmentNurses";
import InformationCardForEmployee from "./ForAll/InformationCardForEmployee";
import ExpenseDynamicDetails from "./ForAll/ExpenseDynamicDetails";

// This is material ui imports
import { Container } from "@mui/material";

// This is router imports
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";

const theRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}></Route>
      <Route path="/eStore" element={<Estore />} />
      <Route path="/Emergency" element={<Emergency />}></Route>
      <Route path="/Donate" element={<Donate />}></Route>
      <Route path="/Appointment" element={<Appointment />} />
      <Route path="/departments" element={<Departmentdetails />}>
        <Route
          path="/departments/:departmentdetails"
          element={<Departmentdetails />}
        />
      </Route>
      <Route path="/doctors" element={<Doctor />} />
      <Route path="signup" element={<SignUpIn />} />
      <Route path="all'ikhwa-management-system" element={<HmsAppLayout />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admins" element={<Admins />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="pharmacists" element={<Pharmacists />} />
        <Route path="nurses" element={<Nurses />} />
        <Route path="receptionists" element={<Receptionists />} />
        <Route path="staff" element={<Staff />} />
        <Route path="others" element={<Others />} />
        <Route path="patients" element={<Patients />} />
        <Route path="departments" element={<Departments />}>
          {/* <Route
            path="all'ikhwa-management-system/departments/:departmentname"
            element={<Departments />}
          /> */}
          {/* Departments  */}
          <Route path="hmsemergency" element={<HMSEmergency />} />
          <Route path="general" element={<General />} />
          <Route path="endocrinology" element={<ENDOCRINOLOGY />} />
          <Route path="cardiology" element={<Cardiology />} />
          {/* Departments Cards Information  */}
          <Route
            path="totaldepartmentdoctors"
            element={<TotalDepartmentDoctors />}
          />
          <Route
            path="totaldepartmentnurses"
            element={<TotalDepartmentNurses />}
          />
          <Route path="totaldepartmentbeds" element={<TotalDepartmentBeds />} />
          {/* Departments Employee Card */}
          <Route
            path="informationcardforemployee"
            element={<InformationCardForEmployee />}
          />
        </Route>
        <Route path="expenses" element={<Expenses />}>
          <Route path="expensedetails" element={<ExpenseDynamicDetails />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={theRoutes} />
    </>
  );
}

export default App;

function AppLayout() {
  return (
    <>
      <NavBar />
      <Container fixed style={{ overflow: "hidden", marginTop: "65px" }}>
        <ScrollToTop />
        <Statistics />
        <hr />
        <Administration />
        <Whychooseus />
        <Services />
        <Gallary />
      </Container>
      <Footer />
    </>
  );
}
