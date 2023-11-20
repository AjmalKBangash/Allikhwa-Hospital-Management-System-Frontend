import { useFieldArray, useForm } from "react-hook-form";

import React, { useState } from "react";

const Practice_useFieldArray = () => {
  const [data, setData] = useState();
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      list: [{ firstName: "", lastName: "", disease: "", instruction: "" }],
    },
  });

  // employee_departments: [
  // {
  //   employee_department_name: [
  //     data.employee_departments
  //       ? data.employee_departments.map(
  //           (index, id) => index.employee_department_name
  //         )
  //       : { employee_department_name: "" },
  //   ],
  // },
  // ],

  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });

  const onSave = (data) => {
    setData({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      {fields.map((field, index) => (
        <div className="box" key={field.id}>
          <div>
            <input
              placeholder="Enter First Name"
              {...register(`list.${index}.firstName`)}
            />
          </div>
          <div>
            <input
              className="ml10"
              placeholder="Enter Last Name"
              {...register(`list.${index}.lastName`)}
            />
          </div>
          <div>
            <texteria
              rows="3"
              cols="6"
              className="ml10"
              placeholder="Enter disease"
              {...register(`list.${index}.disease`)}
              style={{ width: "300px" }}
            />
          </div>
          <div>
            <texteria
              rows="3"
              cols="6"
              className="ml10"
              placeholder="Enter Instructions"
              {...register(`list.${index}.instructions`)}
              style={{ width: "300px" }}
            />
          </div>
          <div className="btn-box">
            {fields.length !== 1 && (
              <button className="mr10" onClick={() => remove(index)}>
                Remove
              </button>
            )}
            {fields.length - 1 === index && (
              <button
                onClick={() =>
                  append({
                    firstName: "",
                    lastName: "",
                    disease: "",
                    instruction: "",
                  })
                }
              >
                Add
              </button>
            )}
          </div>
        </div>
      ))}
      <button>Submit</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </form>
  );
};
export default Practice_useFieldArray;

// usefieldarray example of appointment
appointments: Yup.array().of(
  Yup.object().shape({
    patient_disease: Yup.string(),
    medicine: Yup.string().required("Medicine is Required!"),
    dosage_frequency: Yup.string().required(
      "Dosage and Frequency is required!"
    ),
    instructions: Yup.string().required("Instructions is required!"),
  })
)
// const { fields, append, remove, removeField } = useFieldArray({
//   control,
//   name: "appointments",
// });

//  <div className="fillfreebeds_dynamic_field_medicine">
//    {fields.map((field, index) => (
//      <>
//  <div
//    key={field.id}
//    className="profile_label_input prescription_editing_to_form_of_patient"
//  >
//    <label htmlFor="patient_disease" className="profile_lanel_input_label">
//      Patient Disease Info:
//    </label>
//    <textarea
//      id="patient_disease"
//      name="patient_disease"
//      cols="30"
//      rows="3"
//      {...register(`appointments.${index}.patient_disease`)}
//      style={{ width: "300px" }}
//    ></textarea>
//  </div>
//  <p className="pForForm">
//    {errors.appointments?.[index]?.patient_disease?.message}
//  </p>
//  <div
//    key={field.id}
//    className="profile_label_input prescription_editing_to_form_of_patient"
//  >
//    <label htmlFor="medicine" className="profile_lanel_input_label">
//      Medicine:
//    </label>
//    <input
//      id="medicine"
//      name="medicine"
//      {...register(`appointments.${index}.medicine`)}
//      placeholder="Enter the Medicine Name"
//    />
//  </div>
//  <p className="pForForm">
//    {errors.appointments?.[index]?.medicine?.message}
//  </p>
//  <div
//    key={field.id}
//    className="profile_label_input prescription_editing_to_form_of_patient"
//  >
//    <label
//      htmlFor="dosage_frequency"
//      className="profile_lanel_input_label"
//    >
//      Dosage and Frequency:
//    </label>
//    <input
//      id="dosage_frequency"
//      name="dosage_frequency"
//      {...register(`appointments.${index}.dosage_frequency`)}
//      placeholder="Enter Dosage and Frequency"
//    />
//  </div>
//  <p className="pForForm">
//    {errors.appointments?.[index]?.dosage_frequency?.message}
//  </p>
//  <div
//    key={field.id}
//    className="profile_label_input prescription_editing_to_form_of_patient"
//  >
//    <label htmlFor="instructions" className="profile_lanel_input_label">
//      Instructions:
//    </label>
//    <input
//      id="instructions"
//      name="instructions"
//      {...register(`appointments.${index}.instructions`)}
//      placeholder="Enter the Medical Instructions"
//    />
//  </div>
//  <p className="pForForm">
//    {errors.appointments?.[index]?.instructions?.message}
//  </p>

//        {fields.length !== 1 && (
//          <button
//            onClick={
//              () => remove()
//              // { appointments: `appointments?.${index}` }
//              // `appointments?.${index}.patient_disease`,
//              // `appointments?.${index}.medicine`,
//              // `appointments?.${index}.dosage_frequency`,
//              // `appointments?.${index}.instructions`

//              // appointments: {
//              //   patient_disease: "",
//              //   medicine: "",
//              //   dosage_frequency: "",
//              //   instructions: "",
//              // },
//            }
//            className="admin_buttons_add_update_from_add_update_form "
//            style={{
//              height: "30px",
//              width: "200px",
//              padding: "0",
//              display: "block",
//              margin: "5px auto",
//            }}
//          >
//            CANCEL MEDICATION{" "}
//          </button>
//        )}
//      </>
//    ))}
//    <button
//      onClick={() => append({ appointments: "" })}
//      className="admin_buttons_add_update_from_add_update_form "
//      style={{
//        height: "30px",
//        width: "200px",
//        padding: "0",
//        display: "block",
//        margin: "5px auto",
//      }}
//    >
//      ADD MEDICATION
//    </button>
//  </div>;
