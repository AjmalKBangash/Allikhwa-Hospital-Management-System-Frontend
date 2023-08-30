import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";

function MedicineName({ index }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div key={index}>
      <input
        type="text"
        placeholder="Medicine Name"
        value={name}
        onChange={handleChange}
      />
      <button onClick={() => setName("")}>Remove</button>
    </div>
  );
}

function Medicines() {
  const [medicines, addMedicine, removeMedicine] = useFieldArray({
    name: "medicines",
    defaultValue: [],
  });

  return (
    <div>
      {medicines.map((medicine, index) => (
        <MedicineName key={index} index={index} />
      ))}
      <button onClick={addMedicine}>Add Medicine</button>
    </div>
  );
}

export default Medicines;
