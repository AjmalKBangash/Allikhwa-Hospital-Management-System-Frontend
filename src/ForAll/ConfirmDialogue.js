import "./ConfirmDialogue.css";
import { useDispatch, useSelector } from "react-redux";
import { cd_open_close, cd_yess_no } from "../Store/Store";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";

function ConfirmDialogue() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="confirm_dialogue">
        <div className="confirm_dialogue_text">
          <AiFillCloseCircle
            onClick={() => dispatch(cd_open_close(false))}
            style={{
              fontSize: "35px",
              cursor: "pointer",
              color: "red",
              position: "absolute",
              top: "-12%",
              right: "-6%",
              backgroundColor: "white",
              borderRadius: "50px",
            }}
          />
          <div>
            <p>Please confirm before Submission!</p>
            <span
              className="confirmdialogue_yess_no confirmdialogue_yess_no_01"
              style={{
                top: "40px",
                left: "40px",
                color: "green",
                width: "100px",
              }}
              onClick={() => {
                dispatch(cd_yess_no(true));
                dispatch(cd_open_close(false));
              }}
            >
              YESS
            </span>
            <span
              className="confirmdialogue_yess_no confirmdialogue_yess_no_02"
              style={{
                top: "40px",
                left: "120px",
                color: "red",
                width: "100px",
              }}
              onClick={() => {
                dispatch(cd_yess_no(false));
                dispatch(cd_open_close(false));
              }}
            >
              NO
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmDialogue;
