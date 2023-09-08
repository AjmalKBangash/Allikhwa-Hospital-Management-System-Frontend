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

const initialState = {
  props_from_depart_actions: [],
  expenses_to_expensedynamic_form_display: [],
  allikhwa_department_infomation_dynamic_name: "",
  cd_open_close: false,
  cd_yess_no: "",
  prescription_show_patient_detail_rest_pres_form: false,
  re_render_presc_upper_component: false,
};
// *
// *
// *
// * Through createSlice method,
// *
// *
// const sliceReducer = createSlice({
//   name: "firstSlice",
//   initialState,
//   reducer: {
//     dataStateFunction(state, action) {
//       state.dataState = state.dataState + action.payload;
//     },
//     general(state) {
//       state.dataState = state.dataState + 5;
//     },
//   },
// });
// *
// *
// *
// * The map object notation
// *
// *
// const sliceReducer = createReducer(initialState, {
//   [dataStateFunction]: (state, action) => {
//     state.dataState = state.dataState + action.payload;
//   },
//   [general]: (state) => {
//     state.dataState = state.dataState + 5;
//   },
// });
// *
// *
// *
// * The builder callback notation
// *
// *
const sliceReducer = createReducer(initialState, (builder) => {
  //   builder.addCase(dataStateFunction, (state, action) => {
  //     state.dataStateWholeSale = action.payload;
  //   });
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
});

// *
export const store = configureStore({ reducer: sliceReducer });

export default store;
