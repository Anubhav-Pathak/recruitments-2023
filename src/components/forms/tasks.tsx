"use client";
import React, { useEffect, useState } from "react";

/* const getFormFields = async () => {
  const response = await fetch("http://localhost:3000/api/registration-form");
  const json = await response.json();
  return json;
} */

const submitForm = async (formValues, registrationNumber) => {
  console.log({ formValues, registrationNumber });
  const response = await fetch(
    "http://localhost:3000/api/applications/task",
    {
      method: "POST",
      body: JSON.stringify({
        tasks: formValues,
        registrationNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  return json;
};

export function RegistrationForm({ formFields, user }) {
  console.log({ formFields });
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  console.log({ formErrors, formValues });

  console.log({ formFields });

  const handleChange = (e) => {
    const { title, value } = e.target;
    console.log({ title, value });
    setFormValues({ ...formValues, [title]: value });
  };

  const validateForm = () => {
    const errors = {};

   

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();
    console.log({ isFormValid });

    if (isFormValid) {
      submitForm(formValues, user.registrationNumber);
    } else {
      console.log("Form contains errors. Please fix them before submitting.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        {formFields?.map((field) => (
          <div key={field.title} className="form-control">
            <label className="flex flex-col">
              <span className="label-text text-2xl text-white text-left items-start font-bold uppercase">
                {field.title}
              </span>
              <span className="label-text text-white text-lg">
                {field.description}
              </span>
              <div className="flex flex-col gap-2 mt-4">
                <span className="label-text text-white text-lg">
                  Task submission link (Github/Drive):
                </span>
                <input
                  className="input input-bordered"
                  placeholder="Enter Github/Drive link here"
                  type="link"
                  title={field.title}
                  onChange={handleChange}
                  value={formValues.title}
                />
                {formErrors[field.name] && (
                  <p className="text-red-600 mt-1 tex-sm font-bold">
                    {formErrors[field.name]}
                  </p>
                )}
              </div>
            </label>
            <div className="divider"></div>
          </div>
        ))}
      </div>
      <button type="submit" className="btn">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold text-xl">
          Submit Tasks
        </span>{" "}
      </button>
    </form>
  );
}

export default RegistrationForm;
