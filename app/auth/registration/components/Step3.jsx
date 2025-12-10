// app/auth/registration/components/Step3.jsx
import React from "react";

const Step3 = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <div className="step">
      <label htmlFor="phone">Phone:</label>
      <input
        type="number"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Step3;
