import "./Profile.css";

// importing icons from react icons
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";

function Profile() {
  // str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  // this upper regex is for converting paargraphs into sentences and then we have to store it in list and we have to convert it into ul li childs through map function
  return (
    <div className="profile_top">
      <div className="profile_profile_pic_card">
        <img
          src="https://southfloridahospitalnews.com/wp-content/uploads/2023/02/Dawkins-Bryan.jpg"
          alt="Doctor"
        />
        <div className="profile_name_speciality_jobtitile">
          <h4>Profile</h4>
          <span style={{ fontSize: "15px" }}>
            Update Your Profile and Personal Details
          </span>
          {/* <span>Update Your Profile and Personal Details</span> */}
        </div>
        <div className="profile_buttons_update">
          <button>Cancel</button>
          <button>Update</button>
        </div>
      </div>
      {/* <div className="profile_html_table_explanation">
        <table class="profile_GeneratedTable">
          <tbody>
            <thead>
              <tr>
                <th>Profile Picture Click to Update!</th>
              </tr>
            </thead>
            <tr>
              <td>Nick Name</td>
              <td>
                <input type="text" placeholder="NickName" />
              </td>
            </tr>
            <tr style={{ marginBottom: "30px" }}>
              <td>Desciption:</td>
              <td>Cell</td>
            </tr>
            <thead>
              <tr>
                <th>Education and Hospital Information</th>
              </tr>
            </thead>
            <tr>
              <td>Education</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Experience</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Department</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Surgeries Performed</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Appointments Per Month</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Awards and Reconitions</td>
              <td>Cell</td>
            </tr>
            <thead>
              <tr>
                <th>Personal Information</th>
              </tr>
            </thead>
            <tr>
              <td>Address</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>LinkedIn</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Facebook</td>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </div> */}

      <div className="profile_information_all">
        <form>
          <div className="profile_label_input">
            <label htmlFor="profile_name"> Your Name:</label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Your Website:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Your Photo:
            </label>
            <input id="profile_name" type="file"></input>
          </div>
          <div className="profile_label_input ">
            <span>
              <p>
                <label htmlFor="profile_shortIntroduction">Your Bio:</label>
              </p>
              <p>Write a Short Introduction:</p>
            </span>
            <div>
              <div
                style={{
                  margin: "10px 0",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <select
                  style={{
                    fontSize: "15px",
                    backgroundColor: "white",
                    border: "1px solid rgba(0, 0, 0, 0.199)",
                    borderRadius: "4px",
                    padding: "10px",
                    marginRight: "5px",
                  }}
                >
                  <option>Normal text</option>
                  <option>Bold text</option>
                  <option>Italix text</option>
                </select>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "900",
                    border: "1px solid rgba(0, 0, 0, 0.199)",
                    borderRadius: "4px",
                    padding: "7px 10px ",
                    marginRight: "5px",
                  }}
                >
                  B
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "900",
                    // backgroundColor: "white",
                    border: "1px solid rgba(0, 0, 0, 0.199)",
                    borderRadius: "4px",
                    padding: "7px 10px",
                    marginRight: "5px",
                    fontFamily: "serif",
                  }}
                >
                  <i>I</i>
                </span>

                <AiOutlineOrderedList
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.199)",
                    borderRadius: "4px",
                    padding: "10px",
                    marginRight: "5px",
                  }}
                />
                <AiOutlineUnorderedList
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.199)",
                    borderRadius: "4px",
                    padding: "10px",
                    marginRight: "5px",
                  }}
                />
              </div>
              <textarea
                id="profile_shortIntroduction"
                name="profile_shortIntroduction"
                placeholder="Your short introduction!"
                rows="6"
                cols="50"
              />
            </div>
          </div>
          {/* <h1>Personal Information</h1> */}
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Your Education:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              {" "}
              Experience:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              {" "}
              Department:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              {" "}
              Suregries Performed:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Appointments Per Month:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Awards and Recognitions:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Address:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Phone:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Email:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              Facebook:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
          <div className="profile_label_input ">
            <label htmlFor="profile_name" className="profile_lanel_input_label">
              LinkedIn:
            </label>
            <input id="profile_name" type="text"></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
