import "./App.css";
import NavBar from "./Components/AppLayout/NavBar";
import Statistics from "./Components/AppLayout/Statistics";
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
        {/* <hr /> */}
        {/* <Gallary /> */}
        <hr />
        <Whychooseus />
        <Services />
        <Gallary />
        <Footer />
      </Container>
    </>
  );
}
