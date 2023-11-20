import React from "react";
import "./AnimatedTextOnImage.css"; // Import your CSS file

const AnimatedTextOnImage = (props) => {
  return (
    <div className="container">
      <img
        className="background-image"
        // src="https://www.northwoodtech.edu/sites/default/files/HealthcareReceptionist-main-web-FY23-1337067405-.jpg"
        src={props.image}
        alt="Background"
      />
      <div className="animated-text">{props.management} MANAGEMENT SYSTEM</div>
    </div>
  );
};

export default AnimatedTextOnImage;
