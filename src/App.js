import "./App.css";
import NavBar from "./Components/AppLayout/NavBar";
import Emergency from "./Components/Emergency";
import Donate from "./Components/Donate";
import Statistics from "./Components/AppLayout/Statistics";
import Administration from "./Components/AppLayout/Administration";
import Estore from "./Components/eStore/Estore";
import Gallary from "./Components/AppLayout/Gallary";
import Services from "./Components/AppLayout/Services";
import Whychooseus from "./Components/AppLayout/Whychooseus";
import Footer from "./Components/AppLayout/Footer";

// This is material ui imports
import { Container } from "@mui/material";
// This is router imports
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const theRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}></Route>
      <Route path="/eStore" element={<Estore />} />
      <Route path="/Emergency" element={<Emergency />}></Route>
      <Route path="/Donate" element={<Donate />}></Route>
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
        <Statistics />
        <hr />
        <Administration />
        {/* <hr /> */}
        {/* <Gallary /> */}
        <Whychooseus />
        <Services />
        <Gallary />
      </Container>
      <Footer />
    </>
  );
}
