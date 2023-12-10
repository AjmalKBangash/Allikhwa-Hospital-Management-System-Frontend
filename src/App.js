import "./App.css";
import axiosinstance from "./Components/axiosinstance";

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

// Now allikhwa management system started
import ProtectedRoutesHmsAppLayout from "./HMSComponents/HMSapps/ProtectedRoutesHmsAppLayout";
import HmsAppLayout from "./HMSComponents/HMSapps/HmsAppLayout";
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
import Departments from "./HMSComponents/HMSapps/Departments";
// import HMSEmergency from "./HMSComponents/HMSapps/HmsDepartments/HMSEmergency";
import DepartmentHMS from "./HMSComponents/HMSapps/HmsDepartments/DepartmentHMS";

//   For All, components
import DepartmentBeds from "./ForAll/DepartmentBeds";
import DepartmentDoctors from "./ForAll/DepartmentDoctors";
import DepartmentNurses from "./ForAll/DepartmentNurses";
import InformationCardForEmployee from "./ForAll/InformationCardForEmployee";
import ExpenseDynamicDetails from "./ForAll/ExpenseDynamicDetails";
// Now Doctor HMS started
import ProtectedRoutesDoctor from "./HMSComponents/Doctor/ProtectedRoutesDoctor";
import DoctorHMS from "./HMSComponents/Doctor/DoctorHMS";
import DrDashboard from "./HMSComponents/Doctor/DrDashboard";
import DrProfile from "./HMSComponents/Doctor/DrProfile";
import DrPatients from "./HMSComponents/Doctor/DrPatients";
import DrDepartments from "./HMSComponents/Doctor/DrDepartments";
import DrAppointments from "./HMSComponents/Doctor/DrAppointments";
import DrPrescription from "./HMSComponents/Doctor/DrPrescription";
import DrSchedule from "./HMSComponents/Doctor/DrSchedule";
import DrComplaints from "./HMSComponents/Doctor/DrComplaints";
import DrDepartmentHMS from "./HMSComponents/Doctor/DrDepartmentHMS";
import RecPatAdmission from "./HMSComponents/Receptionist/RecPatAdmission";

// NOW RECEPTIONNIST HMS STARTED
import ProtectedRoutesRec from "./HMSComponents/Receptionist/ProtectedRoutesRec";
import RecHMS from "./HMSComponents/Receptionist/RecHMS";
import RecDashboard from "./HMSComponents/Receptionist/RecDashboard";
import RecComplaints from "./HMSComponents/Receptionist/RecComplaints";
import RecDepartments from "./HMSComponents/Receptionist/RecDepartments";
import ReceAppointments from "./HMSComponents/Receptionist/ReceAppointments";
import RecmAppointments from "./HMSComponents/Receptionist/RecmAppointments";
import RecPatients from "./HMSComponents/Receptionist/RecPatients";
import RecProfile from "./HMSComponents/Receptionist/RecProfile";
import RecSchedule from "./HMSComponents/Receptionist/RecSchedule";
import RecChat from "./HMSComponents/Receptionist/RecChat";
import RecDepartmentHMS from "./HMSComponents/Receptionist/RecDepartmentHMS";
// NOW LAB TECHNICIAN STARTED
import ProtectedRoutesLabTechnician from "./HMSComponents/LabTechnician/ProtectedRoutesLabTechnician";
import LabHMS from "./HMSComponents/LabTechnician/LabHMS";
import LabDashboard from "./HMSComponents/LabTechnician/LabDashboard";
import LabProfile from "./HMSComponents/LabTechnician/LabProfile";
import Samples from "./HMSComponents/LabTechnician/Samples";
import LabComplaints from "./HMSComponents/LabTechnician/LabComplaints";
import LabPatients from "./HMSComponents/LabTechnician/LabPatients";
// NOW PATIENT HMS STARTED
import PatHMS from "./HMSComponents/Patient/PatHMS";
import PatDashboard from "./HMSComponents/Patient/PatDashboard";
import PatDocuments from "./HMSComponents/Patient/PatDocuments";
import PatComplaints from "./HMSComponents/Patient/PatComplaints";
import PatAppointments from "./HMSComponents/Patient/PatAppointments";

// This is material ui imports
import { Container } from "@mui/material";

