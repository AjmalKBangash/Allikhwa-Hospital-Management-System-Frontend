import "./Expenses.css";
import { useRef } from "react";
import Radialbarchart from "./Radialbarchart";
import { Link, useNavigate, Outlet, useAsyncValue } from "react-router-dom";
import { useDispatch } from "react-redux";
import { expenses_to_expensedynamic_form_display } from "../../Store/Store";

// React icons
import { IoIosConstruct } from "react-icons/io";
import { MdFastfood, MdMedicalInformation } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import {
  FaHouseMedicalCircleExclamation,
  FaMoneyBill1Wave,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import { FaNotesMedical, FaAccusoft } from "react-icons/fa";

function Expenses() {
  const expensedynamicdetails_set_into_view = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div style={{ width: "95%", margin: "20px auto" }}>
        <button
          className="admin_buttons_add_update_from_add_update_form"
          onClick={() => {
            dispatch(expenses_to_expensedynamic_form_display("add"));
            // navigate("expensedetails");
          }}
          style={{
            display: "block",
            margin: "0px 0 0px auto",
          }}
        >
          <Link
            to={"expensedetails"}
            state={{ type: "" }}
            style={{ color: "white", textDecoration: "none" }}
          >
            ADD EXPENSES
          </Link>
        </button>
      </div>
      {/* // These classes are taken from Dshboard.css */}
      <div className="dashboard_top">
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">1224</span>
          <span className="dashboard_employee_card_name expenses_cards_fontsize">
            {" "}
            <Link
              to={"expensedetails"}
              state={{ type: "construction and renovation" }}
              style={{ color: "#fe4200", textDecoration: "none" }}
              onClick={() => {
                expensedynamicdetails_set_into_view.current?.scrollIntoView();
                dispatch(expenses_to_expensedynamic_form_display(false));
              }}
            >
              CONSTRUCTION AND RENOVATION{" "}
            </Link>{" "}
          </span>
          <span className="dashboard_employee_card_icon">
            <IoIosConstruct />
          </span>
        </div>

        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name expenses_cards_fontsize">
            <Link
              to={"expensedetails"}
              state={{ type: "FOOD SERVICE" }}
              style={{ color: "#fe4200", textDecoration: "none" }}
              onClick={() => {
                expensedynamicdetails_set_into_view.current?.scrollIntoView();
                dispatch(expenses_to_expensedynamic_form_display(false));
              }}
            >
              FOOD SERVICE
            </Link>
          </span>
          <span className="dashboard_employee_card_icon ">
            <MdFastfood />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name expenses_cards_fontsize">
            {" "}
            <Link
              to={"expensedetails"}
              state={{ type: "              EMPLOYEE SALARIES" }}
              style={{ color: "#fe4200", textDecoration: "none" }}
              onClick={() => {
                expensedynamicdetails_set_into_view.current?.scrollIntoView();
                dispatch(expenses_to_expensedynamic_form_display(false));
              }}
            >
              EMPLOYEE SALARIES
            </Link>{" "}
          </span>
          <span className="dashboard_employee_card_icon">
            <GiPayMoney />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name expenses_cards_fontsize">
            <Link
              to={"expensedetails"}
              state={{ type: "              HOSPITAL AND MEDICAL EQUIPMENT" }}
              style={{ color: "#fe4200", textDecoration: "none" }}
              onClick={() => {
                expensedynamicdetails_set_into_view.current?.scrollIntoView();
                dispatch(expenses_to_expensedynamic_form_display(false));
              }}
            >
              HOSPITAL AND MEDICAL EQUIPMENT{" "}
            </Link>{" "}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaHouseMedicalCircleExclamation />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name expenses_cards_fontsize">
            <Link
              to={"expensedetails"}
              state={{ type: "              MEDICAL AND SURGICAL SUPPLIES" }}
              style={{ color: "#fe4200", textDecoration: "none" }}
              onClick={() => {
                expensedynamicdetails_set_into_view.current?.scrollIntoView();
                dispatch(expenses_to_expensedynamic_form_display(false));
              }}
            >
              MEDICAL AND SURGICAL SUPPLIES
            </Link>{" "}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <MdMedicalInformation />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name expenses_cards_fontsize">
            {" "}
            <Link
              to={"expensedetails"}
              state={{ type: "PATINET MEDICATIONS " }}
              style={{ color: "#fe4200", textDecoration: "none" }}
              onClick={() => {
                expensedynamicdetails_set_into_view.current?.scrollIntoView();
                dispatch(expenses_to_expensedynamic_form_display(false));
              }}
            >
              PATIENT MEDICATIONS{" "}
            </Link>{" "}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaNotesMedical />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name expenses_cards_fontsize">
            <Link
              to={"expensedetails"}
              state={{ type: "SOFTWARE AND INFORMATION TECHNOLOGY SOLUTIONS" }}
              style={{ color: "#fe4200", textDecoration: "none" }}
              onClick={() => {
                expensedynamicdetails_set_into_view.current?.scrollIntoView();
                dispatch(expenses_to_expensedynamic_form_display(false));
              }}
            >
              SOFTWARE AND INFORMATION TECHNOLOGY SOLUTIONS{" "}
            </Link>{" "}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaAccusoft />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">324</span>
          <span className="dashboard_employee_card_name expenses_cards_fontsize">
            <Link
              to={"expensedetails"}
              state={{ type: "DIFFERENT BILLS" }}
              style={{ color: "#fe4200", textDecoration: "none" }}
              onClick={() => {
                expensedynamicdetails_set_into_view.current?.scrollIntoView();
                dispatch(expenses_to_expensedynamic_form_display(false));
              }}
            >
              DIFFERENT BILLS{" "}
            </Link>{" "}
          </span>{" "}
          <span className="dashboard_employee_card_icon">
            <FaMoneyBill1Wave />
          </span>
        </div>
        <div className="dashboard_employee_card">
          <span className="dashboard_employee_card_num">1224</span>
          <span className="dashboard_employee_card_name expenses_cards_fontsize">
            {" "}
            <Link
              to={"expensedetails"}
              state={{ type: "others" }}
              style={{ color: "#fe4200", textDecoration: "none" }}
              onClick={() => {
                expensedynamicdetails_set_into_view.current?.scrollIntoView();
                dispatch(expenses_to_expensedynamic_form_display(false));
              }}
            >
              OTHERS{" "}
            </Link>
          </span>
          <span className="dashboard_employee_card_icon">
            <FaMoneyBillTransfer />
          </span>
        </div>
      </div>
      <div className="expenses_col02">
        <div className="expenses_col02_radialchart">
          <Radialbarchart />
        </div>
        <div ref={expensedynamicdetails_set_into_view}>
          {" "}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Expenses;
