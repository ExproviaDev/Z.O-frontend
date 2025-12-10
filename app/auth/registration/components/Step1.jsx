// app/auth/registration/components/Step1.jsx
import React from "react";

const Step1 = ({ formData, handleInputChange }) => {
  return (
    <div className="step">
      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        required
      />
    </div>
  );
};

export default Step1;