// This is router imports
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  Outlet,
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
      <Route path="/signup" element={<SignUpIn />} />
      <Route
        path="all'ikhwa-management-system"
        element={<ProtectedRoutesHmsAppLayout Component={HmsAppLayout} />}
        // element={<HmsAppLayout />}
      >
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
          <Route
            path="/all'ikhwa-management-system/departments/:departmentname"
            element={<DepartmentHMS />}
          ></Route>
          <Route
            path="/all'ikhwa-management-system/departments/:departmentname/department-doctors"
            element={<DepartmentDoctors />}
          />
          <Route
            path="/all'ikhwa-management-system/departments/:departmentname/department-nurses"
            element={<DepartmentNurses />}
          />
          <Route
            path="/all'ikhwa-management-system/departments/:departmentname/department-beds"
            element={<DepartmentBeds />}
          />
          <Route
            path="/all'ikhwa-management-system/departments/:departmentname/informationcardforemployee"
            element={<InformationCardForEmployee />}
          />
          <Route
            path="/all'ikhwa-management-system/departments/:departmentname/rec-patients-admission"
            element={<RecPatAdmission />}
          />
        </Route>
        <Route path="expenses" element={<Expenses />}>
          <Route path="expensedetails" element={<ExpenseDynamicDetails />} />
        </Route>
      </Route>
      {/* Doctor HMS  */}
      <Route
        path="doctor-hms"
        // element={<DoctorHMS />}
        element={<ProtectedRoutesDoctor Component={DoctorHMS} />}
      >
        <Route path="dr-dashboard" element={<DrDashboard />} />
        <Route path="dr-profile" element={<DrProfile />} />
        <Route path="dr-patients" element={<DrPatients />} />
        <Route path="dr-departments" element={<DrDepartments />} />
        <Route path="dr-appointments" element={<DrAppointments />} />
        <Route path="dr-prescription" element={<DrPrescription />} />
        <Route path="dr-schedule" element={<DrSchedule />} />
        <Route path="dr-complaints" element={<DrComplaints />} />
        <Route path="dr-departments" element={<DrDepartments />}>
          <Route
            path="/doctor-hms/dr-departments/:departmentname"
            element={<DrDepartmentHMS />}
          ></Route>
          <Route
            path="/doctor-hms/dr-departments/:departmentname/department-doctors"
            element={<DepartmentDoctors />}
          />
          <Route
            path="/doctor-hms/dr-departments/:departmentname/department-nurses"
            element={<DepartmentNurses />}
          />
          <Route
            path="/doctor-hms/dr-departments/:departmentname/department-beds"
            element={<DepartmentBeds />}
          />
        </Route>
      </Route>
      {/* Receptionist HMS */}
      <Route
        path="rec-hms"
        // element={<RecHMS />}
        element={<ProtectedRoutesRec Component={RecHMS} />}
      >
        <Route path="rec-dashboard" element={<RecDashboard />} />
        <Route path="rec-profile" element={<RecProfile />} />
        <Route path="rec-e-appointments" element={<ReceAppointments />} />
        <Route path="rec-make-appointments" element={<RecmAppointments />} />
        <Route path="rec-patients" element={<RecPatients />} />
        <Route path="rec-complaints" element={<RecComplaints />} />
        <Route path="rec-schedule" element={<RecSchedule />} />
        <Route path="rec-chat" element={<RecSchedule />} />
        {/* <Route path="/department-beds" element={<DepartmentBeds />} /> */}
        <Route path="rec-departments" element={<RecDepartments />}>
          <Route
            path="/rec-hms/rec-departments/:departmentname"
            element={<RecDepartmentHMS />}
          ></Route>
          <Route
            path="/rec-hms/rec-departments/:departmentname/department-doctors"
            element={<DepartmentDoctors />}
          />
          <Route
            path="/rec-hms/rec-departments/:departmentname/department-nurses"
            element={<DepartmentNurses />}
          />
          <Route
            path="/rec-hms/rec-departments/:departmentname/department-beds"
            element={<DepartmentBeds />}
          />
          <Route
            path="/rec-hms/rec-departments/:departmentname/rec-patients-admission"
            element={<RecPatAdmission />}
          />
        </Route>
      </Route>
      {/* Lab-Technician HMS */}
      <Route
        path="lab-hms"
        // element={<LabHMS />}
        element={<ProtectedRoutesLabTechnician Component={LabHMS} />}
      >
        <Route path="lab-dashboard" element={<LabDashboard />} />
        <Route path="lab-profile" element={<LabProfile />} />
        <Route path="lab-patients" element={<LabPatients />} />
        <Route path="lab-patient-samples" element={<Samples />} />
        <Route path="lab-complaints" element={<LabComplaints />} />
        {/* <Route path="lab-chat" element={<LabSchedule />} /> */}
      </Route>
      <Route path="pat-hms" element={<PatHMS />}>
        <Route path="pat-dashboard" element={<PatDashboard />} />
        <Route path="pat-documents" element={<PatDocuments />} />
        <Route path="pat-complaints" element={<PatComplaints />} />
        <Route path="pat-appointments" element={<PatAppointments />} />
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
