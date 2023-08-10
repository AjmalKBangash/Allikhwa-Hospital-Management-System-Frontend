import "./Doctor.css";

function Doctor() {
  return (
    <div className="doctortop">
      <div className="doctorslider">
        <div className="doctorcard">
          <img
            className="doctorimgincard"
            src={
              "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
          />
          <div className="doctorcoverofimgtagsindoctorcard">
            <h3 className="doctornameincard">Dr John Smith</h3>

            {/* every related Dr (doctor) should be displayed in every related department under the department explation.  */}
          </div>
        </div>
      </div>
      <div className="doctordetails"></div>
    </div>
  );
}

export default Doctor;

//  <p className="doctordescriptionincard">
//    Dr is working in the department of plastic surgery. And Dr John Smith has
//    done his specialization from Islamabad hynded hospital and is having 10
//    years plus experience in this field.{" "}
//  </p>;
