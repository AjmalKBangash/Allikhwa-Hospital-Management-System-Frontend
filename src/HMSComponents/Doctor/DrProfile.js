import Profile from "/home/ajay/Desktop/FYP/allikhwa/src/HMSComponents/HMSapps/Profile.js";

function DrProfile(props) {
  console.log(props.data);
  console.log(props.data.employee_name);
  return (
    <>
      {/* // prop will be passsing later after backend creation */}
      <Profile />
    </>
  );
}

export default DrProfile;
