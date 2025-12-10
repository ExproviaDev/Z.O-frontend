// app/auth/registration/components/Step2.jsx
import React from "react";

const Step2 = ({ formData, handleInputChange }) => {
  return (
    <div className="step">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
    </div>
  );
};

export default Step2;
