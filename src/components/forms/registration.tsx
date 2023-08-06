"use client";
import React, { useEffect, useState } from "react";

/* const getFormFields = async () => {
  const response = await fetch("http://localhost:3000/api/registration-form");
  const json = await response.json();
  return json;
} */

const submitForm = async (formValues, registrationNumber) => {
  const response = await fetch(
    "http://localhost:3000/api/applications/registration",
    {
      method: "POST",
      body: JSON.stringify({
        registrationForm: formValues,
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
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  console.log({ formFields });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (
      !formValues.name ||
      formValues.name.length < 3 ||
      formValues.name.length > 50
    ) {
      errors.name = "Name must be between 3 and 50 characters";
    }

    if (
      !formValues.description ||
      formValues.description.length < 3 ||
      formValues.description.length > 50
    ) {
      errors.description = "Description must be between 3 and 50 characters";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

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
          <div key={field.name} className="form-control">
            <label className="flex flex-col">
              <span className="label-text text-2xl text-white text-left items-start font-bold uppercase">
                {field.name}
              </span>
              <span className="label-text text-white text-lg">
                {field.description.charAt(0).toUpperCase() +
                  field.description.slice(1)}
              </span>
              {field.type === "single_choice" && (
                <div className="grid gap-2 mt-1">
                  {field.options.map((option) => (
                    <div className="form-control">
                      <label
                        className={`label cursor-pointer border border-base-300 rounded-md p-2 ${
                          formValues[field.name] === option.name
                            ? "border-success"
                            : ""
                        }`}
                      >
                        <span className="label-text text-md uppercase font-bold">
                          {option.name}
                        </span>
                        <input
                          type="radio"
                          name={field.name}
                          className="radio checked:bg-success"
                          checked={formValues[field.name] === option.name}
                          onChange={handleChange}
                          value={option.name}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {field.type === "text_area" && (
                <>
                  <input
                    type="text"
                    name={field.name}
                    value={formValues[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.description}
                    className="input input-bordered w-full mt-1"
                  />
                  {formErrors[field.name] && (
                    <p className="text-red-600 mt-1 tex-sm font-bold">
                      {formErrors[field.name]}
                    </p>
                  )}
                </>
              )}
            </label>
            <div className="divider"></div>
          </div>
        ))}
      </div>
      <button type="submit" className="btn">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold text-xl">
          Submit Application
        </span>
      </button>
    </form>
  );
}

export default RegistrationForm;
