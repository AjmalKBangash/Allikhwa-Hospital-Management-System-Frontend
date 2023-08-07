import { div } from "@mui/material";
import "./Statistics.css";
import { FaBed } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

function Statistics() {
  return (
    <>
      <div className="backgImageStatistics">
        <div className="statiscsIcons">
          <BsFillPersonPlusFill className="statIcons" />
          <p>
            <h1>
              <CountUp start={0} end={4231} duration={8} />
            </h1>
            Patients Treated
          </p>
        </div>
        <div className="statiscsIcons">
          <FaUserDoctor className="statIcons" />
          <p>
            <h1>
              {" "}
              <CountUp start={0} end={875} duration={8} />
            </h1>
            Surgeries performed
          </p>
        </div>
        <div className="statiscsIcons">
          <FcDepartment className="statIcons" duration={8} />
          <p>
            <h1>
              {" "}
              <CountUp start={0} end={18} duration={8} />
            </h1>
            Departments
          </p>
        </div>
        <div className="statiscsIcons">
          <FaBed className="statIcons" />
          <p>
            <h1>
              <CountUp start={0} end={321} />
            </h1>
            Patients Beds
          </p>
        </div>
        {/* <p>Salam Stats</p>
      <p>
        jananh yguhgjh fhfh fhf Link v6.14.2 React Router https://reactroutenk
        You can u reloadDocume to skip client side routing and let the browser
        handle the transition normals if it weremport * as React ... ‎relative ·
        ‎preventScrollReset · ‎state How to style React Router Links with
        styled-components LogRocket Blog
        https://blog.logrocket.cow-style-react-router-lin... 25-May-2022 — Let's
        look at how to use styled-components and TypeScript to style React
        Router Links in an application's navbar. How to style your React-Router
        Links using styled- ... DEV Community
        https://dev.ridhikgovinhow-to-style-your-reac... 27-Feb-2021 — In this
        article I will explain how to easily style your React-Router Links by
        going through 3 main methods of styling. React Router v6 tutorial #5
        Link and Nav Link style - YouTube YouTube https://www.youtube.cwatch
        7:08 In this react-router 6 tutorial , we learn how to make Link and
        narbar style in react-router version 6.0 and react-router-dom 6. YouTube
        · Code Step By Step · 14-Aug-2022 4 key moments in this video Links -
        Material UI MUI https://mui.com react- Link The Link component allows
        you to easily customize anchor elements with your theme colors and
        typography styles. How to get rid of underline for Link component of
        React Router edureka.co https://www.edureka.coJava-Script 18-May-2020 —
        If you are using styled-components, you could do something like this:
        import Reafrom 'react'; i from 'react- ... 1 answer · 0 votes: Hello,If
        you are using styled-components, you could do something like this:import
        Reacfrom 'react'; import rom 'react-router-dom'; ... please add a
        default css class to Link in order to override ... GitHub
        https://github.com remix-run react-routerissues 28-Jul-2022 — I would
        like to remove the css property text-decoration:underline; applyed by
        default on every In an ideal way, I don't want to override the ...
      </p> */}
      </div>
    </>
  );
}

export default Statistics;
