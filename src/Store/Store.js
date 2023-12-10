import { configureStore } from "@reduxjs/toolkit";
import { createAction, createReducer } from "@reduxjs/toolkit";

export const props_from_depart_actions = createAction(
  "props_from_depart_actions"
);
export const expenses_to_expensedynamic_form_display = createAction(
  "expenses_to_expensedynamic_form_display"
);
export const allikhwa_department_infomation_dynamic_name = createAction(
  "allikhwa_department_infomation_dynamic_name"
);
export const cd_open_close = createAction("cd_open_close");
export const cd_yess_no = createAction("cd_yess_no");
export const prescription_show_patient_detail_rest_pres_form = createAction(
  "prescription_show_patient_detail_rest_pres_form"
);
export const re_render_presc_upper_component = createAction(
  "re_render_presc_upper_component"
);
export const recmappointment_patient_billing_price = createAction(
  "recmappointment_patient_billing_price"
);
export const submit_bill_price_work = createAction("submit_bill_price_work");
export const dr_nurse_beds_refresh = createAction("dr_nurse_beds_refresh");
export const successpopup = createAction("successpopup");
export const failurepopup = createAction("failurepopup");
export const fillfreebeds_variable = createAction("fillfreebeds_variable");
export const profile_updated = createAction("profile_updated");
// AFTER LOGIN THIS STATE WILL BE USED AS AN EMPLOYEE
export const employee_loggedin = createAction("employee_loggedin");

const initialState = {
  props_from_depart_actions: [],
  expenses_to_expensedynamic_form_display: [],
  allikhwa_department_infomation_dynamic_name: "",
  cd_open_close: false,
  cd_yess_no: "",
  prescription_show_patient_detail_rest_pres_form: false,
  re_render_presc_upper_component: false,
  recmappointment_patient_billing_price: "",
  submit_bill_price_work: false,
  dr_nurse_beds_refresh: "",
  successpopup: false,
  failurepopup: false,
  fillfreebeds_variable: "",
  profile_updated: false,
  employee_loggedin: false,
};

const sliceReducer = createReducer(initialState, (builder) => {
  builder.addCase(props_from_depart_actions, (state, action) => {
    state.props_from_depart_actions = action.payload;
  });
  builder.addCase(expenses_to_expensedynamic_form_display, (state, action) => {
    state.expenses_to_expensedynamic_form_display = action.payload;
  });
  builder.addCase(
    allikhwa_department_infomation_dynamic_name,
    (state, action) => {
      state.allikhwa_department_infomation_dynamic_name = action.payload;
    }
  );
  builder.addCase(cd_open_close, (state, action) => {
    state.cd_open_close = action.payload;
  });
  builder.addCase(cd_yess_no, (state, action) => {
    state.cd_yess_no = action.payload;
  });
  builder.addCase(
    prescription_show_patient_detail_rest_pres_form,
    (state, action) => {
      state.prescription_show_patient_detail_rest_pres_form = action.payload;
    }
  );
  builder.addCase(re_render_presc_upper_component, (state, action) => {
    state.re_render_presc_upper_component = action.payload;
  });
  builder.addCase(recmappointment_patient_billing_price, (state, action) => {
    state.recmappointment_patient_billing_price = action.payload;
  });
  builder.addCase(submit_bill_price_work, (state, action) => {
    state.submit_bill_price_work = action.payload;
  });
  builder.addCase(dr_nurse_beds_refresh, (state, action) => {
    state.dr_nurse_beds_refresh = action.payload;
  });
  builder.addCase(successpopup, (state, action) => {
    state.successpopup = action.payload;
  });
  builder.addCase(failurepopup, (state, action) => {
    state.failurepopup = action.payload;
  });
  builder.addCase(fillfreebeds_variable, (state, action) => {
    state.fillfreebeds_variable = action.payload;
  });
  builder.addCase(profile_updated, (state, action) => {
    state.profile_updated = action.payload;
  });
  builder.addCase(employee_loggedin, (state, action) => {
    state.employee_loggedin = action.payload;
  });
});

// *
export const store = configureStore({ reducer: sliceReducer });

export default store;
